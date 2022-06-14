import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EditablePuzzleProps, EscapeRoomPuzzleDefinition } from "../../../services/escapeRoomActivity.model";
import { PromptField } from "./PromptField";
import { PuzzleSettingsContainer } from "./PuzzleSettingsContainer";

const ContentWrapper = styled.main`
  position: fixed;
  height: 100%;
  width: 97.5%;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
`;

const ContentBackground = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgb(242, 242, 241) none repeat scroll 0% 0%;
  flex: 1 1 calc(100% + clamp(-96px, -4vmin, -32px));
  padding: 48px clamp(16px, 2vmin, 48px);
  height: 100%;
  margin-left: 12rem;
`;

export interface EditablePuzzleComponentProps {
  /** Placeholder for this puzzle's prompt text */
  promptTextPlaceholder?: string;
  /** What type of question/ puzzle this card is representing (type must be consistent with puzzleMappings' name values) */
  initialPuzzleDefinition?: EscapeRoomPuzzleDefinition;
  /** What  mappings we are working with in this editiable puzzle card (available puzzle types and how to render them) */
  puzzleMappings: PuzzleMapping[];
  /** Callback notifying of puzzle type changing to a new format */
  onPuzzleTypeChanged?: (value: string) => void;
  /** Callback notifying parent of puzzle changing (including data payload) */
  onPuzzleDefinitionChanged?: (value: EscapeRoomPuzzleDefinition['payload']) => void;
  /** Callback notifying parent component of user wanting to delete this card */
  onCardDeleted?: () => void;
  /** Callback notifying parent component of card getting the focus */
  onCardFocused?: () => void;
}

export interface PuzzleMapping {
  /** What type of puzzle we are working with here*/
  puzzleType: EscapeRoomPuzzleDefinition['type'];
  /** How to render this option within a list. Defaults to puzzleType */
  displayName?: string;
  /** What component to place next to the display name */
  iconComponent?: JSX.Element;
  /** Generation logic to use to create a form editing component */
  editingComponentProducer: (editingFormProps: EditablePuzzleProps<EscapeRoomPuzzleDefinition['payload']>) => JSX.Element;
  /** Default value for PuzzlePayload */
  defaultPuzzlePayload: EscapeRoomPuzzleDefinition['payload'];
}

/**
 * Editable version of StepTitleCard for form editing
 */
export const EditablePuzzleComponent = (props: EditablePuzzleComponentProps): JSX.Element => {

  const {
    promptTextPlaceholder = 'Prompt',
    initialPuzzleDefinition,
    puzzleMappings,
    onPuzzleTypeChanged,
    onPuzzleDefinitionChanged,
    onCardDeleted,
    onCardFocused
  } = props;

  // managed state for puzzle definition
  const [puzzleDefinition, setPuzzleDefinition] = useState<EscapeRoomPuzzleDefinition>(initialPuzzleDefinition ?? {
    promptText: '',
    type: puzzleMappings[0].puzzleType,
    payload: puzzleMappings[0].defaultPuzzlePayload
  });

  // whether the puzzle type dropdown is currently open
  const [puzzleTypeDropdownOpen, setPuzzleTypeDropdownOpen] = useState<boolean>(false);
  // reference to the actual DOM element for the prompt area to allow for dynamic resizing
  const promptAreaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * useEffect hook to maintain a consistent height for the
   * HTMLTextAreaElement used to display the promptText.
   * Essentialy, this listens for changes in promptText and
   * modifies container's height dynamically to fit the entire text 
   * without having to scroll.
   */
  useEffect(() => {
    if (promptAreaRef.current == null) return;

    promptAreaRef.current.style.height = '0px';
    const scrollHeight = promptAreaRef.current.scrollHeight;
    promptAreaRef.current.style.height = scrollHeight + 'px';
  }, [puzzleDefinition.promptText]); // useEffect

  /**
   * Manage the selection of a new puzzle type from the dropdown
   * and notify parent component about the change, assuming that
   * a fitting onPuzzleTypeChanged callback has been provided.
   * @param value New puzzle type selected by the user.
   */
  const handlePuzzleTypeSelected = (value: EscapeRoomPuzzleDefinition['type']) => {
    // create a new puzzle definition that's consistent with both new type and previous information
    const newPuzzleDefinition: EscapeRoomPuzzleDefinition = {
      ...puzzleDefinition,
      type: value,
      payload: puzzleMappings.find(elem => elem.puzzleType === value)?.defaultPuzzlePayload
    };
    // update inner state
    setPuzzleDefinition(newPuzzleDefinition);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onPuzzleTypeChanged) {
      onPuzzleTypeChanged(value);
    }
    if (onPuzzleDefinitionChanged) {
      onPuzzleDefinitionChanged(newPuzzleDefinition);
    }
  }; // handlePuzzleTypeSelected

  /**
   * Manage any change from child puzzleForm components over their
   * own puzzle payloads to keep the results consistent with general
   * editing card and notify parent component about the change, assuming that
   * a fitting onPuzzleDefinitionChanged callback has been provided.
   * @param payload New puzzle definition payload after a change within the currently active child form.
   */
  const handlePuzzlePayloadChanged = (payload: EscapeRoomPuzzleDefinition['payload']) => {
    // create a new puzzle definition that's consistent with both new type and previous information
    const newPuzzleDefinition: EscapeRoomPuzzleDefinition = {
      ...puzzleDefinition,
      payload: payload
    };
    // update inner state
    setPuzzleDefinition(newPuzzleDefinition);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onPuzzleDefinitionChanged) {
      onPuzzleDefinitionChanged(newPuzzleDefinition);
    }
  }; // handlePuzzlePayloadChanged

  /**
   * Manage a change in the prompt text for this puzzle
   * @param value New prompt text
   */
  const handlePromptTextChanged = (value: string) => {
    // create a new puzzle definition with the new required status
    const newPuzzleDefinition: EscapeRoomPuzzleDefinition = {
      ...puzzleDefinition,
      promptText: value
    };
    // update inner state
    setPuzzleDefinition(newPuzzleDefinition);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onPuzzleDefinitionChanged) {
      onPuzzleDefinitionChanged(newPuzzleDefinition);
    }
  }; // handlePromptTextChanged

  const selectedPuzzle = puzzleMappings.find(elem => elem.puzzleType === puzzleDefinition.type);

  return (
    <ContentWrapper>
      <Content>
        <ContentBackground>
          <PromptField
            promptText={puzzleDefinition['promptText'] as string}
            promptPlaceholder='Start typing your prompt'
            onPromptChange={handlePromptTextChanged}
          />
          {selectedPuzzle && puzzleDefinition.payload && (
            selectedPuzzle.editingComponentProducer({
              puzzlePayload: puzzleDefinition.payload,
              onPayloadChanged: handlePuzzlePayloadChanged
            })
          )}
        </ContentBackground>
        <PuzzleSettingsContainer
          puzzleMappings={puzzleMappings}
          selectedPuzzleMapping={selectedPuzzle}
          onPuzzleTypeChanged={() => {}}
        />
      </Content>
    </ContentWrapper>
  );
}; // EditablePuzzleComponent

export default EditablePuzzleComponent;