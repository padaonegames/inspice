import { useRef } from "react";
import styled from "styled-components";
import { useOutsideAlerter } from "../Utils/useOutsideAlerterer";

interface RootProps {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  width: string;
}
const Root = styled.div<RootProps>`
  position: absolute;
  ${(props) => props.left && `left: ${props.left};`}
  ${(props) => props.right && `right: ${props.right};`}
  ${(props) => props.top && `top: ${props.top};`}
  ${(props) => props.bottom && `bottom: ${props.bottom};`}
  background-color: ${(props) => props.theme.cardBackground};
  min-width: ${(props) => props.width};
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
  height: 2.35em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.875em;

  &:hover {
    background-color: ${(props) => props.theme.hoverAreaColor};
  }
`;

export interface DropdownMenuOption {
  /** How to render this option within a list. */
  displayName: string;
  /** What component to place next to the display name */
  iconComponent?: JSX.Element;
  /** callback to parent specifying that given option has been selected by the user */
  onOptionSelected?: () => void;
} // DropdownMenuOption

export interface DropdownMenuProps {
  /** list of options to render within this component */
  options: DropdownMenuOption[];
  /** callback to parent specifying that dropdown should be closed */
  onCloseDropdown?: () => void;
  /** positioning of the options */
  positioning?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  /** width of the menu. Defaults to 220px */
  width?: string;
} // DropdownMenuProps

export const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
  const {
    options,
    onCloseDropdown,
    positioning = { left: "0", top: "2.5em" },
    width = "220px",
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, () => {
    /** handle outside click by closing this dropdown */
    if (onCloseDropdown) onCloseDropdown();
  });

  return (
    <Root width={width} ref={wrapperRef} {...positioning}>
      {options.map((elem) => (
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            if (onCloseDropdown) onCloseDropdown();
            if (elem.onOptionSelected) elem.onOptionSelected();
          }}
          key={elem.displayName}
        >
          {elem.iconComponent}
          {elem.displayName}
        </DropdownMenuItem>
      ))}
    </Root>
  );
}; // DropdownMenu

export default DropdownMenu;
