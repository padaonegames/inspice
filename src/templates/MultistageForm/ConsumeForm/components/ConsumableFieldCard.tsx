import { useState } from "react";
import {
  SupportedFormField,
  SupportedFormResponse,
  ConsumableFieldProps,
  MultistageFormField,
} from "../../../../services/multistageFormActivity.model";

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
  /** Response already provided by the user, if any */
  initialUserResponse?: SupportedFormResponse["response"];
  /** callback notifying parent of response changing */
  onUserResponseChanged?: (value: SupportedFormResponse["response"]) => void;
} // ConsumableFieldCardProps

export const ConsumableFieldCard = (
  props: ConsumableFieldCardProps
): JSX.Element => {
  const {
    fieldMappings,
    formDefinition,
    initialUserResponse,
    onUserResponseChanged,
  } = props;

  const [response, setResponse] = useState<SupportedFormResponse["response"]>(
    initialUserResponse ??
      fieldMappings[formDefinition.fieldData.type].defaultFieldResponse
  );

  const handleResponseChanged = (
    response: SupportedFormResponse["response"]
  ) => {
    setResponse(response);

    if (onUserResponseChanged) {
      onUserResponseChanged(response);
    }
  }; // handleResponseChanged

  const fieldMapping = fieldMappings[formDefinition.fieldData.type];

  return (
    <>
      {fieldMapping.consumptionComponentProducer({
        ...formDefinition,
        promptText: formDefinition.promptText,
        required: formDefinition.required,
        fieldPayload: formDefinition.fieldData.payload as any,
        response: (response ?? fieldMapping.defaultFieldResponse) as any,
        onResponseChanged: handleResponseChanged,
      })}
    </>
  );
}; // ConsumableFieldCard
