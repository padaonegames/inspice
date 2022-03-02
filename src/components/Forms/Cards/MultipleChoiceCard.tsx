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
  CheckboxOption
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


export interface EditableMultipleChoiceCardContentProps extends MultipleChoiceFieldDefinition {
  /** answers to choose from, to be edited by the user */
  answers: string[];
  /** Maximum number of allowed answers */
  maxAnswers?: number;
  /** callback to parent specifying that an answer text has been changed */
  onAnswerChanged?: (index: number, value: string) => void;
  /** callback to parent specifying that maximum number of answers has been changed */
  onMaxAnswersChanged?: (value: number) => void;
  /** Enforce typing */
  type: 'multiple-choice';
}

export const EditableMultipleChoiceCardContent = (props: EditableFieldProps<MultipleChoiceFieldDefinition>): JSX.Element => {

  const {
    fieldDefinition,
    onDefinitionChanged
  } = props;

  const {
    answers,
    maxAnswers
  } = fieldDefinition;

  return (
    <>
      <CheckboxList>
        {answers.map((elem, i) => (
          <CheckboxOption key={elem}>
            <EditableCheckBoxInput
              labelText={elem}
              style='radio'
              boxSize='15px'
            />
          </CheckboxOption>
        ))}
      </CheckboxList>
    </>
  );
};

export default MultipleChoiceCard;