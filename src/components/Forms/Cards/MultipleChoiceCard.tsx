import {
  ConsumableFieldProps,
  EditableFieldProps,
  MultipleChoiceFieldDefinition,
  MultipleChoiceResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import CheckBoxInput from "../CheckBoxInput";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { CheckboxList, CheckboxOption } from "./cardStyles";
import FormCard from "./FormCard";

export interface MultipleChoiceCardProps
  extends ConsumableFieldProps<
    MultipleChoiceFieldDefinition,
    MultipleChoiceResponseDefinition
  > {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // MultipleChoiceCardProps

export const MultipleChoiceCard = (
  props: MultipleChoiceCardProps
): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    fieldPayload,
    response,
    onResponseChanged,
  } = props;

  const { answers, maxAnswers } = fieldPayload;
  const { selectedResponses } = response;

  const handleAnswerToggle = (index: number) => {
    if (!onResponseChanged || !isAnswerEnabled(index)) return;
    if (selectedResponses.some((e) => e === index)) {
      // answer was already selected
      onResponseChanged({
        selectedResponses: selectedResponses.filter((e) => e !== index),
      });
    } else {
      // answer not present => add to list
      onResponseChanged({ selectedResponses: [...selectedResponses, index] });
    }
  }; // handleAnswerToggle

  const isAnswerEnabled = (index: number) => {
    /** Answer should be enabled if it is already selected (to disable it),
     *  if max number of answers is 1 (in which case, any answer should be selectable),
     *  and if maximum number of answer hasn't been reached yet.
     */
    return (
      selectedResponses.some((e) => e === index) ||
      maxAnswers === 1 ||
      selectedResponses.length < (maxAnswers || 1)
    );
  }; // isAnswerEnabled

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <CheckboxList>
        {answers.map((elem, i) => (
          <CheckboxOption key={elem}>
            <CheckBoxInput
              labelText={elem}
              checked={selectedResponses.some((e) => e === i)}
              style="radio"
              boxSize="15px"
              enabled={isAnswerEnabled(i)}
              onCheckedChange={() => handleAnswerToggle(i)}
            />
          </CheckboxOption>
        ))}
      </CheckboxList>
    </FormCard>
  );
}; // MultipleChoiceCard

export interface EditableMultipleChoiceCardContentProps
  extends EditableFieldProps<MultipleChoiceFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableMultipleChoiceCardContentProps

export const EditableMultipleChoiceCardContent = (
  props: EditableMultipleChoiceCardContentProps
): JSX.Element => {
  const {
    fieldPayload,
    addNewOptionLabel = "New option",
    onPayloadChanged,
  } = props;

  const { answers } = fieldPayload;

  const handleAddOption = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      answers: [
        ...fieldPayload.answers,
        `Option ${fieldPayload.answers.length + 1}`,
      ],
    });
  }; // handleAddOption

  const handleEditOption = (index: number, value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      answers: [
        ...fieldPayload.answers.slice(0, index),
        value,
        ...fieldPayload.answers.slice(index + 1),
      ],
    });
  }; // handleEditOption

  const handleRemoveOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      answers: fieldPayload.answers.filter((_, i) => i !== index),
    });
  }; // handleRemoveOption

  return (
    <>
      <CheckboxList>
        {answers.map((elem, i) => (
          <CheckboxOption key={`checkBoxOption${i}`}>
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              style="radio"
              boxSize="15px"
              onObjectRemoved={() => handleRemoveOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
            />
          </CheckboxOption>
        ))}
        <CheckboxOption onClick={handleAddOption} key="checkBoxOptionAddNew">
          <EditableCheckBoxInput
            key="editableCheckBoxInputAddNew"
            labelText=""
            labelTextPlaceholder={addNewOptionLabel}
            style="radio"
            boxSize="15px"
            enabled={false}
          />
        </CheckboxOption>
      </CheckboxList>
    </>
  );
}; // EditableMultipleChoiceCardContent

export default MultipleChoiceCard;
