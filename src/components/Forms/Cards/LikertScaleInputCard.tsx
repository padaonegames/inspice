import styled, { css } from "styled-components";
import {
  ConsumableFieldProps,
  LikertScaleFieldDefinition,
  LikertScaleResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import LikertResponse, { EditableLikertResponse } from "../LikertResponse";
import { RequiredAsterisk } from "./cardStyles";
import { AddCircle } from "@styled-icons/fluentui-system-regular/AddCircle";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { Minus } from "@styled-icons/evaicons-solid/Minus";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";
import {
  addItemToArray,
  removeItemFromArrayByIndex,
  transformItemFromArrayByIndex,
} from "../../../utils/arrayUtils";
import React from "react";

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
  > {} // LikertScaleInputCardProps

export const LikertScaleInputCard = (
  props: LikertScaleInputCardProps
): JSX.Element => {
  const {
    promptText = "",
    requiredAlert,
    required,
    response,
    fieldPayload,
    alertMessage,
    onResponseChanged,
    ...htmlProps
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
      responses: { ...responses, [questionIndex]: scaleIndex },
    });
  }; // handleResponseSelected

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
      alertMessage={alertMessage}
      {...htmlProps}
    >
      {questions.map((question, qInd) => (
        <React.Fragment key={`${qInd}_frag`}>
          <QuestionText key={`${qInd}_question`}>
            {`${showQuestionsIndex ? qInd + 1 + ". " : ""}${question}`}
            {required && <RequiredAsterisk> *</RequiredAsterisk>}
          </QuestionText>
          <LikertScaleContainer key={`${qInd}_container`}>
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
                  key={`${question}_${rInd}`}
                  onResponseSelected={() => handleResponseSelected(qInd, rInd)}
                  selected={responses[qInd] === rInd}
                />
              ))}
            </LikertBand>
          </LikertScaleContainer>
        </React.Fragment>
      ))}
    </FormCard>
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
  font-size: 1.25rem;
  font-weight: 200;
  color: white;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

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
  enabled: boolean;
}

const scaleIconStyle = css<ButtonProps>`
  height: 1.75em;
  width: 1.75em;
  cursor: ${(props) => (props.enabled ? "pointer" : "default")};

  border-radius: 5px;
  border: 1px solid #dadce0;
  background-color: #f8f9fa;
  opacity: ${(props) => (props.enabled ? "1" : "0.3")};
  ${(props) =>
    props.enabled &&
    `
  &:hover {
    background-color: rgba(230, 230, 230, 1);
  }`}
`;

const AddScaleIcon = styled(Add)<ButtonProps>`
  ${scaleIconStyle}
`;

const DecreaseScaleIcon = styled(Minus)<ButtonProps>`
  ${scaleIconStyle}
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

  const canAddScaleItem = scale.length < 7;
  const canRemoveScaleItem = scale.length > 3;

  const handleAddQuestion = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: addItemToArray(
        questions,
        `Question ${questions.length + 1}`,
        questions.length
      ),
    });
  }; // handleAddQuestion

  const handleRemoveQuestion = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: removeItemFromArrayByIndex(questions, index),
    });
  }; // handleRemoveQuestion

  const handleQuestionChanged = (index: number, newQuestion: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      questions: transformItemFromArrayByIndex(
        questions,
        index,
        () => newQuestion
      ),
    });
  }; // handleQuestionChanged

  const handleScaleEdited = (index: number, newScaleName: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      scale: transformItemFromArrayByIndex(scale, index, () => newScaleName),
    });
  }; // handleScaleEdited

  const handleChangeScaleSteps = (operation: "add" | "remove") => {
    if (!onPayloadChanged) return;

    if (operation === "add" && canAddScaleItem) {
      onPayloadChanged({
        ...fieldPayload,
        scale: addItemToArray(
          fieldPayload.scale,
          "New value",
          fieldPayload.scale.length
        ),
      });
    } else if (operation === "remove" && canRemoveScaleItem) {
      onPayloadChanged({
        ...fieldPayload,
        scale: removeItemFromArrayByIndex(
          fieldPayload.scale,
          fieldPayload.scale.length - 1
        ),
      });
    }
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
            onMouseDown={() => handleChangeScaleSteps("remove")}
            enabled={canRemoveScaleItem}
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
            onMouseDown={() => handleChangeScaleSteps("add")}
            enabled={canAddScaleItem}
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

      {/* List of questions that the user needs to answer with the scale given */}
      {questions.map((question, qInd) => (
        <React.Fragment key={qInd}>
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
        </React.Fragment>
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
