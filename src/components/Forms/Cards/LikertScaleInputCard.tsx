import { useState } from "react";
import styled from "styled-components";
import { EditableFieldProps, LikertScaleFieldDefinition } from "../../../services/multistageFormActivity.model";
import LikertResponse from "../LikertResponse";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  SelectFieldTypeDropdownButton,
  InputText,
} from "./cardStyles";
import FormActionsFloatingCard from "./FormActionsFloatingCarc";
import { AddCircle } from '@styled-icons/fluentui-system-regular/AddCircle';
import { Cross } from '@styled-icons/entypo/Cross';



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
  //
  background-color:rgba(255,255,0,0.5);
`;

const LikertScaleSampleContainer = styled.fieldset`
  margin-bottom: 0.5em;
  width:100%;
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
  //
  background-color:rgba(255,0,255,0.5);
`;

const LikertBand = styled.div`
  flex-grow: 4; /* This can get overridden by the “flexible” prop. */
  flex-shrink: 0;
  flex-basis: auto;

  display: flex;
  padding-top: 0.6em;
  margin-top: 0.6em;
  
  //
  background-color: rgba(255,0,255,0.5);
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



const ScaleConfigContainer = styled.div`
display: flex;
flex-direction: column;
padding-top: 0.6em;
align-items:center;
justify-content:center;

//
background-color: rgba(0,0,255,0.5);
`;

const ScaleConfigurator = styled.div`
display: flex;
width:50%;
padding-top: 0.6em;
height:50px;

//
background-color: rgba(0,0,0,0.5);
`;

const QuestionContainer = styled.div`
display: flex;
width:100%;
padding-top: 0.6em;
justify-content: space-between;

//
background-color: rgba(0,100,0,0.5);
`;
const RemoveQuestionIcon = styled(Cross)`
  cursor: pointer;
  height: 50px;
  width: 50px;
  align-self: flex-end;
  color: black;
`;

const AddQuestionContainer = styled.div`
  display: flex;
  flex-direction: row;

  transition: all .3s cubic-bezier(0.4,0,0.2,1);
  justify-content: center;
  align-self:center;
  align-items: center;
  width: 50px;
  padding: 0.5em;
  margin: 0.5em 0;

  border-radius: 8px;
  border: 1px solid #dadce0;
  background-color: rgba(255,0,0,0.5);
  &:hover {
    background-color: #f8f9fa;
  }
`;

const AddQuestionIcon = styled(AddCircle)`
  height: 1.75em;
  width: 1.75em;
`;



export interface EditableLikertScaleCardContentProps extends EditableFieldProps<LikertScaleFieldDefinition> {

} // EditableLikertScaleCardContentProps


export const EditableLikertScaleCardContent = (props: EditableLikertScaleCardContentProps): JSX.Element => {

  const {
    fieldPayload,
    onPayloadChanged
  } = props;

  const {
    questions,
    scale,
    showQuestionsIndex = false
  } = fieldPayload;

  const [scaleLenght, setScaleLength] = useState<number>(3);

  const handleAddQuestion = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: [...fieldPayload.questions, '']
    })
  }; // handleAddQuestion

  const handleRemoveQuestion = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: fieldPayload.questions.filter((_, i) => i !== index)
    })
  }; // handleRemoveQuestion


  const handleQuestionChanged = (index: number, newQuestion: string) => {
    if (!onPayloadChanged) return;

    let finalQuetions = fieldPayload.questions;
    finalQuetions = [...finalQuetions.slice(0,index), newQuestion,...finalQuetions.slice(index+1,finalQuetions.length)]
    onPayloadChanged({
      ...fieldPayload,
      questions:finalQuetions
    })
  }

  const handleScaleChanged = (delta: number) => {
    let result = scaleLenght + delta;
    if (result < 3) { result = 3; return; }
    if (result > 8) { result = 8; return; }
    setScaleLength(result);

    let resultScale = scale;
    if (delta === 1) resultScale.push("New thing");
    if (delta === -1) resultScale.pop();

    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      scale: resultScale
    })
  }

  return (
    <>
      <ScaleConfigContainer>
        <ScaleConfigurator>

          <span>
            {"Scale of "}
            <button onClick={() => handleScaleChanged(-1)}>-</button>
            {scaleLenght}
            <button onClick={() => handleScaleChanged(1)}>+</button>
            {" elements"}
          </span>
        </ScaleConfigurator>

        <LikertScaleSampleContainer>
          <LikertBand>
            {scale.map((response, rInd) => (
              <LikertResponse
                responseText={response}
                position={rInd === 0 ? 'first' : (rInd === scale.length - 1 ? 'last' : 'middle')}
                key={"Sample question"}
                onResponseSelected={() => { }}
                selected={false}
              />
            ))}
          </LikertBand>
        </LikertScaleSampleContainer>
      </ScaleConfigContainer>

      {questions.map((question, qInd) => (
        <>
          <QuestionContainer>
            <InputText
              readOnly={false}
              placeholder={'New Question'}
              maxLength={1000}
              value={question}
              onChange={event => handleQuestionChanged(qInd, event.target.value)}
            />
            <RemoveQuestionIcon onMouseDown={()=>{handleRemoveQuestion(qInd)}}/>
          </QuestionContainer>
          <LikertScaleContainer>
            <LikertBand>
              {scale.map((response, rInd) => (
                <LikertResponse
                  responseText={response}
                  position={rInd === 0 ? 'first' : (rInd === scale.length - 1 ? 'last' : 'middle')}
                  key={question}
                  onResponseSelected={() => { }}
                  selected={false}
                />
              ))}
            </LikertBand>
          </LikertScaleContainer>
        </>
      ))}

      <AddQuestionContainer onMouseDown={() => { handleAddQuestion() }}>
        <AddQuestionIcon />
      </AddQuestionContainer>
    </>
  );
}; // EditableLikertScaleCardContent

export default LikertScaleInputCard;