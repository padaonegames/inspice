import React, { useState } from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-top: 5vh;
  flex-direction: column;
  display: flex;
  width: 40%;
`;

const TextInputField = styled.input`
  box-shadow: 0 0 1px 3px #efefef;
  align-self: center;
  background-color: white;
  width: 90%;
  padding: 15px;
  margin-top: 3vh;
  display: inline-block;
  font-size: 0.9em;
  letter-spacing: +1px;
  font-family: Raleway;
  text-align: left;
  color: black;
  border: solid 1px white;
  ::placeholder {
    color: dark-gray;
    opacity: 0.75;
  }
`;

const FieldNameLabel = styled.h3`
  align-self: center;
  color: #3f3c2d;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
`;

interface TextInputFieldWithTagProps {
  initialValue?: string;
  placeholder?: string;
  icon?: JSX.Element;
  fieldName: string;
  onChange: (value: string) => void;
  onEnterPress?: () => void;
  maxLength?: number;
};

const TextInputFieldWithTag: React.FC<TextInputFieldWithTagProps> = ({
  onEnterPress,
  initialValue,
  placeholder,
  fieldName,
  onChange,
  maxLength,
}) => {

  const [value, setValue] = useState<string>(initialValue || '');

  return (
    <FieldContainer>
      <FieldNameLabel>
        {fieldName}
      </FieldNameLabel>

      <TextInputField
        maxLength={maxLength}
        width='45%'
        value={value}
        placeholder={placeholder}
        onChange={event => {
          onChange(event.target.value);
          setValue(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter' && onEnterPress) {
            onEnterPress();
          }
        }}
      ></TextInputField>
    </FieldContainer>
  );
}

export default TextInputFieldWithTag;