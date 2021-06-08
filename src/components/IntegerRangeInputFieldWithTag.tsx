import React from 'react';
import styled from 'styled-components';
import IntegerRangeSlider from './IntegerRangeSlider';

const FieldContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 90%;
  align-self: center;
`;

const TextContainer = styled.div`
  width: 50%;
  padding-left: 5%;
  align-self: center;
`;

const FieldNameLabel = styled.label`
  font-size: 1em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: black;
`;

interface IntegerRangeInputFieldWithTagProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  onMinValueChange: (min: number) => void;
  onMaxValueChange: (max: number) => void;
  fieldText: string;
};

const IntegerRangeInputFieldWithTag: React.FC<IntegerRangeInputFieldWithTagProps> = ({
  min,
  max,
  step = 1,
  initialMin,
  initialMax,
  onMinValueChange,
  onMaxValueChange,
  fieldText,
}) => {

  return (
    <FieldContainer>
      <TextContainer>
        <FieldNameLabel>
          {fieldText}
        </FieldNameLabel>
      </TextContainer>

      <IntegerRangeSlider
        min={min}
        max={max}
        step={step}
        initialMin={initialMin}
        initialMax={initialMax}
        onMaxValueChange={onMaxValueChange}
        onMinValueChange={onMinValueChange}
      />
    </FieldContainer>
  );
}

export default IntegerRangeInputFieldWithTag;