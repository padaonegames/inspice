import styled from "styled-components";
import { Question } from "@styled-icons/evil/Question";
import { Password } from "@styled-icons/fluentui-system-regular/Password";
import EditableCheckBoxInput from "../EditableCheckBoxInput";

const HintsIcon = styled(Question)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.5em;
`;

const ExitCodeIcon = styled(Password)`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: auto;
  margin-right: 0.5em;
`;

const CheckboxTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;

  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 1.25em;
  border-top: none;
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: center;

  display: flex;
  align-items: center;

  background-color: white;

  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

const CheckboxList = styled.div`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: left;

  border-bottom: 2px solid #dadce0;
  padding: 0.75em;

  background-color:  #dbdbdb;

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
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
  font-family: ${props => props.theme.contentFont};
  color: white;
  line-height: 135%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;

  background-color: ${props => props.backgroundColor || 'transparent'};

  border-radius: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;
`;

export interface RoomSettingsEditorProps {
  /** Code that the user will need to enter in order to exit the room */
  exitCode: string;
  /** callback to parent component notifying of a change in the exitCode */
  onExitCodeChanged?: (value: string) => void;
  /** list of hints that will be shown to the user while playing the current room */
  hints: string[];
  /** callback to parent component notifying of a change in the list of hints (this includes adding, removing or editing a hint) */
  onHintsChanged?: (hints: string[]) => void;
}

export const RoomSettingsEditor = (props: RoomSettingsEditorProps): JSX.Element => {

  const {
    exitCode,
    onExitCodeChanged,
    hints,
    onHintsChanged
  } = props;

  const availableColors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c', '#0aa3a3', '#864cbf'];

  const handleAddHint = () => {
    if (!onHintsChanged) return;
    onHintsChanged([...hints, '']);
  }; // handleAddHint

  const handleEditHint = (index: number, value: string) => {
    if (!onHintsChanged) return;
    onHintsChanged([
      ...hints.slice(0, index),
      value,
      ...hints.slice(index + 1)
    ]);
  }; // handleEditHint

  const handleRemoveHint = (index: number) => {
    if (!onHintsChanged) return;
    onHintsChanged(hints.filter((_, i) => i !== index));
  }; // handleRemoveHint

  return (
    <>
      <CheckboxList>
        <CheckboxTitle>
          <ExitCodeIcon />
          Exit Code
        </CheckboxTitle>
        <CheckboxOption
          backgroundColor={availableColors[0]}
        >
          <EditableCheckBoxInput
            labelText={exitCode}
            labelTextPlaceholder='Input exit code...'
            style='radio'
            boxSize='0'
            onLabelTextChanged={onExitCodeChanged}
          />
        </CheckboxOption>
      </CheckboxList>
      <CheckboxList>
        <CheckboxTitle>
          <HintsIcon />
          Hints
        </CheckboxTitle>
        {hints.map((elem, i) => (
          <CheckboxOption
            backgroundColor={availableColors[i % availableColors.length]}
            key={`checkBoxOption${i}`}
          >
            <EditableCheckBoxInput
              key={`editableCheckBoxInput${i}`}
              labelText={elem}
              labelTextPlaceholder='Write a hint...'
              style='radio'
              boxSize='0'
              onObjectRemoved={() => handleRemoveHint(i)}
              onLabelTextChanged={(value) => handleEditHint(i, value)}
            />
          </CheckboxOption>
        ))}
        {hints.length < 6 && (
          <CheckboxOption
            onClick={handleAddHint}
            key='checkBoxOptionAddNew'
            backgroundColor='darkgray'
          >
            <EditableCheckBoxInput
              key='editableCheckBoxInputAddNew'
              labelText=''
              labelTextPlaceholder={'New Hint'}
              style='radio'
              boxSize='0'
              enabled={false}
            />
          </CheckboxOption>
        )}
      </CheckboxList>
    </>
  );
}; // RoomSettingsEditor