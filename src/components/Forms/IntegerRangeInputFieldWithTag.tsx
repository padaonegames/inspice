import React from 'react';
import styled from 'styled-components';
import IntegerRangeSlider from './IntegerRangeSlider';

const FieldContainer = styled.div`
  margin-top: 30px;
  flex-direction: column;
  display: flex;
  width: 100%;
  margin: 35px auto;

  @media (max-width: 768px) {
    max-width: 760px;
    min-width: 370px;
  }
`;

const FieldNameLabel = styled.h3`
  align-self: center;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (min-width: 768px) {
    font-size: 1.1em;
  }
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

export interface IntegerRangeInputFieldWithTagProps {
  /** Minimum value of the range. */
  min: number;
  /** Maximum value of the range. */
  max: number;
  /** Value for the size of the jumps when changing the range.  */
  step?: number;
  /** Initial value for the minimum range. */
  initialMin?: number;
  /** Initial value for the maximum range. */
  initialMax?: number;
  /** Callback to inform the parent of the component that the minimum value has changed. */
  onMinValueChange: (min: number) => void;
  /** Callback to inform the parent of the component that the maximum value has changed. */
  onMaxValueChange: (max: number) => void;
  /** String used as label for the range.  */
  fieldText: string;
};

/**
 * <img src="media://IntegerRangeInputFieldWithTag.PNG" alt="IntegerRangeInputFieldWithTag">
 */
export const IntegerRangeInputFieldWithTag: React.FC<IntegerRangeInputFieldWithTagProps> = ({
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