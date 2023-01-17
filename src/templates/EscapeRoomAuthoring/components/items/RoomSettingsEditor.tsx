import styled from "styled-components";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import TextListCard from "../../../../components/Forms/Cards/TextListCard";
import CheckBoxGroupInputCard from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  margin-bottom: 4.5vh;
  justify-content: center;
  align-items: center;
`;

export interface RoomSettingsEditorProps {
  /** list of hints that will be shown to the user while playing the current room */
  hints: string[];
  /** callback to parent component notifying of a change in the list of hints (this includes adding, removing or editing a hint) */
  onHintsChanged?: (hints: string[]) => void;
  /** whether exit block should be locked until all other blocks have been completed */
  lockExitBlockUntilMainBlocksCompleted: boolean;
  onLockExitBlockUntilMainBlocksCompletedChanged?: (value: boolean) => void;
} // RoomSettingsEditorProps

export const RoomSettingsEditor = (
  props: RoomSettingsEditorProps
): JSX.Element => {
  const {
    hints,
    onHintsChanged,
    lockExitBlockUntilMainBlocksCompleted,
    onLockExitBlockUntilMainBlocksCompletedChanged,
  } = props;

  const handleHintsChanged = (newHints: string[]) => {
    if (!onHintsChanged) return;
    onHintsChanged(newHints);
  }; // handleHintsChanged

  const handleLockExitBlockUntilMainBlocksCompletedChanged = (
    newValue: boolean
  ) => {
    if (!onLockExitBlockUntilMainBlocksCompletedChanged) return;
    onLockExitBlockUntilMainBlocksCompletedChanged(newValue);
  }; // handlelockExitBlockUntilMainBlocksCompletedChanged

  const exitBlockLockedUntilMainBlocksCompletedKey =
    "Lock exit block until all other blocks are completed.";

  return (
    <Wrapper>
      <StepTitleCard
        stepTitle="Room Configuration"
        stepDescription={`Welcome to the room configuration tool!
        Each room within your adventure is made up of "blocks", sequences of puzzles that the players will have to go through in order to escape it. You may add up to 4 puzzle blocks to your room. Manage your blocks using the block browser above.
        There is an additional block called the "exit block which, upon being completed, will allow the player to move on to the next stage in the adventure. Make sure they won't be able to finish it before playing the other blocks!
        `}
      />
      <TextListCard
        promptText="Hints"
        fieldPayload={{}}
        response={{ texts: hints }}
        onResponseChanged={(value) => handleHintsChanged(value.texts)}
      />
      <CheckBoxGroupInputCard
        promptText="Additional settings:"
        fieldPayload={{ fields: [exitBlockLockedUntilMainBlocksCompletedKey] }}
        response={{
          selectedFields: lockExitBlockUntilMainBlocksCompleted
            ? [exitBlockLockedUntilMainBlocksCompletedKey]
            : [],
        }}
        onResponseChanged={(value) =>
          handleLockExitBlockUntilMainBlocksCompletedChanged(
            value.selectedFields.includes(
              exitBlockLockedUntilMainBlocksCompletedKey
            )
          )
        }
      />
    </Wrapper>
  );
}; // RoomSettingsEditor
