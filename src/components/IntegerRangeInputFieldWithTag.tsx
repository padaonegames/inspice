import React from 'react';
import styled from 'styled-components';
import IntegerRangeSlider from './IntegerRangeSlider';

const FieldContainer = styled.div`
  margin-top: 30px;
  flex-direction: column;
  display: flex;
  width: 600px;
`;

const FieldNameLabel = styled.h3`
  align-self: center;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
`;

const PanelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: white;
  box-shadow: 0 0 1px 3px #efefef;
  letter-spacing: +1px;
  font-family: Raleway;
  width: 100%;
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
      <FieldNameLabel>
        {fieldText}
      </FieldNameLabel>

      <PanelContainer>
        <IntegerRangeSlider
          min={min}
          max={max}
          step={step}
          initialMin={initialMin}
          initialMax={initialMax}
          onMaxValueChange={onMaxValueChange}
          onMinValueChange={onMinValueChange}
        />
      </PanelContainer>
    </FieldContainer>
  );
}

export default IntegerRangeInputFieldWithTag;