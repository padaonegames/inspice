import React from 'react';
import styled from 'styled-components';

interface BoxProps {
  Selected: boolean;
};

const NumberBox = styled.button<BoxProps>`
  background: ${props => props.Selected ? '#ffffff' : '#d3d3d3'};
  cursor: ${props => props.Selected ? 'default' : 'pointer'};
  font-size: 1em; 
  line-height: 1em; 
  padding: 0.75em 1em; 
  border-radius: 5px; 
  font-family: ${props => props.theme.contentFont}; 
  color: ${props => props.theme.textColor};
  font-weight: normal; 
  text-transform: capitalize;
  justify-content: center;
  vertical-align: middle;
  margin: 0 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.25rem 0px;

  ${props => !props.Selected && `
  &:hover {
    background: ${props.theme.cardBackground};
    transform: scale(1.05);
    transition: transform 0.5s ease;
  }
  `}
`;

interface NumberIconProps {
  UsingNumber: number | string;
  Selected: boolean;
  children?: React.ReactNode;
  onClick: () => void;
};
const NumberIcon = (props: NumberIconProps) => {
  const {
    UsingNumber,
    Selected,
    onClick
  } = props;

  return (
    <NumberBox
      Selected={Selected}
      onClick={onClick}
    >
      {UsingNumber}
    </NumberBox>
  )
};

export default NumberIcon;