import React from 'react';
import styled from 'styled-components';
import CheckBoxInput from './CheckBoxInput';

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

const CheckBoxContainer = styled.div`
  flex-direction: row;
  display: flex;
  width: 50%;
  align-self: center;
  justify-content: space-around;
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
      <TextContainer>
        <FieldNameLabel>
          {fieldText}
        </FieldNameLabel>
      </TextContainer>
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
    </FieldContainer>
  );
}

export default CheckBoxGroupInput;