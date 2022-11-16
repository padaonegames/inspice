import {
  CharacterDefinition,
  DiaryPageDefinition,
} from "../../../../services/escapeRoomActivity.model";

import styled from "styled-components";

import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";
import CharacterDefinitionsCard from "../cards/CharacterDefinitionsCard";
import DiaryDefinitionCard from "../cards/DiaryDefinitionCard";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  margin-bottom: 4.5vh;
  justify-content: center;
  align-items: center;
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
const Root = styled.div`
  position: relative;
  height: 10%;
  width: 100%;
  cursor: pointer;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) => props.theme.frameColor};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 3px 0px #000000;

  &:hover {
    box-shadow: 0px 0px 7px 0px #000000;
  }
`;

export interface EscapeRoomSettingsProps {
  /** Name of the current escape room that the user is editing */
  escapeRoomTitle: string;
  /** Description of the current escape room that the user is editing */
  escapeRoomDescription: string;
  /** Characters involved in the current escape room that the user is editing */
  escapeRoomCharacters: CharacterDefinition[];
  /** Diary pages featured in the current escape room that the user is editing */
  escapeRoomDiaryPages: DiaryPageDefinition[];
  /** Callback to parent component to notify any changes made to the escape room's title */
  onTitleChanged?: (title: string) => void;
  /** Callback to parent component to notify any changes made to the escape room's description */
  onDescriptionChanged?: (title: string) => void;
  /** Callback to parent component to notify any changes made to the escape room's characters */
  onCharactersChanged?: (characters: CharacterDefinition[]) => void;
  /** Callback to parent component to notify of any changes made to the escape room's diary pages */
  onDiaryPagesChanged?: (diaryPages: DiaryPageDefinition[]) => void;
} // EscapeRoomSettingsProps

export const EscapeRoomSettings = (
  props: EscapeRoomSettingsProps
): JSX.Element => {
  const {
    escapeRoomTitle,
    escapeRoomCharacters,
    escapeRoomDescription,
    escapeRoomDiaryPages,
    onTitleChanged,
    onDescriptionChanged,
    onCharactersChanged,
    onDiaryPagesChanged,
  } = props;

  const handleEditTitle = (value: string) => {
    if (!onTitleChanged) return;
    onTitleChanged(value);
  }; // handleEditTitle

  const handleEditDescription = (value: string) => {
    if (!onDescriptionChanged) return;
    onDescriptionChanged(value);
  }; // handleEditTitle

  const handleEditCharacters = (value: CharacterDefinition[]) => {
    if (!onCharactersChanged) return;
    onCharactersChanged(value);
  }; // handleEditCharacters

  const handleEditDiaryPages = (value: DiaryPageDefinition[]) => {
    if (!onDiaryPagesChanged) return;
    onDiaryPagesChanged(value);
  }; // handleEditCharacters

  return (
    <Wrapper>
      <StepTitleCard
        stepTitle="Escape Room Settings"
        stepDescription="Below, enter a title and a description for your escape room activity, and use the Characters tool to configure which characters you would like to use for your activity's dialogues"
      />
      <ShortTextInputCard
        promptText="Activity Title:"
        required
        fieldPayload={{ placeholder: "Activity Title" }}
        response={{ text: escapeRoomTitle }}
        onResponseChanged={(value) => handleEditTitle(value.text)}
      />
      <LongTextInputCard
        promptText="ActivityDescription:"
        response={{ text: "" }}
        fieldPayload={{ placeholder: "Activity Description" }}
        onResponseChanged={(value) => handleEditDescription(value.text)}
      />
      <CharacterDefinitionsCard
        promptText="Characters:"
        required
        response={{ characters: escapeRoomCharacters }}
        fieldPayload={{}}
        onResponseChanged={(value) => handleEditCharacters(value.characters)}
      />
      <DiaryDefinitionCard
        promptText="Diary Pages:"
        required
        response={{ diaryPages: escapeRoomDiaryPages }}
        fieldPayload={{}}
        onResponseChanged={(value) => handleEditDiaryPages(value.diaryPages)}
      />
    </Wrapper>
  );
}; // EditableWaitingCodeItemContent

const PreviewTitle = styled.div`
  width: 90%;

  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.titleFontSize};
  text-align: center;
  text-overflow: ellipsis;
  color: rgb(255, 255, 255);

  border-bottom: 1px solid white;
  padding: 0.5em 0;

  margin-bottom: 0.25rem;
  letter-spacing: 0.2px;
  overflow: hidden;
  white-space: nowrap;
`;

const PreviewAnswers = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-family: ${(props) => props.theme.contentFont};
  overflow: hidden;
  text-overflow: ellipsis;
  height: 30%;
  width: 90%;
  max-width: 90%;
  max-height: 30%;
  display: block;
  white-space: nowrap;

  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(255, 255, 255);
`;

export interface EscapeRoomSettingsStageSlideProps {
  /** text to display for the add new option label. */
  title?: string;
  goToSettings: () => void;
} // EditableMultipleChoiceItemContentProps

export const EscapeRoomSettingsStageSlide = (
  props: EscapeRoomSettingsStageSlideProps
): JSX.Element => {
  const { title, goToSettings } = props;

  return (
    <Root
      onClick={() => {
        goToSettings && goToSettings();
      }}
    >
      {/* <SettingsIcon /> */}
      <PreviewTitle>Escape Room</PreviewTitle>
      <PreviewAnswers>{title === "" ? "No title" : title}</PreviewAnswers>
    </Root>
  );
}; // EscapeRoomSettingsItemStageSlide
export default EscapeRoomSettings;
