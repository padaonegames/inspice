import { ConsumableFieldProps } from "../../../services/multistageFormActivity.model";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { CheckboxList, CheckboxOption } from "./cardStyles";
import FormCard from "./FormCard";

//------------------------
//    TEXT LIST FIELD
//------------------------
export interface ConfigureMultipleChoiceFieldDefinition {
  /** maximum number of options to allow */
  maxAnswers?: number;
  /** label for adding a new option to the list*/
  addNewAnswerLabel?: string;
} // ConfigureMultipleChoiceFieldDefinition

export interface ConfigureMultipleChoiceResponseDefinition {
  /** answers to choose from */
  answers: string[];
  /** indices of the answers that are considered correct */
  correctAnswers: number[];
} // ConfigureMultipleChoiceResponseDefinition

export interface ConfigureMultipleChoiceCardProps
  extends ConsumableFieldProps<
    ConfigureMultipleChoiceFieldDefinition,
    ConfigureMultipleChoiceResponseDefinition
  > {} // ConfigureMultipleChoiceCardProps

export const ConfigureMultipleChoiceCard = (
  props: ConfigureMultipleChoiceCardProps
): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    fieldPayload,
    response,
    onResponseChanged,
  } = props;

  const { addNewAnswerLabel = "Add new answer" } = fieldPayload;
  const { answers, correctAnswers } = response;

  const handleAddAnswer = () => {
    if (!onResponseChanged) return;
    onResponseChanged({
      ...response,
      answers: [...response.answers, `Answer ${response.answers.length + 1}`],
    });
  }; // handleAddAnswer

  const handleEditAnswer = (index: number, value: string) => {
    if (!onResponseChanged) return;
    onResponseChanged({
      ...response,
      answers: [
        ...response.answers.slice(0, index),
        value,
        ...response.answers.slice(index + 1),
      ],
    });
  }; // handleEditAnswer

  const handleRemoveAnswer = (index: number) => {
    if (!onResponseChanged) return;
    onResponseChanged({
      ...response,
      answers: response.answers.filter((_, i) => i !== index),
      correctAnswers: response.correctAnswers.flatMap((i) =>
        i < index ? [i] : i > index ? [i - 1] : []
      ),
    });
  }; // handleRemoveAnswer

  const handleSetAnswerCorrectStatus = (index: number, checked: boolean) => {
    if (!onResponseChanged) return;
    if (response.correctAnswers.includes(index)) {
      // answer was correct, only remove if checked = false
      if (!checked) {
        // remove answer
        onResponseChanged({
          ...response,
          correctAnswers: response.correctAnswers.filter(
            (elem) => elem !== index
          ),
        });
      }
    } else {
      // answer was incorrect, only add if checked = true
      if (checked) {
        // add answer
        onResponseChanged({
          ...response,
          correctAnswers: [...response.correctAnswers, index],
        });
      }
    }
  }; // handleSetAnswerCorrectStatus

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <CheckboxList>
        {answers.map((elem, i) => (
          <CheckboxOption key={`checkBoxAnswer${i}`}>
            <EditableCheckBoxInput
              boxContent={{
                type: "check",
                checked: correctAnswers.includes(i),
                onCheckToggle: () =>
                  handleSetAnswerCorrectStatus(i, !correctAnswers.includes(i)),
              }}
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              style="radio"
              boxSize="1.75em"
              onObjectRemoved={() => handleRemoveAnswer(i)}
              onLabelTextChanged={(value) => handleEditAnswer(i, value)}
            />
          </CheckboxOption>
        ))}
        <CheckboxOption onClick={handleAddAnswer} key="checkBoxAnswerAddNew">
          <EditableCheckBoxInput
            boxContent={{ type: "none" }}
            key="editableCheckBoxInputAddNew"
            labelText=""
            labelTextPlaceholder={addNewAnswerLabel}
            style="radio"
            boxSize="1.75em"
            enabled={false}
          />
        </CheckboxOption>
      </CheckboxList>
    </FormCard>
  );
}; // ConfigureMultipleChoiceCard

export default ConfigureMultipleChoiceCard;
