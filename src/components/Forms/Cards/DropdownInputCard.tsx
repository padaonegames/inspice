import { useState } from "react";
import styled, { css } from "styled-components";
import {
  ConsumableFieldProps,
  DropdownFieldDefinition,
  DropdownResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import { Root } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import DropdownMenu from "../DropdownMenu";

const OpenDropdownButton = styled.span`
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

export interface DropdownInputCardProps
  extends ConsumableFieldProps<
    DropdownFieldDefinition,
    DropdownResponseDefinition
  > {
  disabled?: boolean;
} // DropdownInputCardProps

/** Controlled card component to support input for shorter texts. */
export const DropdownInputCard = (
  props: DropdownInputCardProps
): JSX.Element => {
  const {
    promptText = "",
    required = false,
    requiredAlert = false,
    alertMessage,
    fieldPayload,
    response,
    onResponseChanged,
    disabled = false,
  } = props;

  const { options } = fieldPayload;
  const { selectedOption } = response;

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleDropdownItemSelected = (elem: string) => {
    setDropdownOpen(false);
    if (!onResponseChanged) return;
    onResponseChanged({ selectedOption: elem });
  }; // handleDropdownItemSelected

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
      alertMessage={alertMessage}
    >
      <OpenDropdownButton onClick={() => setDropdownOpen((prev) => !prev)}>
        {selectedOption}
        <ExpandDropdownIcon />
        {dropdownOpen && (
          <DropdownMenu
            options={options.map((elem) => ({ displayName: elem }))}
            onOptionSelected={handleDropdownItemSelected}
            onCloseDropdown={() => setDropdownOpen(false)}
          />
        )}
      </OpenDropdownButton>
    </FormCard>
  );
}; // DropdownInputCard

export interface EditableDropdownContentProps
  extends EditableFieldProps<DropdownFieldDefinition> {} // EditableDropdownContentProps

export const EditableDropdownContent = (
  _: EditableDropdownContentProps
): JSX.Element => {
  return <Root></Root>;
}; // EditableDropdownContent

export default DropdownInputCard;
