import styled from "styled-components";
import {
  ConsumableFieldProps,
  LikertScaleFieldDefinition,
  LikertScaleResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import LikertResponse, { EditableLikertResponse } from "../LikertResponse";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
} from "./cardStyles";
import { AddCircle } from "@styled-icons/fluentui-system-regular/AddCircle";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { Minus } from "@styled-icons/evaicons-solid/Minus";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { EditableFieldProps } from "./EditableFieldCard";

const QuestionText = styled.div`
  // font: 400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: 0.95em;
  font-weight: 400;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.contentFont};
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

export interface LikertScaleInputCardProps
  extends ConsumableFieldProps<
    LikertScaleFieldDefinition,
    LikertScaleResponseDefinition
  > {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must reply to within this card.
   * This can be interpreted as a general explanation of the fields below, likely including some sort of description of the nature
   * of the questions and the meaning of the possible answers.
   */
  promptText?: string;
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // LikertScaleInputCardProps

export const LikertScaleInputCard = (
  props: LikertScaleInputCardProps
): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    fieldPayload,
    response,
    onResponseChanged,
  } = props;

  const { scale, questions, showQuestionsIndex } = fieldPayload;
  const { responses } = response;

  const handleResponseSelected = (
    questionIndex: number,
    scaleIndex: number
  ) => {
    if (questionIndex < 0 || questionIndex >= questions.length) return;
    if (scaleIndex < 0 || scaleIndex >= scale.length) return;
    if (!onResponseChanged) return;

    onResponseChanged({
      responses: [
        ...responses.slice(0, questionIndex),
        scaleIndex,
        ...responses.slice(questionIndex + 1),
      ],
    });
  }; // handleResponseSelected

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}
          {required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <VerticalSpace />
        {questions.map((question, qInd) => (
          <>
            <QuestionText>
              {`${showQuestionsIndex ? qInd + 1 + ". " : ""}${question}`}
              {required && <RequiredAsterisk> *</RequiredAsterisk>}
            </QuestionText>
            <LikertScaleContainer>
              <LikertBand>
                {scale.map((response, rInd) => (
                  <LikertResponse
                    responseText={response}
                    position={
                      rInd === 0
                        ? "first"
                        : rInd === scale.length - 1
                        ? "last"
                        : "middle"
                    }
                    key={question}
                    onResponseSelected={() =>
                      handleResponseSelected(qInd, rInd)
                    }
                    selected={
                      qInd < responses.length && responses[qInd] === rInd
                    }
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

////////////// Scale configuration
const ScaleConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #c44c49;
  background-color: rgba(240, 240, 240, 1);
`;

const ScaleConfigTitle = styled.div`
  font-size: 1.75rem;
  font-weight: 200;
  color: #ffffff;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 115%;

  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #c44c49;
`;

const ScaleConfigLength = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  align-items: center;
  align-self: center;
  border-bottom: 2px solid #d4d4d4;
  padding-top: 0.6em;
  height: 50px;
`;

const SampleScaleStepContainer = styled.div`
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: 0rem 1rem 0rem 1rem;
`;

interface ButtonProps {
  avaliable: boolean;
}

const AddScaleIcon = styled(Add)<ButtonProps>`
  height: 1.75em;
  width: 1.75em;

  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #dadce0;
  background-color: #f8f9fa;
  opacity: ${(props) => (props.avaliable ? "1" : "0.3")};
  &:hover {
    background-color: rgba(230, 230, 230, 1);
  }
`;

const DecreaseScaleIcon = styled(Minus)<ButtonProps>`
  height: 1.75em;
  width: 1.75em;
  cursor: pointer;

  border-radius: 5px;
  border: 1px solid #dadce0;
  background-color: #f8f9fa;
  opacity: ${(props) => (props.avaliable ? "1" : "0.3")};
  &:hover {
    background-color: rgba(230, 230, 230, 1);
  }
`;

/////////////////// Questions

const QuestionContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 0.6em;
  justify-content: space-between;
`;

const AddQuestionContainer = styled.div`
  display: flex;
  flex-direction: row;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  justify-content: center;
  align-self: center;
  align-items: center;
  width: 50px;
  padding: 0.5em;
  margin: 0.5em 0;
  cursor: pointer;

  border-radius: 8px;
  border: 1px solid #dadce0;
  background-color: #f8f9fa;
  &:hover {
    background-color: rgba(230, 230, 230, 1);
  }
`;

const AddQuestionIcon = styled(AddCircle)`
  height: 1.75em;
  width: 1.75em;
`;

const EditableLikertScaleContainer = styled.fieldset`
  margin-bottom: 0.5em;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.1em;
  background-color: transparent;
  padding-bottom: 1.25em;
`;

export interface EditableLikertScaleCardContentProps
  extends EditableFieldProps<LikertScaleFieldDefinition> {} // EditableLikertScaleCardContentProps

export const EditableLikertScaleCardContent = (
  props: EditableLikertScaleCardContentProps
): JSX.Element => {
  const { fieldPayload, onPayloadChanged } = props;

  const { questions, scale, showQuestionsIndex = false } = fieldPayload;

  const handleAddQuestion = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: [...fieldPayload.questions, ""],
    });
  }; // handleAddQuestion

  const handleRemoveQuestion = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: fieldPayload.questions.filter((_, i) => i !== index),
    });
  }; // handleRemoveQuestion

  const handleQuestionChanged = (index: number, newQuestion: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: [
        ...questions.slice(0, index),
        newQuestion,
        ...questions.slice(index + 1),
      ],
    });
  }; // handleQuestionChanged

  const handleScaleEdited = (index: number, newScaleName: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      scale: [
        ...fieldPayload.scale.slice(0, index),
        newScaleName,
        ...fieldPayload.scale.slice(index + 1),
      ],
    });
  }; // handleScaleEdited

  const handleChangeScaleSteps = (delta: number) => {
    if (!onPayloadChanged) return;

    let resultArray = scale;
    if (delta === 1 && resultArray.length < 7) resultArray.push("New Value");
    if (delta === -1 && resultArray.length > 3) resultArray.pop();

    onPayloadChanged({
      ...fieldPayload,
      scale: resultArray,
    });
  }; // handleChangeScaleSteps

  return (
    <>
      {/* Likert Scale configurator */}
      <ScaleConfigContainer>
        {/* Title */}
        <ScaleConfigTitle>Scale</ScaleConfigTitle>
        {/* Configurator for the scale steps */}
        <ScaleConfigLength>
          <DecreaseScaleIcon
            onMouseDown={() => handleChangeScaleSteps(-1)}
            avaliable={scale.length > 3}
          />
          <SampleScaleStepContainer>
            <LikertResponse
              responseText={"Scale Step"}
              position={"middle"}
              key={"SampleScaleStepPreview"}
              onResponseSelected={() => {}}
              selected={false}
            />
          </SampleScaleStepContainer>
          <AddScaleIcon
            onMouseDown={() => handleChangeScaleSteps(1)}
            avaliable={scale.length < 7}
          />
        </ScaleConfigLength>

        {/* Sample scale where the step values can be edited */}
        <EditableLikertScaleContainer>
          <LikertBand>
            {scale.map((response, rInd) => (
              <EditableLikertResponse
                responseText={response}
                position={
                  rInd === 0
                    ? "first"
                    : rInd === scale.length - 1
                    ? "last"
                    : "middle"
                }
                key={`editableScaleAnswerInput${rInd}`}
                onResponseSelected={() => {}}
                onScaleEdited={(value) => {
                  handleScaleEdited(rInd, value);
                }}
                selected={false}
              />
            ))}
          </LikertBand>
        </EditableLikertScaleContainer>
      </ScaleConfigContainer>

      {/* List of questions that the user needs to answer withs the scale given */}
      {questions.map((question, qInd) => (
        <>
          {/* Question to answer */}
          <QuestionContainer>
            <EditableCheckBoxInput
              boxContent={{ type: "none" }}
              key={`editableCheckBoxInput${qInd}`}
              labelTextPlaceholder={"Write a question"}
              labelText={question}
              style="radio"
              boxSize="0px"
              onObjectRemoved={() => {
                handleRemoveQuestion(qInd);
              }}
              onLabelTextChanged={(value) => {
                handleQuestionChanged(qInd, value);
              }}
            />
          </QuestionContainer>
          {/* Scale to answer current question */}
          <LikertScaleContainer>
            <LikertBand>
              {/* List of options inside the scale */}
              {scale.map((response, rInd) => (
                <LikertResponse
                  responseText={response}
                  position={
                    rInd === 0
                      ? "first"
                      : rInd === scale.length - 1
                      ? "last"
                      : "middle"
                  }
                  key={`ScaleAnswerPreview${qInd.toString() + rInd.toString()}`}
                  onResponseSelected={() => {}}
                  selected={false}
                />
              ))}
            </LikertBand>
          </LikertScaleContainer>
        </>
      ))}

      {/* Button to add a new question to the form */}
      <AddQuestionContainer
        onMouseDown={() => {
          handleAddQuestion();
        }}
      >
        <AddQuestionIcon />
      </AddQuestionContainer>
    </>
  );
}; // EditableLikertScaleCardContent

export default LikertScaleInputCard;
