import { EditableFieldProps, MultipleChoiceFieldDefinition } from "../../../services/multistageFormActivity.model";
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
  CheckboxOption,
} from "./cardStyles";

export interface MultipleChoiceCardProps extends MultipleChoiceFieldDefinition {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must check in the field */
  promptText: string;
  /** callback to parent component specifying that a given answer has been selected */
  onAnswerToggle?: (index: number) => void;
  /** Indices of selected answers (if max answers is set to 1, then we have an array with a single element) */
  selectedAnswers: number[];
  /** answers to choose from */
  answers: string[];
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** Maximum number of allowed answers */
  maxAnswers?: number;
  /** Enforce typing */
  type: 'multiple-choice';
}

export const MultipleChoiceCard = (props: MultipleChoiceCardProps): JSX.Element => {

  const {
    promptText,
    onAnswerToggle,
    selectedAnswers,
    answers,
    requiredAlert,
    required,
    maxAnswers
  } = props;

  const handleAnswerToggle = (index: number) => {
    if (!onAnswerToggle || !isAnswerEnabled(index)) return;
    onAnswerToggle(index);
  };

  const isAnswerEnabled = (index: number) => {
    /** Answer should be enabled if it is already selected (to disable it),
     *  if max number of answers is 1 (in which case, any answer should be selectable),
     *  and if maximum number of answer hasn't been reached yet.
     */
    return selectedAnswers?.some(e => e === index) || maxAnswers === 1 || selectedAnswers.length < (maxAnswers || 1);
  };

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <CheckboxList>
          {answers.map((elem, i) => (
            <CheckboxOption key={elem}>
              <CheckBoxInput
                labelText={elem}
                checked={selectedAnswers?.some(e => e === i)}
                style='radio'
                boxSize='15px'
                enabled={isAnswerEnabled(i)}
                onCheckedChange={() => handleAnswerToggle(i)}
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


export interface EditableMultipleChoiceCardContentProps extends EditableFieldProps<MultipleChoiceFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel: string;
}

export const EditableMultipleChoiceCardContent = (props: EditableMultipleChoiceCardContentProps): JSX.Element => {

  const {
    fieldDefinition,
    addNewOptionLabel,
    onDefinitionChanged
  } = props;

  const {
    answers,
    maxAnswers
  } = fieldDefinition;

  const handleAddOption = () => {
    if (!onDefinitionChanged) return;
    onDefinitionChanged({
      ...fieldDefinition,
      answers: [...fieldDefinition.answers, `Option ${fieldDefinition.answers.length + 1}`]
    })
  };

  const handleEditOption = (index: number, value: string) => {
    if (!onDefinitionChanged) return;
    onDefinitionChanged({
      ...fieldDefinition,
      answers: [
        ...fieldDefinition.answers.slice(0, index),
        value,
        ...fieldDefinition.answers.slice(index + 1)
      ]
    })
  };

  const handleRemoveOption = (index: number) => {
    if (!onDefinitionChanged) return;
    onDefinitionChanged({
      ...fieldDefinition,
      answers: fieldDefinition.answers.filter((_, i) => i !== index)
    })
  };

  return (
    <>
      <CheckboxList>
        {answers.map((elem, i) => (
          <CheckboxOption key={`checkBoxOption${i}`}>
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              style='radio'
              boxSize='15px'
              onObjectRemoved={() => handleRemoveOption(i)}
              onLabelTextChanged={(value) => handleEditOption(i, value)}
            />
          </CheckboxOption>
        ))}
        <CheckboxOption
          onClick={handleAddOption}
          key='checkBoxOptionAddNew'
        >
          <EditableCheckBoxInput
            key='editableCheckBoxInputAddNew'
            labelText=''
            labelTextPlaceholder={addNewOptionLabel}
            style='radio'
            boxSize='15px'
            enabled={false}
          />
        </CheckboxOption>
      </CheckboxList>
    </>
  );
};

export default MultipleChoiceCard;