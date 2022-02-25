import CheckBoxInput from "../CheckBoxInput";
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

export interface MultipleChoiceCardProps {
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

export default MultipleChoiceCard;