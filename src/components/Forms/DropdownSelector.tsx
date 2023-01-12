import { useState } from "react";
import styled, { css } from "styled-components";
import DropdownMenu, { DropdownMenuOption } from "./DropdownMenu";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";

const OpenDropdownButton = styled.span`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

  position: relative;

  height: 2.5em;
  width: fit-content;

  background-color: transparent;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.1rem 0px;
  border: 1px solid #dadce0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.85em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
  }
`;

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

interface DropdownSelectorProps {
  /** whether this component should be disabled */
  disabled?: boolean;
  /** options to choose from, optionally including actions and icons */
  options: DropdownMenuOption[];
  /** currently selected option */
  selectedOption: string;
  /** width for this selector's dropdown menu. */
  width?: string;
}

export const DropdownSelector = (props: DropdownSelectorProps): JSX.Element => {
  const { disabled = false, options, selectedOption, width } = props;

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleToggleDropdown = () => {
    if (disabled) return;
    setDropdownOpen((prev) => !prev);
  }; // handleToggleDropdown

  return (
    <OpenDropdownButton onClick={handleToggleDropdown}>
      {selectedOption}
      <ExpandDropdownIcon />
      {dropdownOpen && !disabled && (
        <DropdownMenu
          width={width}
          options={options}
          onCloseDropdown={() => setDropdownOpen(false)}
        />
      )}
    </OpenDropdownButton>
  );
}; // DropdownSelector
