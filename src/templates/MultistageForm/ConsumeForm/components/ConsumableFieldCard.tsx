import { cloneDeep } from "lodash";
import { useState } from "react";
import {
  SupportedFormField,
  SupportedFormResponse,
  AvailableMultistageFormFieldType,
  ConsumableFieldProps,
  MultistageFormFieldDefinition,
  MultistageFormResponses,
} from "../../../../services/multistageFormActivity.model";

export type FormFieldMappings<
  Payload extends SupportedFormField,
  Response extends SupportedFormResponse
> = {
  /** What type of field we are working with here*/
  [T in AvailableMultistageFormFieldType]: {
    /** Generation logic to use to create a form editing component */
    consumptionComponentProducer: (
      consumptionFormProps: ConsumableFieldProps<
        Extract<Payload, { type: T }>["payload"],
        Extract<Response, { type: T }>["response"]
      >
    ) => JSX.Element;
    defaultResponse: Extract<Response, { type: T }>["response"];
    /** Default value for FieldPayload */
  };
}; // FormFieldMappings

export interface ConsumableFieldCardProps {
  /** What  mappings we are working with in this consumable field card (available field types and how to render them) */
  fieldMappings: FormFieldMappings<SupportedFormField, SupportedFormResponse>;
  /** Form definition to use to render this field */
  formDefinition: MultistageFormFieldDefinition;
  /** Responses already provided by the users, if any */
  initialUserResponses?: MultistageFormResponses;
  /** callback notifying parent of responses changing */
  onUserResponsesChanged?: (value: MultistageFormResponses) => void;
} // ConsumableFieldCardProps

export const ConsumableFieldCard = (
  props: ConsumableFieldCardProps
): JSX.Element => {
  const {
    fieldMappings,
    formDefinition,
    initialUserResponses,
    onUserResponsesChanged,
  } = props;

  const [responses, setResponses] = useState<MultistageFormResponses>(
    initialUserResponses ??
      fieldMappings[formDefinition.fieldData.type].defaultResponse
  );

  const handleResponseChanged = (
    id: string,
    response: SupportedFormResponse["response"]
  ) => {
    const newResponses = cloneDeep(responses);
    newResponses[id] = response;

    setResponses(newResponses);

    if (onUserResponsesChanged) {
      onUserResponsesChanged(newResponses);
    }
  }; // handleResponseChanged

  const fieldMapping = fieldMappings[formDefinition.fieldData.type];

  return (
    <>
      {fieldMapping.consumptionComponentProducer({
        promptText: formDefinition.promptText,
        required: formDefinition.required,
        fieldPayload: formDefinition.fieldData.payload as any,
        response: (responses[formDefinition._id] ??
          fieldMapping.defaultResponse) as any,
        onResponseChanged: (res) =>
          handleResponseChanged(formDefinition._id, res),
      })}
    </>
  );
}; // ConsumableFieldCard
