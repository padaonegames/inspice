import React from 'react';
import styled from 'styled-components';
import CheckBoxInput from './CheckBoxInput';

const FieldContainer = styled.div`
  margin-top: 30px;
  flex-direction: column;
  display: flex;
  width: 600px;
`;

const FieldNameLabel = styled.h3`
  align-self: center;
  color: #3f3c2d;
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

const CheckBoxContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  height: 65px;
  align-self: center;
  justify-content: space-around;
  align-items: center;
`;

interface CheckBoxGroupInputProps {
  fieldText: string;
  labelList: string[];
  initialAllowedInputTypes?: string[];
  onCheckBoxToggled: (label: string) => void;
};

const CheckBoxGroupInput: React.FC<CheckBoxGroupInputProps> = ({
  fieldText,
  labelList,
  onCheckBoxToggled,
  initialAllowedInputTypes,
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
              initialChecked={initialAllowedInputTypes?.some(elem => elem === label)}
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