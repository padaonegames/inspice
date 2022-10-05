import { useState, useContext } from "react";
import {
  EditableItemProps,
  NarrativeItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { EscapeRoomActivityContext } from "../../EscapeRoomContext";

import styled, { css } from "styled-components";
import { MessageRoundedAdd } from "@styled-icons/boxicons-regular/MessageRoundedAdd";
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots";
import { CardPanel, Root } from "../../../../components/Forms/Cards/cardStyles";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";
import DropdownInputCard from "../../../../components/Forms/Cards/DropdownInputCard";
import { NarrativeItemSlide } from "../NarrativeItemSlide";

const ThreeDotsIcon = styled(ThreeDots)`
  height: 1.35em;
  width: 1.35em;
  color: black;
  align-self: center;
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

interface CharacterPreviewContainerProps {
  src?: string;
}
const CharacterPreviewContainer = styled.div<CharacterPreviewContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 13.5em;

  background-size: contain;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: black;
  ${(props) =>
    props.src
      ? `background-image: url(${props.src});`
      : `background-color: darkred;`}
`;

const DialogsContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  width: 25%;
  height: 100%;
  max-height: 21em;
  border-right: 0px solid rgb(19, 104, 206);
  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px 0px;
  padding-top: 0;
  margin-right: 0.5em;
`;

const SlidesContainer = styled.div`
  height: 72.5%;
  width: 100%;
  background-color: ${(props) => props.theme.cardBackground};
  overflow-y: scroll; //scroll to always show
  overflow-x: hidden;
  margin: 0px 0px;
  scrollbar-gutter: stable;
  ::-webkit-scrollbar {
    width: 8px;
    z-index: 1000;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: start;
  justify-content: flex-start;
  min-width: 100%;
  padding: 0 0.75rem 0.75rem 0.75rem;
  z-index: 9999;
  border-top: 1px solid ${(props) => props.theme.bodyBackground};
  background-color: ${(props) => props.theme.cardBackground};
`;

const AddDialogButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  transition: all 0.2s ease 0s;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AddDialogButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.8em;
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: fit-content;
  text-align: center;
  padding: 0.4em 0.85em 0.4em 0.6em;
  color: white;
  width: fit-content;
  margin: auto;
`;

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddDialogIcon = styled(MessageRoundedAdd)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 21em;
  flex-direction: row;
  align-items: left;
`;

const InteractionContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: left;
  margin: 0.5em;
`;

const InteractionSettingsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0 10px 10px 10px;
  width: 100%;
  border-radius: 0 0.5rem 0.5rem 0;
  z-index: 0;
`;

export const EditableNarrativeItemContent = (
  props: EditableItemProps<NarrativeItemDefinition>
): JSX.Element => {
  const [selectedDialog, setSelectedDialog] = useState<number>(-1);

  const { availableCharacters } = useContext(EscapeRoomActivityContext);
  const { payload, onPayloadChanged } = props;

  const handleAddDialog = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      dialogues: [
        ...payload.dialogues,
        {
          characterName: "",
          text: "",
        },
      ],
    });
  }; // handleAddDialog

  const handleDeleteDialog = (dialogIndex: number) => {
    if (!onPayloadChanged) return;

    let result = selectedDialog;
    if (
      dialogIndex < selectedDialog ||
      selectedDialog === payload.dialogues.length - 1
    )
      result = result - 1;
    setSelectedDialog(result);
    onPayloadChanged({
      ...payload,
      dialogues: [
        ...payload.dialogues.slice(0, dialogIndex),
        ...payload.dialogues.slice(dialogIndex + 1),
      ],
    });
  }; // handleAddDialog

  const handleMoveDialogUp = (dialogIndex: number) => {
    if (!onPayloadChanged || dialogIndex === 0) return;

    let aux = payload.dialogues;
    var element = aux[dialogIndex];
    aux.splice(dialogIndex, 1);
    aux.splice(dialogIndex - 1, 0, element);

    onPayloadChanged({
      ...payload,
      dialogues: aux,
    });
    if (selectedDialog === dialogIndex) setSelectedDialog(selectedDialog - 1);
  }; // handleMoveDialogUp

  const handleMoveDialogDown = (dialogIndex: number) => {
    if (!onPayloadChanged || dialogIndex === payload.dialogues.length - 1)
      return;

    let aux = payload.dialogues;
    var element = aux[dialogIndex];
    aux.splice(dialogIndex, 1);
    aux.splice(dialogIndex + 1, 0, element);

    onPayloadChanged({
      ...payload,
      dialogues: aux,
    });
    if (selectedDialog === dialogIndex) setSelectedDialog(selectedDialog + 1);
  }; // handleMoveDialogDown

  const handleDialogTextChanged = (newText: string) => {
    if (!onPayloadChanged || selectedDialog === -1) return;
    onPayloadChanged({
      ...payload,
      dialogues: [
        ...payload.dialogues.slice(0, selectedDialog),
        {
          ...payload.dialogues[selectedDialog],
          text: newText,
        },
        ...payload.dialogues.slice(selectedDialog + 1),
      ],
    });
  }; // handleDialogTextChanged

  const handleDialogCharacterChanged = (characterName: string | undefined) => {
    if (!onPayloadChanged || selectedDialog === -1) return;
    onPayloadChanged({
      ...payload,
      dialogues: [
        ...payload.dialogues.slice(0, selectedDialog),
        {
          ...payload.dialogues[selectedDialog],
          characterName: characterName,
        },
        ...payload.dialogues.slice(selectedDialog + 1),
      ],
    });
  }; // handleDialogCharacterChanged

  const findCharacterImageSrc = (characterName?: string): string => {
    return (
      availableCharacters.find((character) => character.name === characterName)
        ?.imageSrc ?? ""
    );
  }; // findCharacterImageSrc

  return (
    <Root>
      <CardPanel addPadding={false} addFocusEffect={false}>
        <RowContainer>
          {/* List of dialogs this item has */}
          <DialogsContainer>
            {/* Slides of the multiple parts that are going to take place in the narrative */}
            <SlidesContainer>
              {payload.dialogues.map((dialog, slideIndex) => (
                <NarrativeItemSlide
                  onSlideSelected={() => setSelectedDialog(slideIndex)}
                  selected={slideIndex === selectedDialog}
                  title={`Dialog ${slideIndex + 1}`}
                  imageSrc={findCharacterImageSrc(dialog.characterName)}
                  onDeleteSlide={() => handleDeleteDialog(slideIndex)}
                  onSlideMoveUp={() => handleMoveDialogUp(slideIndex)}
                  onSlideMoveDown={() => handleMoveDialogDown(slideIndex)}
                />
              ))}
            </SlidesContainer>

            {/* Button that lets the user add new dialogs to the item */}
            <ButtonsContainer>
              <AddDialogButtonContainer>
                <AddDialogButton onClick={handleAddDialog}>
                  <AddDialogIcon />
                  Add Dialog
                </AddDialogButton>
              </AddDialogButtonContainer>
            </ButtonsContainer>
          </DialogsContainer>

          {/* Character option select */}
          {selectedDialog >= 0 && (
            <CardPanel addPadding={false} addFocusEffect={false}>
              <InteractionContent>
                {selectedDialog !== -1 && (
                  <>
                    {/* Selector of the character that is going to say something in this dialog */}
                    <CharacterPreviewContainer
                      src={findCharacterImageSrc(
                        payload.dialogues[selectedDialog].characterName
                      )}
                    />
                    <InteractionSettingsContainer>
                      <DropdownInputCard
                        promptText="Select a character for this dialog:"
                        required
                        alertMessage="Please select a valid character."
                        requiredAlert={
                          !payload.dialogues[selectedDialog].characterName
                        }
                        fieldPayload={{
                          options: availableCharacters.map((elem) => elem.name),
                        }}
                        response={{
                          selectedOption:
                            payload.dialogues[selectedDialog].characterName,
                        }}
                        onResponseChanged={(res) =>
                          handleDialogCharacterChanged(res.selectedOption)
                        }
                      />
                      {/* Editor to specify what the character is going to say in a specific dialog part*/}
                      <LongTextInputCard
                        promptText="Enter a text for this dialog:"
                        required
                        fieldPayload={{ placeholder: "Dialog text" }}
                        response={{
                          text: payload.dialogues[selectedDialog].text,
                        }}
                        onResponseChanged={(res) =>
                          handleDialogTextChanged(res.text)
                        }
                      />
                    </InteractionSettingsContainer>
                  </>
                )}
              </InteractionContent>
            </CardPanel>
          )}
        </RowContainer>
      </CardPanel>
    </Root>
  );
}; // EditableNarrativeItemContent

const PreviewDialoge = styled.div`
  width: 100%;
  height: 30%;
  color: black;
  text-align: center;
  font-size: 0.75rem;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 1.33;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 5px;

  display: flex;
  flex-direction: row;
  padding: 3px;
  border-radius: 0.25rem;

  background-color: ${(props) => props.theme.primaryButtonColor};
`;

const PreviewCharacterImage = styled.img`
  padding: 1px;
  background-color: white;
  height: 100%;
  display: block;
  border-radius: 0.25rem;
  margin: 0 0.25em;
`;

const PreviewCharacterTalk = styled.div`
  height: 100%;
  width: 80%;

  color: white;
  padding: 2px;
  text-align: left;
  font-size: 0.6rem;
  font-family: ${(props) => props.theme.contentFont};
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  overflow: hidden;

  padding-left: 3px;
  line-height: 1.33;
  letter-spacing: 0.2px;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.frameColor};
`;

export const NarrativeItemStageSlide = (
  props: NarrativeItemDefinition
): JSX.Element => {
  const { dialogues } = props;

  return (
    <>
      {dialogues.length > 0 && (
        <PreviewDialoge>
          <PreviewCharacterImage
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
            }
          />
          <PreviewCharacterTalk> {dialogues[0].text}</PreviewCharacterTalk>
        </PreviewDialoge>
      )}
      {dialogues.length > 1 && (
        <PreviewDialoge>
          <PreviewCharacterTalk> {dialogues[1].text}</PreviewCharacterTalk>
          <PreviewCharacterImage
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
            }
          />
        </PreviewDialoge>
      )}
      {dialogues.length > 2 && <ThreeDotsIcon></ThreeDotsIcon>}
    </>
  );
}; // narrativeItemStageSlide

export const narrativeItemFactory: AbstractActivityItemFactory<NarrativeItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableNarrativeItemContent {...editingProps} />
    ),
    defaultDefinition: {
      dialogues: [],
    },
  }; // narrativeItemFactory

export default EditableNarrativeItemContent;
