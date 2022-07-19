import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  EditableFieldProps,
  LikertScaleFieldDefinition,
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
import { ChevronDown } from "styled-icons/bootstrap";
import EditableCheckBoxInput from "../EditableCheckBoxInput";

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

export const LikertScaleInputCard = (
  props: LikertScaleInputCardProps
): JSX.Element => {
  const {
    promptText,
    onValueSelected,
    selectedAnswers,
    requiredAlert,
    required,
    scale,
    questions,
    showQuestionIndex = false,
  } = props;

  const handleResponseSelected = (
    questionIndex: number,
    scaleIndex: number
  ) => {
    if (questionIndex < 0 || questionIndex >= questions.length) return;
    if (scaleIndex < 0 || scaleIndex >= scale.length) return;

    if (onValueSelected) onValueSelected(questionIndex, scaleIndex);
  };

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
              {`${showQuestionIndex ? qInd + 1 + ". " : ""}${question}`}
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
                      qInd < selectedAnswers.length &&
                      selectedAnswers[qInd] === rInd
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

const ScaleConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.6em;
  align-items: left;
  justify-content: left;

  //
  border-radius: 0.5rem;
  background-color: rgba(200, 200, 200, 1);
`;

const ScaleLengthConfigurator = styled.div`
  display: flex;
  width: 50%;
  padding-top: 0.6em;
  height: 50px;
`;

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

const AddScaleIcon = styled(Add)`
  height: 1.75em;
  width: 1.75em;
`;

const DecreaseScaleIcon = styled(Minus)`
  height: 1.75em;
  width: 1.75em;
`;

export interface EditableLikertScaleCardContentProps
  extends EditableFieldProps<LikertScaleFieldDefinition> {} // EditableLikertScaleCardContentProps

const ExpandDropdownIcon = styled(ChevronDown)`
  width: 0.8rem;
  height: 0.8rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 2.5em;
  background-color: ${(props) => props.theme.cardBackground};
  width: 100%;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${(props) => props.theme.textColor};
  padding: 0.5em 0.85em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  text-decoration: none;
  height: 2.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-family: ${(props) => props.theme.contentFont};

  &:hover {
    background-color: #eeeeee;
  }
`;

export const SelectFieldTypeDropdownButton = styled.span`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

  position: relative;
  height: 2.5em;
  width: 2rem;
  bottom: 10px;

  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.1rem 0px;
  border: 1px solid #dadce0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
  }
`;

export const EditableLikertScaleCardContent = (
  props: EditableLikertScaleCardContentProps
): JSX.Element => {
  // const [fieldTypeDropdownOpen, setFieldTypeDropdownOpen] = useState<boolean>(false);

  const { fieldPayload, onPayloadChanged } = props;

  const { questions, scale, showQuestionsIndex = false } = fieldPayload;

  // useEffect(() => {  }, [fieldPayload]);

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

  const handleFieldTypeSelected = (delta: number) => {
    if (!onPayloadChanged) return;

    let resultArray = scale;
    if (delta === 1 && resultArray.length < 7) resultArray.push("New Value");
    if (delta === -1 && resultArray.length > 3) resultArray.pop();

    onPayloadChanged({
      ...fieldPayload,
      scale: resultArray,
    });
  }; // handleFieldTypeSelected

  const availableMultistageFormItemTypes = [3, 4, 5, 6, 7, 8];

  return (
    <>
      <ScaleConfigContainer>
        <b>Scale structure</b>
        <ScaleLengthConfigurator>
          <span> Number of steps in the scale:</span>
          <DecreaseScaleIcon
            onMouseDown={() => handleFieldTypeSelected(-1)}
          />{" "}
          {scale.length}{" "}
          <AddScaleIcon onMouseDown={() => handleFieldTypeSelected(1)} />
          {/* <SelectFieldTypeDropdownButton onClick={() => {}}>
            {fieldPayload.scale.length} <ExpandDropdownIcon />
            {false &&
              <DropdownMenu>
                {availableMultistageFormItemTypes.map(elem => (
                  <DropdownMenuItem onClick={() => {handleFieldTypeSelected(elem)}}> {elem} </DropdownMenuItem>
                ))}
              </DropdownMenu>}
          </SelectFieldTypeDropdownButton> */}
        </ScaleLengthConfigurator>

        {/* Sample scale where the step values can be edited */}
        <LikertScaleContainer>
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
        </LikertScaleContainer>
      </ScaleConfigContainer>

      {/* List of questions that the user needs to answer withs the scale given */}
      {questions.map((question, qInd) => (
        <>
          {/* Question to answer */}
          <QuestionContainer>
            <EditableCheckBoxInput
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
