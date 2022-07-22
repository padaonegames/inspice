import styled from "styled-components";
import { Question } from "@styled-icons/evil/Question";
import { Password } from "@styled-icons/fluentui-system-regular/Password";
import EditableCheckBoxInput from "../EditableCheckBoxInput";

const HintsIcon = styled(Question)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

const ExitCodeIcon = styled(Password)`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: auto;
  margin-right: 0.5em;
`;

const HintsTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;

  margin-top: 0.25em;
  margin-bottom: 0.25em;
  margin-left: 1rem;
  border-top: none;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;

  border-bottom: 2px solid white;
  display: flex;
  align-items: center;
`;

const SettingsContainer = styled.div`
  width: 90%;
  align-self: center;
  margin-top: 5px;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: left;

  overflow: hidden;
  border: 3px solid rgb(19, 104, 206);
  border-radius: 0.5rem;
`;

const SettingsTitle = styled.div`
  width: 100%;
  font-size: 2em;
  font-weight: 100;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  text-align: center;
  color: rgb(255, 255, 255);
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;

  border-bottom: 2px solid #dadce0;
  background-color: rgb(19, 104, 206);
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const SettingsContent = styled.div`
  width: 100%;
  padding: 10px;
`;

interface CheckBoxOptionProps {
  backgroundColor?: string;
}
const CheckboxOption = styled.div<CheckBoxOptionProps>`
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 0 0.75em 0.75em;
  border-top: none;
  font-size: 1em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  color: white;
  line-height: 135%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;

  background-color: ${(props) => props.backgroundColor || "transparent"};

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

export interface RoomSettingsEditorProps {
  /** list of hints that will be shown to the user while playing the current room */
  hints: string[];
  /** callback to parent component notifying of a change in the list of hints (this includes adding, removing or editing a hint) */
  onHintsChanged?: (hints: string[]) => void;
}

export const RoomSettingsEditor = (
  props: RoomSettingsEditorProps
): JSX.Element => {
  const { hints, onHintsChanged } = props;

  const availableColors = [
    "#e21b3c",
    "#1368ce",
    "#d89e00",
    "#26890c",
    "#0aa3a3",
    "#864cbf",
  ];

  const handleAddHint = () => {
    if (!onHintsChanged) return;
    onHintsChanged([...hints, ""]);
  }; // handleAddHint

  const handleEditHint = (index: number, value: string) => {
    if (!onHintsChanged) return;
    onHintsChanged([
      ...hints.slice(0, index),
      value,
      ...hints.slice(index + 1),
    ]);
  }; // handleEditHint

  const handleRemoveHint = (index: number) => {
    if (!onHintsChanged) return;
    onHintsChanged(hints.filter((_, i) => i !== index));
  }; // handleRemoveHint

  return (
    <SettingsContainer>
      <SettingsTitle>Room Settings</SettingsTitle>
      <SettingsContent>
        <HintsTitle>
          Hints
          <HintsIcon />
        </HintsTitle>
        {hints.map((elem, i) => (
          <CheckboxOption
            backgroundColor={availableColors[i % availableColors.length]}
            key={`checkBoxOption${i}`}
          >
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              labelTextPlaceholder="Write a hint..."
              style="radio"
              boxSize="0"
              onObjectRemoved={() => handleRemoveHint(i)}
              onLabelTextChanged={(value) => handleEditHint(i, value)}
            />
          </CheckboxOption>
        ))}
        {hints.length < 6 && (
          <CheckboxOption
            onClick={handleAddHint}
            key="checkBoxOptionAddNew"
            backgroundColor="darkgray"
          >
            <EditableCheckBoxInput
              key="editableCheckBoxInputAddNew"
              labelText=""
              labelTextPlaceholder={"New Hint"}
              style="radio"
              boxSize="0"
              enabled={false}
            />
          </CheckboxOption>
        )}
      </SettingsContent>
    </SettingsContainer>
  );
}; // RoomSettingsEditor
