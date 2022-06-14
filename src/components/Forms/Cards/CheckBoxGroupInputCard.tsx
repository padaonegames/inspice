import { CheckboxGroupFieldDefinition, EditableFieldProps } from "../../../services/multistageFormActivity.model";
import CheckBoxInput from "../CheckBoxInput";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  CheckboxList,
  CheckboxOption
} from "./cardStyles";

export interface CheckBoxGroupInputCardProps extends CheckboxGroupFieldDefinition {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  onFieldToggle?: (field: string) => void;
  /** Array which contains the name of the fields checked. */
  checked?: string[];
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
}

export const CheckBoxGroupInputCard = (props: CheckBoxGroupInputCardProps): JSX.Element => {

  const {
    promptText,
    checked,
    fields,
    requiredAlert,
    required,
    onFieldToggle,
  } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <CheckboxList>
          {fields.map(elem => (
            <CheckboxOption key={elem}>
              <CheckBoxInput
                labelText={elem}
                checked={checked?.some(e => e === elem)}
                boxSize='15px'
                onCheckedChange={() => {
                  if (onFieldToggle)
                    onFieldToggle(elem);
                }}
              />
            </CheckboxOption>
          ))}
        </CheckboxList>
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export interface EditableCheckBoxGroupCardContentProps extends EditableFieldProps<CheckboxGroupFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel: string;
} // EditableCheckBoxGroupCardContentProps

export const EditableCheckBoxGroupCardContent = (props: EditableCheckBoxGroupCardContentProps): JSX.Element => {

  const {
    fieldPayload,
    addNewOptionLabel,
    onPayloadChanged
  } = props;

  const {
    fields,
  } = fieldPayload;

  const handleAddOption = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      fields: [...fieldPayload.fields, '']
    })
  };

  const handleRemoveOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      fields: fieldPayload.fields.filter((_, i) => i !== index)
    })
  };

  return (
    <>
      <CheckboxList>
        {fields.map((elem, i) => (
          <CheckboxOption key={elem}>
            <EditableCheckBoxInput
              labelText={elem}
              style='checkbox'
              boxSize='15px'
              onObjectRemoved={() => handleRemoveOption(i)}
            />
          </CheckboxOption>
        ))}
        <CheckboxOption
          onClick={handleAddOption}
          key='addNew'
        >
          <EditableCheckBoxInput
            labelText=''
            labelTextPlaceholder={addNewOptionLabel}
            style='checkbox'
            boxSize='15px'
            enabled={false}
          />
        </CheckboxOption>
      </CheckboxList>
    </>
  );
};


export default CheckBoxGroupInputCard;