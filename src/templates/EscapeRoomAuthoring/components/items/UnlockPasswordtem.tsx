import {
  EditableItemProps,
  UnlockPasswordItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import { UpArrow } from "@styled-icons/boxicons-solid/UpArrow";
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow";
import { DotsTwoVertical } from "@styled-icons/entypo/DotsTwoVertical";
import { Root } from "./generalItemsStyles";

const UppArrowIcon = styled(UpArrow)`
  position: absolute;
  color: rgb(0, 0, 0);
  height: 50px;
  top: -25%;
  cursor: pointer;
`;
const DownArrowIcon = styled(DownArrow)`
  position: absolute;
  color: rgb(0, 0, 0);
  height: 50px;
  bottom: -25%;
  cursor: pointer;
`;
const DotsTwoVerticalIcon = styled(DotsTwoVertical)`
  position: relative;
  margin-left: -50px;
  margin-right: -50px;
  color: rgb(0, 0, 0);
  height: 50%;
`;

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "6em"};
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${(props) =>
    props.dimBackground ? "#f8f9fa" : "transparent"};
  resize: none;
  overflow-y: hidden;

  text-align: center;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;

const DescriptionEditorContainer = styled.div`
  position: relative;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const DescriptionEditorTitle = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  line-height: 135%;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  margin-top: 10px;
  border-radius: 0.5rem;

  color: white;
  background-color: rgb(19, 104, 206);
  box-shadow: rgb(15, 90, 188) 0px -4px 0px 0px inset;
`;

const PasswordEditorContainer = styled.div`
  position: relative;
  width: 60%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 0 0 1rem 1rem;
`;

const PasswordEditorTitle = styled.div`
  position: relative;
  height: 10%;
  width: 100%;

  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 25px;
  border-radius: 0.5rem;
  color: white;
  background-color: rgb(19, 104, 206);
  box-shadow: rgb(15, 90, 188) 0px -4px 0px 0px inset;
`;

const PasswordEditorDigits = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DigitEditor = styled.div`
  position: relative;
  width: 20%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  margin-left: 5px;
  margin-right: 5px;
  // border-color: rgba(0,0,0,1);
  border: 1px solid #000;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const Digit = styled.p`
  font-weight: 400;
  font-size: 120px;
  line-height: 1.5;
  transition: color 0.5s ease;
  word-wrap: break-word;
`;

export const EditableUnlockPasswordItemContent = (
  props: EditableItemProps<UnlockPasswordItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const { description, password } = payload;

  const handleEditDigit = (index: number, value: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      password: [
        ...payload.password.slice(0, index),
        value,
        ...payload.password.slice(index + 1),
      ],
    });
  }; // handleEditDigit

  const handleEditDescription = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      description: value,
    });
  }; // handleEditDescription

  return (
    <Root>
      {/* Desctiption that is going to be shown on this puzzle */}
      <DescriptionEditorContainer>
        <DescriptionEditorTitle>
          {" "}
          Description to help find out the password{" "}
        </DescriptionEditorTitle>
        <PromptField
          promptText={description}
          promptPlaceholder="Start typing your prompt"
          onPromptChange={(value) => {
            handleEditDescription(value);
          }}
        />
      </DescriptionEditorContainer>

      {/* Editor of the password */}
      <PasswordEditorContainer>
        <PasswordEditorTitle>Password to solve this puzzle</PasswordEditorTitle>
        {/* Container of the password digits */}
        <PasswordEditorDigits>
          {/* Digits that specify hours */}
          <DigitEditor>
            <UppArrowIcon
              onMouseDown={() => {
                handleEditDigit(0, (password[0] + 1) % 10);
              }}
            />
            <Digit>{password[0]}</Digit>
            <DownArrowIcon
              onMouseDown={() => {
                handleEditDigit(0, password[0] - 1 < 0 ? 9 : password[0] - 1);
              }}
            />
          </DigitEditor>
          <DigitEditor>
            <UppArrowIcon
              onMouseDown={() => {
                handleEditDigit(1, (password[1] + 1) % 10);
              }}
            />
            <Digit>{password[1]}</Digit>
            <DownArrowIcon
              onMouseDown={() => {
                handleEditDigit(1, password[1] - 1 < 0 ? 9 : password[1] - 1);
              }}
            />
          </DigitEditor>
          {/* Icon of the ":" that separate the digits */}
          <DotsTwoVerticalIcon />
          {/* Digits that specify minutes */}
          <DigitEditor>
            <UppArrowIcon
              onMouseDown={() => {
                handleEditDigit(2, (password[2] + 1) % 10);
              }}
            />
            <Digit>{password[2]}</Digit>
            <DownArrowIcon
              onMouseDown={() => {
                handleEditDigit(2, password[2] - 1 < 0 ? 9 : password[2] - 1);
              }}
            />
          </DigitEditor>
          <DigitEditor>
            <UppArrowIcon
              onMouseDown={() => {
                handleEditDigit(3, (password[3] + 1) % 10);
              }}
            />
            <Digit>{password[3]}</Digit>
            <DownArrowIcon
              onMouseDown={() => {
                handleEditDigit(3, password[3] - 1 < 0 ? 9 : password[3] - 1);
              }}
            />
          </DigitEditor>
        </PasswordEditorDigits>
      </PasswordEditorContainer>
    </Root>
  );
}; // EditableUnlockPasswordItemContent

const PreviewBody = styled.div`
  width: 100%;
  height: 100%;
`;
const PreviewBodyUpperArrows = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const PreviewBodyNumbers = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PreviewNumber = styled.div`
  font-size: 2em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  text-align: center;
  color: rgb(0, 0, 0);
  height: 100%;
  width: 20%;
`;

const UppArrowIconPreview = styled(UpArrow)`
  color: rgb(0, 0, 0);
  height: 100%;
  width: 20%;
`;
const DownArrowIconPreview = styled(DownArrow)`
  color: rgb(0, 0, 0);
  height: 100%;
  width: 20%;
`;
const DotsTwoVerticalIconPreview = styled(DotsTwoVertical)`
  color: rgb(0, 0, 0);
  height: 100%;
  width: 10%;
`;

export const UnlockPasswordItemStageSlide = (
  props: UnlockPasswordItemDefinition
): JSX.Element => {
  const { description, password } = props;

  return (
    <PreviewBody>
      <PreviewBodyUpperArrows>
        <UppArrowIconPreview />
        <UppArrowIconPreview />
        <DotsTwoVerticalIconPreview opacity={0} />
        <UppArrowIconPreview />
        <UppArrowIconPreview />
      </PreviewBodyUpperArrows>

      <PreviewBodyNumbers>
        <PreviewNumber>{password[0]}</PreviewNumber>
        <PreviewNumber>{password[1]}</PreviewNumber>
        <DotsTwoVerticalIconPreview />
        <PreviewNumber>{password[2]}</PreviewNumber>
        <PreviewNumber>{password[3]}</PreviewNumber>
      </PreviewBodyNumbers>

      <PreviewBodyUpperArrows>
        <DownArrowIconPreview />
        <DownArrowIconPreview />
        <DotsTwoVerticalIconPreview opacity={0} />
        <DownArrowIconPreview />
        <DownArrowIconPreview />
      </PreviewBodyUpperArrows>
    </PreviewBody>
  );
}; // narrativeItemStageSlide

export const unlockPasswordItemFactory: AbstractActivityItemFactory<UnlockPasswordItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableUnlockPasswordItemContent {...editingProps} />
    ),
    defaultDefinition: {
      password: [0, 0, 0, 0],
      description: "",
    },
  }; // narrativeItemFactory

export default EditableUnlockPasswordItemContent;
