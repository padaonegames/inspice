import { useState } from "react";
import styled, { css } from "styled-components";
import { StageMappings } from "./EditableStage";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ExtensionPuzzle } from "@styled-icons/ionicons-outline/ExtensionPuzzle";
import {
  AvailableEscapeRoomStageType,
  escapeRoomStageTypes,
  SupportedStage,
} from "../../../services/escapeRoomActivity.model";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 18rem;
  width: 18rem;
  height: calc(100% - 2rem);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) -2px 0px 4px 0px;
  background-color: ${(props) => props.theme.cardBackground};
  margin-right: 0rem;
  padding: 1em;

  transition: margin 0.6s ease-in-out 0s, transform 0.1s ease-in-out 0s;
  transform: rotateY(0deg);
`;

const HorizontalLine = styled.div`
  width: 95%;
  height: 0.5em;
  border-style: solid;
  border-color: lightgray;
  border-width: 1px 0px 0px 0px;
  margin: 1.5em auto;
`;

const FieldLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;

  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 1.5em;
`;

const fieldIconStyle = css`
  display: inline-block;
  vertical-align: middle;
  width: 1.5em;
  height: 1.5em;
  margin-right: 1em;
`;

const StageIcon = styled(ExtensionPuzzle)`
  ${fieldIconStyle}
`;

/**
 * Recommended styles for an icon being passed to EditableStage
 * component within a list of stage Mapping specifications for optimal
 * rendering.
 */
export const stageTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const ExpandDropdownIcon = styled(ChevronDown)`
  ${stageTypeIcon}
  margin-left: auto;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
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
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 1em;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

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
  padding: 1rem 0;
  width: 90%;
  height: 5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  -moz-box-pack: center;
  justify-content: space-evenly;
  -moz-box-align: center;
  align-items: center;
  align-self: center;

  margin: 0 1rem;
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
  font-family: ${(props) => props.theme.contentFont};

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
  font-family: ${(props) => props.theme.contentFont};

  text-align: center;
  text-decoration: none;
  min-width: 32px;
  min-height: 32px;
  height: 32px;
  padding: 0px 16px 4px;
  line-height: 32px;
  position: relative;
`;

const SettingsContainer = styled.div`
  height: calc(100% - 6rem);
  width: 100%;
  padding: 0.5em;
`;

export interface StageSettingsContainerProps {
  /** What  mappings we are working with in this editiable stage container (available stage types and how to render them) */
  stageMappings: StageMappings<SupportedStage>;
  /** What mapping we are currently using */
  selectedStageType: AvailableEscapeRoomStageType;
  /** Callback notifying of stage type changing to a new format */
  onStageTypeChanged?: (value: AvailableEscapeRoomStageType) => void;
  /** Callback notifying parent component of user wanting to delete this stage */
  onStageDeleted?: () => void;
  /** Callback notifying parent component of user wanting to duplicate this stage */
  onStageDuplicated?: () => void;
} // StageSettingsContainerProps

export const StageSettingsContainer = (
  props: StageSettingsContainerProps
): JSX.Element => {
  const {
    stageMappings,
    selectedStageType,
    onStageTypeChanged,
    onStageDeleted,
    onStageDuplicated,
  } = props;

  const [stageTypeDropdownOpen, setStageTypeDropdownOpen] =
    useState<boolean>(false);

  const selectedStageMapping = stageMappings[selectedStageType];

  const handleStageTypeChanged = (value: AvailableEscapeRoomStageType) => {
    if (onStageTypeChanged) {
      onStageTypeChanged(value);
    }
  }; // handleStageTypeChanged

  return (
    <Root>
      <SettingsContainer>
        <FieldLabel>
          <StageIcon />
          Stage Type
          <SelectFieldTypeDropdownButton
            onClick={() => setStageTypeDropdownOpen((prev) => !prev)}
          >
            {selectedStageMapping.iconComponent}
            {selectedStageMapping?.displayName ??
              selectedStageType ??
              "Select a stage type"}{" "}
            <ExpandDropdownIcon />
            {stageTypeDropdownOpen && (
              <DropdownMenu>
                {escapeRoomStageTypes.map((elem) => (
                  <DropdownMenuItem
                    onClick={() => handleStageTypeChanged(elem)}
                    key={elem}
                  >
                    {stageMappings[elem].iconComponent}
                    {stageMappings[elem].displayName ?? elem}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            )}
          </SelectFieldTypeDropdownButton>
        </FieldLabel>
        <HorizontalLine />
      </SettingsContainer>

      <ButtonsContainer>
        <DeleteButton onClick={onStageDeleted}>Delete</DeleteButton>
        <DuplicateButton onClick={onStageDuplicated}>Duplicate</DuplicateButton>
      </ButtonsContainer>
    </Root>
  );
}; // StageSettingsContainer
