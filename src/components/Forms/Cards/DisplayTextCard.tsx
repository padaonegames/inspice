import styled from "styled-components";
import {
  EditableFieldProps,
  DisplayTextFieldDefinition,
} from "../../../services/multistageFormActivity.model";
import { EditableStepDescription, EditableText, Root } from "./cardStyles";
import FormCard from "./FormCard";
import { AbstractFormFactory } from "./FormFactory";

export const TextPreview = styled.div`
  font-size: 0.95em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};

  border: 2px solid #dadce0;
  border-radius: 0.5rem;
  padding: 5px 10px 5px 10px;
`;

export interface DisplayTextCardProps extends DisplayTextFieldDefinition {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // MultipleChoiceCardProps

export const DisplayTextCard = (props: DisplayTextCardProps): JSX.Element => {
  const { promptText = "", requiredAlert, required, text } = props;

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <TextPreview>{text}</TextPreview>
    </FormCard>
  );
}; // DisplayImageCard

export interface EditableDisplayTextCardContentProps
  extends EditableFieldProps<DisplayTextFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableMultipleChoiceCardContentProps

export const EditableDisplayTextCardContent = (
  props: EditableDisplayTextCardContentProps
): JSX.Element => {
  const {
    fieldPayload,
    addNewOptionLabel = "New option",
    onPayloadChanged,
  } = props;

  const { text } = fieldPayload;

  const handleEditText = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      text: value,
    });
  }; // handleEditOption

  return (
    <>
      <Root>
        <EditableText
          placeholder={"descriptionPlaceholder"}
          value={text}
          onChange={(event) => {
            handleEditText(event.target.value);
          }}
        />
      </Root>
    </>
  );
}; // EditableDisplayImageCardContent

export const displayTextCardFactory: AbstractFormFactory<DisplayTextFieldDefinition> =
  {
    userFormComponent: (useFormPayload) => (
      <DisplayTextCard {...useFormPayload} />
    ),
    formEditingComponent: (editingFormProps) => (
      <EditableDisplayTextCardContent {...editingFormProps} />
    ),
    defaultFormDefinition: {
      text: "",
    },
  }; // DisplayImageCardFactory

export default DisplayTextCard;
