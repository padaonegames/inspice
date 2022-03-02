import React from 'react';
import styled from 'styled-components';
import CheckBoxInput from './CheckBoxInput';

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

const CheckBoxContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  height: 65px;
  align-self: center;
  justify-content: space-around;
  align-items: center;
`;

export interface CheckBoxGroupInputProps {
  fieldText: string;
  labelList: string[];
  checked: boolean[];
  initialAllowedInputTypes?: string[];
  onCheckBoxToggled: (label: string) => void;
};

/**
 * <img src="media://CheckBoxGroupInput.PNG" alt="CheckBoxGroupInput">
 */
export const CheckBoxGroupInput: React.FC<CheckBoxGroupInputProps> = ({
  fieldText,
  labelList,
  checked,
  onCheckBoxToggled
}) => {

  return (
    <FieldContainer>
      <FieldNameLabel>
        {fieldText}
      </FieldNameLabel>
      <PanelContainer>
        <CheckBoxContainer>
          {labelList.map((label, index) =>
            <CheckBoxInput
              checked={index < checked.length && checked[index]}
              labelText={label}
              onCheckedChange={() => onCheckBoxToggled(label)}
              key={index}
            />
          )}
        </CheckBoxContainer>
      </PanelContainer>
    </FieldContainer>
  );
}

export default CheckBoxGroupInput;