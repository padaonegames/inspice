import { useState } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  css?: FlattenSimpleInterpolation;
}
/* The container */
const Container = styled.div<ContainerProps>`
  width: fit-content;
  height: 25px;
  position: relative;
  padding-left: 35px;
  cursor: pointer;

  font-size: 0.9em;
  font-weight: normal;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: ${props => props.theme.textColor};

  display: flex;
  align-items: center;
`;

/* Create a custom checkbox */
interface CheckMarkProps {
  checked: boolean;
  size?: string;
};

const CheckMark = styled.span<CheckMarkProps>`
  position: absolute;
  top: 50%;
  left: 0%;
  height: ${props => props.size ?? '25px'};
  width: ${props => props.size ?? '25px'};
  background-color: ${props => props.checked ? '#4a90e2' : '#eee'};

  &:hover {
    background-color: ${props => props.checked ? '#4a90e2' : '#ccc'};
  }

  transform: translate(0, -55%);

  ${props => props.checked && `
  &::after {
    content: "";
    position: absolute;
    display: block;

    left: calc(${props.size ?? '25px'} / 2.75);
    top: calc(${props.size ?? '25px'} / 5);
    width: calc(${props.size ?? '25px'} / 5);
    height: calc(${props.size ?? '25px'} / 2.5);
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  `}
`;

export interface CheckBoxInputProps {
  initialChecked?: boolean;
  labelText: string;
  boxSize?: string;
  textFont?: FlattenSimpleInterpolation;
  onCheckedChange: (checked: boolean) => void;
};

/**
 * <img src="media://CheckBoxInput.PNG" alt="CheckBoxInput">
 */
export const CheckBoxInput = (props: CheckBoxInputProps): JSX.Element => {

  const {
    initialChecked = false,
    boxSize = '25px',
    labelText,
    onCheckedChange,
  } = props;

  const [checked, setChecked] = useState<boolean>(initialChecked !== undefined ? initialChecked : false);

  const toggleCheckbox = () => {
    onCheckedChange(!checked);
    setChecked(prev => !prev);
  };

  return (
    <Container onClick={toggleCheckbox}>
      {labelText}
      <CheckMark
        size={boxSize}
        checked={checked}
      />
    </Container>
  );
}

export default CheckBoxInput;