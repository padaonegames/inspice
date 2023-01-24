import {
  ConsumableFieldProps,
  MultipleChoiceFieldDefinition,
  MultipleChoiceResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import {
  addItemToArray,
  removeItemFromArrayByIndex,
  transformItemFromArrayByIndex,
} from "../../../utils/arrayUtils";
import CheckBoxInput from "../CheckBoxInput";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { CheckboxList, CheckboxOption } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";

export interface MultipleChoiceCardProps
  extends ConsumableFieldProps<
    MultipleChoiceFieldDefinition,
    MultipleChoiceResponseDefinition
  > {} // MultipleChoiceCardProps

export const MultipleChoiceCard = (
  props: MultipleChoiceCardProps
): JSX.Element => {
  const {
    fieldPayload,
    response,
    onResponseChanged,
    disabled = false,
    ...formProps
  } = props;

  const { answers, maxAnswers = answers.length } = fieldPayload;
  const { selectedResponses } = response;

  const handleAnswerToggle = (index: number) => {
    if (disabled || !onResponseChanged || !isAnswerEnabled(index)) return;
    if (selectedResponses.some((e) => e === index)) {
      // answer was already selected
      onResponseChanged({
        selectedResponses: selectedResponses.filter((e) => e !== index),
      });
    } else {
      // answer not present => add to list if maxAnswers > 1
      if (maxAnswers > 1) {
        onResponseChanged({ selectedResponses: [...selectedResponses, index] });
      } else {
        onResponseChanged({ selectedResponses: [index] });
      }
    }
  }; // handleAnswerToggle

  const isAnswerEnabled = (index: number) => {
    /** Answer should be enabled if it is already selected (to disable it),
     *  if max number of answers is 1 (in which case, any answer should be selectable),
     *  and if maximum number of answer hasn't been reached yet.
     */
    return (
      !disabled &&
      (selectedResponses.some((e) => e === index) ||
        maxAnswers === 1 ||
        selectedResponses.length < (maxAnswers || 1))
    );
  }; // isAnswerEnabled

  return (
    <FormCard {...formProps}>
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
      answers: addItemToArray(
        fieldPayload.answers,
        `Option ${fieldPayload.answers.length + 1}`,
        fieldPayload.answers.length
      ),
    });
  }; // handleAddOption

  const handleEditOption = (index: number, value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      answers: transformItemFromArrayByIndex(
        fieldPayload.answers,
        index,
        () => value
      ),
    });
  }; // handleEditOption

  const handleRemoveOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      answers: removeItemFromArrayByIndex(fieldPayload.answers, index),
    });
  }; // handleRemoveOption

  return (
    <>
      <CheckboxList>
        {answers.map((elem, i) => (
          <CheckboxOption key={`checkBoxOption${i}`}>
            <EditableCheckBoxInput
              boxContent={{ type: "none" }}
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              style="radio"
              boxSize="15px"
              inputType="text"
              onObjectRemoved={() => handleRemoveOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
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
    </>
  );
}; // EditableMultipleChoiceCardContent

export default MultipleChoiceCard;
