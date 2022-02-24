import styled from "styled-components";
import LikertResponse from "../LikertResponse";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
} from "./cardStyles";

const QuestionText = styled.div`
  // font: 400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: 0.95em;
  font-weight: 400;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
`;

const LikertScaleContainer = styled.fieldset`
  margin-bottom: 0.5em;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: 0.1em;
  background-color: transparent;

  border-bottom: 2px solid #dadce0;
  padding-bottom: 1.25em;
  background-color: transparent;
`;

const LikertBand = styled.div`
  flex-grow: 4; /* This can get overridden by the “flexible” prop. */
  flex-shrink: 0;
  flex-basis: auto;

  display: flex;
  padding-top: 0.6em;
  margin-top: 0.6em;
`;

const VerticalSpace = styled.div`
  height: 1em;
`;

export interface LikertScaleInputCardProps {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must reply to within this card.
   * This can be interpreted as a general explanation of the fields below, likely including some sort of description of the nature
   * of the questions and the meaning of the possible answers.
   */
  promptText: string;
  /** Callback to parent component specifying that user has specified a new value for a given question */
  onValueSelected?: (questionIndex: number, responseIndex: number) => void;
  /** Which answer has been selected for each of the given questions (index can be undefined to represent that it hasn't been answered yet) */
  selectedAnswers: (number | undefined)[];
  /** A list of possible responses to the prompt (general values that the user may choose from when repying to any given question in this card) */
  scale: string[];
  /** A list containing all questions asked to the user, all of which will use the scale specified above */
  questions: string[];
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** Whether to display the question index next to each item */
  showQuestionIndex?: boolean;
}

export const LikertScaleInputCard = (props: LikertScaleInputCardProps): JSX.Element => {

  const {
    promptText,
    onValueSelected,
    selectedAnswers,
    requiredAlert,
    required,
    scale,
    questions,
    showQuestionIndex = false
  } = props;

  const handleResponseSelected = (questionIndex: number, scaleIndex: number) => {
    if (questionIndex < 0 || questionIndex >= questions.length) return;
    if (scaleIndex < 0 || scaleIndex >= scale.length) return;

    if (onValueSelected)
      onValueSelected(questionIndex, scaleIndex);
  }

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <VerticalSpace />
        {questions.map((question, qInd) => (
          <>
            <QuestionText>
              {`${showQuestionIndex ? ((qInd + 1) + '. ') : ''}${question}`}{required && <RequiredAsterisk> *</RequiredAsterisk>}
            </QuestionText>
            <LikertScaleContainer>
              <LikertBand>
                {scale.map((response, rInd) => (
                  <LikertResponse
                    responseText={response}
                    position={rInd === 0 ? 'first' : (rInd === scale.length - 1 ? 'last' : 'middle')}
                    key={question}
                    onResponseSelected={() => handleResponseSelected(qInd, rInd)}
                    selected={qInd < selectedAnswers.length && selectedAnswers[qInd] === rInd}
                  />
                ))}
              </LikertBand>
            </LikertScaleContainer>
          </>
        ))}
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default LikertScaleInputCard;