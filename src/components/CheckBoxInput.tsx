import React, { useState } from 'react';
import styled from 'styled-components';

/* The container */
const Container = styled.div`
  width: fit-content;
  height: 25px;
  position: relative;
  padding-left: 35px;
  cursor: pointer;

  font-size: 1em;
  font-weight: 520;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: black;

  display: flex;
  align-items: center;
`;

/* Create a custom checkbox */
interface CheckMarkProps {
  checked: boolean;
};

const CheckMark = styled.span<CheckMarkProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: ${props => props.checked ? '#4a90e2' : '#eee'};

  &:hover {
    background-color: ${props => props.checked ? '#4a90e2' : '#ccc'};
  }

  ${props => props.checked && `
  &::after {
    content: "";
    position: absolute;
    display: block;

    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  `}
`;


interface CheckBoxInputProps {
  initialChecked?: boolean;
  labelText: string;
  onCheckedChange: (checked: boolean) => void;
};

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({
  initialChecked = false,
  labelText,
  onCheckedChange,
}) => {

  const [checked, setChecked] = useState<boolean>(initialChecked !== undefined ? initialChecked : false);

  const toggleCheckbox = () => {
    onCheckedChange(!checked);
    setChecked(prev => !prev);
  };

  return (
    <Container onClick={toggleCheckbox}>
      {labelText}
      <CheckMark
        checked={checked}
      />
    </Container>
  );
}

export default CheckBoxInput;