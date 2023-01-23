import {
  SupportedFormField,
  SupportedFormResponse,
  ConsumableFieldProps,
  MultistageFormField,
} from "../../../../services/multistageFormActivity.model";

type ResponseValidResult =
  | { type: "valid" }
  | { type: "invalid"; reason: string }; // ResponseValidResult

/**
 * Interfaz destinada a representar una entrada en un "diccionario de mappings" entre
 * tipos de formularios disponibles en la actividad y componentes de respuesta en React
 * capaces de renderizar dichos formularios y producir respuestas adecuadas.
 *
 * Esta interfaz genérica toma como parámetros de tipo `F` y `R`, donde `F` viene a representar
 * un tipo que extienda a `SupportedFormField` o, dicho de otro modo, un tipo que asigne a una
 * clave de tipo de formulario un objeto que proporcione la información requerida para renderizarlo
 * y definirlo. Del mismo modo, `R` representa un tipo que asigna a cada clave de tipo de formulario
 * un objeto con información necesaria para poder definir una respuesta a dicho formulario.
 *
 * Para que la respuesta `defaultFieldResponse` sea coherente con el tipo de las definiciones de
 * formularios, es necesario concretar la interfaz para que sólo aparezca un único elemento en el tipo
 * de unión dado por `F` y `R`, que coincida en cuanto a su campo `type`.
 */
export interface FieldResponseMappingEntry<
  F extends SupportedFormField,
  R extends SupportedFormResponse
> {
  /** Generation logic to use to create a form consumption component */
  consumptionComponentProducer: (
    editingFormProps: ConsumableFieldProps<F["payload"], R["response"]>
  ) => JSX.Element;
  /** Default value for FieldPayload */
  defaultFieldResponse: R["response"];
  /** Function to check the validity status for given response type under a certain field definition.
   * Adding the field definition here allows to create validity criteria that depend on the question itself.
   * Defaults to valid if not provided. */
  isFieldResponseValid?: (
    fieldDefinition: F["payload"],
    response: R["response"]
  ) => ResponseValidResult;
  /** Function to check whether a field response is empty or not. Defaults to false if not provided. */
  isFieldResponseEmpty?: (
    fieldDefinition: F["payload"],
    response: R["response"]
  ) => boolean;
} // FieldResponseMappingEntry

export type FieldResponseMappings<
  F extends SupportedFormField,
  R extends SupportedFormResponse
> = {
  /** What type of field we are working with here*/
  [P in F["type"]]: FieldResponseMappingEntry<
    Extract<F, { type: P }>,
    Extract<R, { type: P }>
  >;
}; // FieldResponseMappings

export interface ConsumableFieldCardProps {
  /** What  mappings we are working with in this consumable field card (available field types and how to render them) */
  fieldMappings: FieldResponseMappings<
    SupportedFormField,
    SupportedFormResponse
  >;
  /** Form definition to use to render this field */
  formDefinition: MultistageFormField;
  /** Response provided by the user. */
  response: SupportedFormResponse["response"];
  /** whether card is disabled (user input) */
  disabled?: boolean;
  /** callback notifying parent of response changing */
  onUserResponseChanged?: (value: SupportedFormResponse["response"]) => void;
  /** True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
  /** Message to display if requiredAlert is set to true */
  alertMessage?: string;
  /** True if field response is invalid*/
  invalidAlert?: boolean;
  /** Message to display if invalidAlert is set to true */
  invalidMessage?: string;
} // ConsumableFieldCardProps

export const ConsumableFieldCard = (
  props: ConsumableFieldCardProps
): JSX.Element => {
  const {
    fieldMappings,
    formDefinition,
    disabled = false,
    response,
    requiredAlert = false,
    alertMessage,
    invalidAlert,
    invalidMessage,
    onUserResponseChanged,
  } = props;

  const handleResponseChanged = (
    response: SupportedFormResponse["response"]
  ) => {
    if (!disabled && onUserResponseChanged) {
      onUserResponseChanged(response);
    }
  }; // handleResponseChanged

  const fieldMapping = fieldMappings[formDefinition.fieldData.type];

  const formResponse = (response ?? fieldMapping.defaultFieldResponse) as any;
  const formPayload = (formDefinition.fieldData.payload ?? {}) as any;
  const responseValid: ResponseValidResult =
    fieldMapping.isFieldResponseValid === undefined
      ? { type: "valid" }
      : fieldMapping.isFieldResponseValid(formPayload, formResponse);

  const responseEmpty: boolean =
    fieldMapping.isFieldResponseEmpty === undefined
      ? false
      : fieldMapping.isFieldResponseEmpty(formPayload, formResponse);

  return (
    <>
      {fieldMapping.consumptionComponentProducer({
        ...formDefinition,
        promptText: formDefinition.promptText,
        required: formDefinition.required,
        requiredAlert: requiredAlert && formDefinition.required && responseEmpty,
        alertMessage: alertMessage,
        invalidAlert: invalidAlert && responseValid.type === "invalid",
        invalidMessage:
          responseValid.type === "invalid"
            ? responseValid.reason
            : invalidMessage,
        fieldPayload: formPayload,
        response: formResponse,
        onResponseChanged: handleResponseChanged,
        disabled: disabled,
      })}
    </>
  );
}; // ConsumableFieldCard
