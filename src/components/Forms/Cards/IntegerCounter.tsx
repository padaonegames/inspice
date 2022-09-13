import styled, { css } from "styled-components";

import { PlusSquareFill } from "@styled-icons/bootstrap/PlusSquareFill";
import { DashSquareFill } from "@styled-icons/bootstrap/DashSquareFill";
import React from "react";

const CounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
`;

interface ButtonProps {
  availiable: boolean;
}

const IncreaseUsersIcon = styled(PlusSquareFill)<ButtonProps>`
  ${fieldTypeIcon}
  color: rgb(80, 80, 80);
  opacity: ${(props) => (props.availiable ? "1" : "0.3")};
  &:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;

const DecreaseUsersIcon = styled(DashSquareFill)<ButtonProps>`
  ${fieldTypeIcon}
  color: rgb(80, 80, 80);
  opacity: ${(props) => (props.availiable ? "1" : "0.3")};
  &:hover {
    background-color: rgb(200, 200, 200);
    cursor: ${(props) => (props.availiable ? "pointer" : "default")};
  }
`;

const UsersNumberInput = styled.input`
  width: 3.75em;
  height: 2.75em;
  margin: auto 0.35em;
  border-radius: 5px;
  text-align: center;
  font-family: ${(props) => props.theme.contentFont};
  -webkit-appearance: none;
  -moz-appearance: textfield;
  background-color: rgb(230, 230, 230);
`;

export interface IntegerCounterProps {
  /** Integer value to display within this component */
  value: number | undefined;
  /** minimum integer allowed in this component for value */
  minimum: number;
  /** maximum integer allowed in this component */
  maximum: number;
  /** Callback to parent specifying that value has been changed by the user */
  onValueChanged?: (newValue: number | undefined) => void;
} // IntegerCounterProps

export const IntegerCounter = (props: IntegerCounterProps): JSX.Element => {
  const { value, minimum, maximum, onValueChanged } = props;

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChanged) {
      const stringValue = event.target.value.replace(/[^0-9]+/g, "");
      if (stringValue.length === 0) {
        // empty field
        onValueChanged(undefined);
        return;
      }

      const numericValue = parseInt(stringValue);
      if (numericValue >= minimum && numericValue <= maximum) {
        onValueChanged(numericValue);
      }
    }
  }; // handleInputChanged

  const handleIncreaseUsers = () => {
    if (value !== undefined && value < maximum && onValueChanged) {
      onValueChanged(value + 1);
    }
  }; // handleIncreaseUsers

  const handleDecreaseUsers = () => {
    if (value !== undefined && value > minimum && onValueChanged) {
      onValueChanged(value - 1);
    }
  }; // handleDecreaseUsers

  return (
    <CounterContainer>
      <DecreaseUsersIcon
        availiable={value !== undefined && value > minimum}
        onClick={handleDecreaseUsers}
      />
      <UsersNumberInput
        type="text"
        value={value ?? ""}
        onChange={handleInputChanged}
      />
      <IncreaseUsersIcon
        availiable={value !== undefined && value < maximum}
        onClick={handleIncreaseUsers}
      />
    </CounterContainer>
  );
}; // IntegerCounter
