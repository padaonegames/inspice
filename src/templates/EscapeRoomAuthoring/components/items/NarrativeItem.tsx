import { useState, useContext } from "react";
import {
  EditableItemProps,
  NarrativeItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";
import { EscapeRoomActivityContext } from "../../EscapeRoomContext";

import styled from "styled-components";
import { UserCircle } from "@styled-icons/boxicons-regular/UserCircle";
import { MessageRoundedAdd } from "@styled-icons/boxicons-regular/MessageRoundedAdd";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { DialogflowDimensions } from "@styled-icons/simple-icons/Dialogflow";
import { ArrowDownCircle } from "@styled-icons/bootstrap/ArrowDownCircle";
import { ArrowUpCircle } from "@styled-icons/bootstrap/ArrowUpCircle";
import { DiagonalArrowRightUpDimensions } from "@styled-icons/evaicons-solid/DiagonalArrowRightUp";

const UpArrowIcon = styled(ArrowUpCircle)`
  color: ${(props) => props.theme.textColor};
  height: 20%;

  position: absolute;
  left: 2%;
  top: 30%;
  transform: translate(0%, -50%);
  // border-radius: 100%;
  color: rgb(80, 80, 80);
  background-color: rgb(230, 230, 230);
  border-radius: 100%;
  &:hover {
    background-color: rgb(180, 180, 180);
    cursor: pointer;
  }
`;

const DownArrowIcon = styled(ArrowDownCircle)`
  color: ${(props) => props.theme.textColor};
  height: 20%;
  border-radius: 100%;

  position: absolute;
  left: 2%;
  top: 70%;
  transform: translate(0%, -50%);
  color: rgb(80, 80, 80);
  background-color: rgb(230, 230, 230);

  &:hover {
    background-color: rgb(180, 180, 180);
    cursor: pointer;
  }
`;

const DeleteIcon = styled(DeleteForever)`
  position: absolute;
  color: rgb(0, 0, 0);
  height: 20%;
  right: 5%;
  top: 10%;
  border-radius: 100%;
  background-color: #d06a6a;
  border: 2px solid #c13c3c;
  &:hover {
    transition: border background-color visibility 1s;
    cursor: pointer;
    background-color: #ce5151;
  }
`;

const UserIcon = styled(UserCircle)`
  position: absolute;
  color: rgb(0, 0, 0);
  height: 100%;
`;
const AddDialogIcon = styled(MessageRoundedAdd)`
  position: relative;
  color: rgb(0, 0, 0);
  height: 100%;
  cursor: pointer;
  border-radius: 100%;
  &:hover {
    background-color: #dbdbdb;
  }
`;

const Root = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: left;

  height: 400px;
  max-height: 500px;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  // background-color:  #dbdbdb;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
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

const Title = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  margin-bottom: 0.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: 100%;
  height: 15%;

  display: flex;
  align-items: center;
  text-align: center;

  background-color: rgba(230, 230, 230, 1);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const CharactersInteractionsList = styled.div`
  position: relative;
  margin-top: 5px;
  align-items: center;
  width: 15%;
  height: 100%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  background-color: rgba(185, 185, 185, 1);
  border-radius: 1.25rem 0 0 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: 2px solid rgba(0, 0, 0, 1);
  border-left: 2px solid rgba(0, 0, 0, 1);
  border-right: 2px solid rgba(0, 0, 0, 1);
`;

const CharactersInteractionsListTitle = styled.div`
  position: relative;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 10%;
  border-bottom: 2px solid #dadce0;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: 2px solid rgba(0, 0, 0, 1);
  border-left: 2px solid rgba(0, 0, 0, 1);
  border-right: 2px solid rgba(0, 0, 0, 1);
`;

const InteractionSlidesContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 4;
  height: 80%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  margin: 0px 0px;
  background-color: rgba(220, 220, 220, 0.5);

  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: 2px solid rgba(0, 0, 0, 1);
  border-left: 2px solid rgba(0, 0, 0, 1);
  border-right: 2px solid rgba(0, 0, 0, 1);

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

interface InteractionProps {
  selected: boolean;
}

const Interaction = styled.div<InteractionProps>`
  position: relative;
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? "#AEAEAE" : "transparent")};
`;

const InteractionSlide = styled.div`
  position: relative;
  box-sizing: border-box;
  height: max-content;
  width: 90%;
  background-color: transparent;
  user-select: none;
  margin: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  border: 2px solid rgba(0, 0, 0, 1);
  border-radius: 0.5rem;
  cursor: pointer;

  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  color: rgb(51, 51, 51);
  background-color: rgba(230, 230, 230, 0.75);
`;

const InteractionSlideTitle = styled.div`
  position: relative;
  height: 30%;
  width: 100%;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: rgba(100, 100, 100, 0.75);
`;

const InteractionSlidePreview = styled.img`
  // width: 50px;
  height: 50px;
  display: block;
`;

const InteractionContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 85%;
  height: 100%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  // background-color:  #dbdbdb;
  background-color: rgba(200, 200, 200, 1);
  border-radius: 0 1.25rem 1.25rem 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: 2px solid rgba(0, 0, 0, 1);
  border-left: 2px solid rgba(0, 0, 0, 1);
  border-right: 2px solid rgba(0, 0, 0, 1);
`;

const CharacterInteractionContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  // background-color:  #dbdbdb;
  background-color: rgba(100, 100, 100, 1);
  border-radius: 0 1.25rem 1.25rem 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: 2px solid rgba(0, 0, 0, 1);
  border-left: 2px solid rgba(0, 0, 0, 1);
  border-right: 2px solid rgba(0, 0, 0, 1);
`;

const CharacterSelectorContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  border-bottom: 2px solid #dadce0;
  padding: 0.75em;
  // background-color:  #dbdbdb;
  background-color: rgba(250, 250, 250, 1);
  border-radius: 1.25rem 0 0 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: 2px solid rgba(0, 0, 0, 1);
  border-left: 2px solid rgba(0, 0, 0, 1);
  border-right: 2px solid rgba(0, 0, 0, 1);
`;

const CharacterPreview = styled.img`
  width: 100%;
  display: block;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 2.5em;
  background-color: ${(props) => props.theme.cardBackground};
  min-width: 160px;
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

const SelectFieldTypeDropdownButton = styled.span`
  position: absolute;
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

  position: relative;

  height: 2.5em;
  width: 80%;

  background-color: rgb(250, 250, 250);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.1rem 0px;
  border: 1px solid #dadce0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.85em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
  }
`;

const AddNewInteractionButton = styled.div`
  display: flex;
  justify-content: center;
  height: 10%;
  background-color: rgba(250, 250, 250, 1);

  border-bottom: 2px solid rgba(0, 0, 0, 1);
  border-top: 2px solid rgba(0, 0, 0, 1);
  border-left: 2px solid rgba(0, 0, 0, 1);
  border-right: 2px solid rgba(0, 0, 0, 1);
`;

export const EditableNarrativeItemContent = (
  props: EditableItemProps<NarrativeItemDefinition>
): JSX.Element => {
  //State to control wheter to open the drop down menu or not
  const [stageTypeDropdownOpen, setStageTypeDropdownOpen] =
    useState<boolean>(false);
  const [selectedDialogue, setSelectedDialogue] = useState<number>(-1);

  const { availableCharacters } = useContext(EscapeRoomActivityContext);

  const { payload, onPayloadChanged } = props;

  const [slideOptionsIndex, setSlideOptionsIndex] = useState<number>(-1);

  const handleAddDialogue = () => {
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
  }; // handleAddDialogue

  const handleDeleteDialogue = (dialogIndex: number) => {
    if (!onPayloadChanged) return;

    let result = selectedDialogue;
    if (
      dialogIndex < selectedDialogue ||
      selectedDialogue === payload.dialogues.length - 1
    )
      result = result - 1;
    setSelectedDialogue(result);
    onPayloadChanged({
      ...payload,
      dialogues: [
        ...payload.dialogues.slice(0, dialogIndex),
        ...payload.dialogues.slice(dialogIndex + 1),
      ],
    });
  }; // handleAddDialogue

  const handleMoveDialogueUp = (dialogIndex: number) => {
    if (!onPayloadChanged || dialogIndex === 0) return;

    let aux = payload.dialogues;
    var element = aux[dialogIndex];
    aux.splice(dialogIndex, 1);
    aux.splice(dialogIndex - 1, 0, element);

    onPayloadChanged({
      ...payload,
      dialogues: aux,
    });
    if (selectedDialogue === dialogIndex)
      setSelectedDialogue(selectedDialogue - 1);
  }; // handleMoveDialogueUp

  const handleMoveDialogueDown = (dialogIndex: number) => {
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
    if (selectedDialogue === dialogIndex)
      setSelectedDialogue(selectedDialogue + 1);
  }; // handleMoveDialogueDown

  const handleDialogueTextChanged = (newText: string) => {
    if (!onPayloadChanged || selectedDialogue === -1) return;
    onPayloadChanged({
      ...payload,
      dialogues: [
        ...payload.dialogues.slice(0, selectedDialogue),
        {
          ...payload.dialogues[selectedDialogue],
          text: newText,
        },
        ...payload.dialogues.slice(selectedDialogue + 1),
      ],
    });
  }; // handleDialogueTextChanged

  const handleDialogueCharacterChanged = (characterName: string) => {
    if (!onPayloadChanged || selectedDialogue === -1) return;
    onPayloadChanged({
      ...payload,
      dialogues: [
        ...payload.dialogues.slice(0, selectedDialogue),
        {
          ...payload.dialogues[selectedDialogue],
          characterName: characterName,
        },
        ...payload.dialogues.slice(selectedDialogue + 1),
      ],
    });
  }; // handleDialogueCharacterChanged

  const findCharacterImageSrc = (characterName?: string): string => {
    // The image of the character involved in this dialog is returned, if no character has been assigned or it has been deleted, a sample image is displayed
    const defaultSrc =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png";
    return (
      availableCharacters.find((character) => character.name === characterName)
        ?.imageSrc ?? defaultSrc
    );
  }; // findCharacterImageSrc

  return (
    <Root>
      {/* List of dialogs this item has */}
      <CharactersInteractionsList>
        <CharactersInteractionsListTitle>
          Dialogues
        </CharactersInteractionsListTitle>

        {/* Slides of the multiple parts that are going to take place in the narrative */}
        <InteractionSlidesContainer>
          {payload.dialogues.map((dialogue, slideIndex) => (
            <Interaction
              selected={slideIndex === selectedDialogue}
              onMouseEnter={() => setSlideOptionsIndex(slideIndex)}
              onMouseLeave={() => setSlideOptionsIndex(-1)}
            >
              <InteractionSlide
                onMouseDown={() => setSelectedDialogue(slideIndex)}
              >
                <InteractionSlideTitle>
                  <p> {`Dialogue ${slideIndex + 1}`}</p>
                </InteractionSlideTitle>
                {/* {escapeRoomData.characters[escapeRoomData.characters.findIndex(object => {return object.name === payload.characters[dialogSelected];})].image} */}
                <InteractionSlidePreview
                  src={findCharacterImageSrc(dialogue.characterName)}
                />
              </InteractionSlide>
              {slideOptionsIndex === slideIndex && (
                <>
                  <DeleteIcon
                    onMouseDown={() => {
                      handleDeleteDialogue(slideIndex);
                    }}
                  />
                  {slideIndex > 0 && (
                    <UpArrowIcon
                      onMouseDown={() => {
                        handleMoveDialogueUp(slideIndex);
                      }}
                    />
                  )}
                  {slideIndex < payload.dialogues.length - 1 && (
                    <DownArrowIcon
                      onMouseDown={() => {
                        handleMoveDialogueDown(slideIndex);
                      }}
                    />
                  )}
                </>
              )}
            </Interaction>
          ))}
        </InteractionSlidesContainer>

        {/* Button that lets the user add new dialogs to the item */}
        <AddNewInteractionButton>
          <AddDialogIcon onClick={handleAddDialogue} />
        </AddNewInteractionButton>
      </CharactersInteractionsList>

      {/* Character option select */}
      {selectedDialogue !== -1 && (
        <InteractionContent>
          {/* Selector of the character that is going to say something in this dialog */}
          <CharacterSelectorContent>
            <CharacterPreview
              src={findCharacterImageSrc(
                payload.dialogues[selectedDialogue].characterName
              )}
            />
            {/* Drop down menu with the multiple characters that can participate in the narrative */}
            <SelectFieldTypeDropdownButton
              onClick={() => setStageTypeDropdownOpen((prev) => !prev)}
            >
              {payload.dialogues[selectedDialogue].characterName
                ? payload.dialogues[selectedDialogue].characterName
                : "Select a character"}
              <UserIcon />
              {stageTypeDropdownOpen && (
                <DropdownMenu>
                  {availableCharacters.map((elem, _) => (
                    <DropdownMenuItem
                      key={elem.name}
                      onClick={() => handleDialogueCharacterChanged(elem.name)}
                    >
                      {elem.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenu>
              )}
            </SelectFieldTypeDropdownButton>
          </CharacterSelectorContent>

          {/* Editor to specify what the character is going to say in a specific dialog part*/}
          <CharacterInteractionContent>
            <Title>
              {payload.dialogues[selectedDialogue].characterName
                ? `What is ${payload.dialogues[selectedDialogue].characterName} going to say?`
                : "Who is going to say something?"}
            </Title>
            <PromptField
              promptText={payload.dialogues[selectedDialogue].text}
              promptPlaceholder="Dialogue text"
              onPromptChange={handleDialogueTextChanged}
              textAlignment="left"
              initialHeight="15em"
            />
          </CharacterInteractionContent>
        </InteractionContent>
      )}
    </Root>
  );
}; // EditableNarrativeItemContent

const PreviewAnswers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;

const PreviewAnswer = styled.div`
  position: relative;
  width: calc(100% - 0.125rem);
  height: 7px;
  margin-bottom: 3px;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 0.125rem;
`;

export const NarrativeItemStageSlide = (
  props: NarrativeItemDefinition
): JSX.Element => {
  const { dialogues } = props;

  return (
    <>
      {/* <PreviewTitle>{prompt}</PreviewTitle> */}
      <PreviewAnswers>
        {[...Array(dialogues.length)].map((_, i) => (
          <PreviewAnswer key={i} />
        ))}
      </PreviewAnswers>
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
