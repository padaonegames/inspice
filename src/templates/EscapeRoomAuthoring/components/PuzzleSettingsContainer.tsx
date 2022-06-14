import { useState } from "react";
import styled, { css } from "styled-components";
import { PuzzleMapping } from "./EditablePuzzle";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ExtensionPuzzle } from "@styled-icons/ionicons-outline/ExtensionPuzzle";

const Root = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 0 18rem;
  width: 18rem;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) -2px 0px 4px 0px;
  background-color: rgb(255, 255, 255);
  margin-right: 0rem;
  padding: 1em;
  padding-top: 3em;
`;

const HorizontalLine = styled.div`
  width: 95%;
  height: 0.5em;
  border-style: solid;
  border-color: lightgray;
  border-width: 1px 0px 0px 0px;
  margin: 1em auto;
`;

const FieldLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;

  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
`;

const fieldIconStyle = css`
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  margin-right: 7px;
`;

const PuzzleIcon = styled(ExtensionPuzzle)`
  ${fieldIconStyle}
`;

/**
 * Recommended styles for an icon being passed to EditablePuzzle
 * component within a list of puzzle Mapping specifications for optimal 
 * rendering.
 */
export const puzzleTypeIcon = css`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const ExpandDropdownIcon = styled(ChevronDown)`
  ${puzzleTypeIcon}
  margin-left: auto;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 2.5em;
  background-color: ${props => props.theme.cardBackground};
  min-width: 160px;
  width: 100%;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${props => props.theme.textColor};
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
  font-family: ${props => props.theme.contentFont};

  &:hover {
    background-color: #eeeeee;
  }
`;

const SelectFieldTypeDropdownButton = styled.span`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
  cursor: pointer;
  color: ${props => props.theme.textColor};

  position: relative;

  height: 2.5em;
  width: 100%;

  background-color: transparent;
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

const ButtonsContainer = styled.div`
  padding: 1rem 0px 2.5rem 0;
  width: 85%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  -moz-box-pack: center;
  justify-content: space-evenly;
  -moz-box-align: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 7.5%;
`;

const DeleteButton = styled.button`
  line-height: 1.875rem;

  width: initial;
  border: 0px none;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  color: rgb(51, 51, 51);
  border-radius: 0.25rem;

  background-color: transparent;
  &:hover {
    background-color: #f2f2f1;
  }

  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};

  text-align: center;
  text-decoration: none;
  min-width: 32px;
  min-height: 32px;
  height: 32px;
  padding: 0px 16px 4px;
  line-height: 32px;
  position: relative;
`;

const DuplicateButton = styled.button`
  margin-left: 1.375rem;
  border: 1px rgb(115, 115, 115) solid;
  border-radius: 0.25rem;

  width: auto;
  margin: 0px;
  margin-left: 0px;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  color: rgb(51, 51, 51);

  background-color: white;
  &:hover {
    background-color: #f2f2f1;
  }

  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};

  text-align: center;
  text-decoration: none;
  min-width: 32px;
  min-height: 32px;
  height: 32px;
  padding: 0px 16px 4px;
  line-height: 32px;
  position: relative;
`;

export interface PuzzleSettingsContainerProps {
  /** What  mappings we are working with in this editiable puzzle container (available puzzle types and how to render them) */
  puzzleMappings: PuzzleMapping[];
  /** What mapping we are currently using */
  selectedPuzzleMapping?: PuzzleMapping;
  /** Callback notifying of puzzle type changing to a new format */
  onPuzzleTypeChanged?: (value: string) => void;
} // PuzzleSettingsContainerProps

export const PuzzleSettingsContainer = (props: PuzzleSettingsContainerProps): JSX.Element => {

  const {
    puzzleMappings,
    selectedPuzzleMapping,
    onPuzzleTypeChanged
  } = props;

  const [puzzleTypeDropdownOpen, setPuzzleTypeDropdownOpen] = useState<boolean>(false);

  const handlePuzzleTypeChanged = (value: string) => {
    if (onPuzzleTypeChanged) {
      onPuzzleTypeChanged(value);
    }
  }; // handlePuzzleTypeChanged

  return (
    <Root>
      <FieldLabel>
        <PuzzleIcon />
        Puzzle Type
        <SelectFieldTypeDropdownButton onClick={() => setPuzzleTypeDropdownOpen(prev => !prev)}>
          {selectedPuzzleMapping?.iconComponent}{selectedPuzzleMapping?.displayName ?? selectedPuzzleMapping?.puzzleType ?? 'Select a puzzle type'} <ExpandDropdownIcon />
          {puzzleTypeDropdownOpen &&
            <DropdownMenu>
              {puzzleMappings.map(elem => (
                <DropdownMenuItem onClick={() => handlePuzzleTypeChanged(elem.puzzleType)}>
                  {elem.iconComponent}
                  {elem.displayName ?? elem.puzzleType}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>}
        </SelectFieldTypeDropdownButton>
      </FieldLabel>
      <HorizontalLine />
      <ButtonsContainer>
        <DeleteButton>Delete</DeleteButton>
        <DuplicateButton>Duplicate</DuplicateButton>
      </ButtonsContainer>
    </Root>
  );
}; // PuzzleSettingsContainer