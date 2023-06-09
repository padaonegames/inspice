import React from "react";
import styled from "styled-components";

interface RootProps {
  color: string;
}
const Root = styled.div<RootProps>`
  padding: 20px;
  background-color: ${(props) => props.color}; /* Red #f44336; */
  color: white;
  margin-bottom: 15px;
`;

const CloseBtn = styled.span`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: black;
  }
`;

export interface AlertProps {
  /** Callback to manage the action after closing the alert. */
  onClose?: () => void;
  /** Defines the color of the alert (e.g. “blue”). */
  color?: string;
  children?: React.ReactNode;
}

export const Alert = ({
  onClose = () => {},
  color = "#2eb885",
  children,
}: AlertProps): JSX.Element => {
  return (
    <Root color={color}>
      <CloseBtn onClick={onClose}>&times;</CloseBtn>
      {children}
    </Root>
  );
};

export default Alert;
