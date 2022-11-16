import { ConsumableFieldProps } from "../../../services/multistageFormActivity.model";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { CheckboxList, CheckboxOption } from "./cardStyles";
import FormCard from "./FormCard";

//------------------------
//    TEXT LIST FIELD
//------------------------
export interface TextListFieldDefinition {
  /** maximum number of texts to allow */
  maxTexts?: number;
  /** label for adding a new text to the list*/
  addNewOptionLabel?: string;
} // TextListFieldDefinition

export interface TextListResponseDefinition {
  /** texts included in the list */
  texts: string[];
} // TextListResponseDefinition

export interface TextListCardProps
  extends ConsumableFieldProps<
    TextListFieldDefinition,
    TextListResponseDefinition
  > {} // TextListCardProps

export const TextListCard = (props: TextListCardProps): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    fieldPayload,
    response,
    onResponseChanged,
  } = props;

  const { addNewOptionLabel = "Add new text" } = fieldPayload;
  const { texts } = response;

  const handleAddOption = () => {
    if (!onResponseChanged) return;
    onResponseChanged({
      texts: [...response.texts, `Option ${response.texts.length + 1}`],
    });
  }; // handleAddOption

  const handleEditOption = (index: number, value: string) => {
    if (!onResponseChanged) return;
    onResponseChanged({
      texts: [
        ...response.texts.slice(0, index),
        value,
        ...response.texts.slice(index + 1),
      ],
    });
  }; // handleEditOption

  const handleRemoveOption = (index: number) => {
    if (!onResponseChanged) return;
    onResponseChanged({
      texts: response.texts.filter((_, i) => i !== index),
    });
  }; // handleRemoveOption

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <CheckboxList>
        {texts.map((elem, i) => (
          <CheckboxOption key={`checkBoxOption${i}`}>
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              style="radio"
              boxSize="15px"
              onObjectRemoved={() => handleRemoveOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
              boxContent={{ type: "number", boxNumber: i + 1 }}
              inputType="text"
            />
          </CheckboxOption>
        ))}
        <CheckboxOption onClick={handleAddOption} key="checkBoxOptionAddNew">
          <EditableCheckBoxInput
            boxContent={{ type: "none" }}
            key="editableCheckBoxInputAddNew"
            labelText=""
            labelTextPlaceholder={addNewOptionLabel}
            style="radio"
            boxSize="15px"
            inputType="click"
          />
        </CheckboxOption>
      </CheckboxList>
    </FormCard>
  );
}; // TextListCard

export default TextListCard;
