import React, { useState } from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  background-color: dark-gray;
  flex-direction: column;
  display: flex;
  width: 100%;
`;

const TextInputField = styled.input`
  align-self: left;
  width: 90%;
  padding: 2%;
  margin-top: 2vh;
  display: inline-block;
  font-size: 0.9em;
  letter-spacing: +1px;
  font-family: Raleway;
  text-align: left;
  color: black;
  border: solid 1px;
  ::placeholder {
    color: dark-gray;
    opacity: 0.75;
  }
`;

const TextContainer = styled.div`
  align-self: left;
`;

const FieldNameLabel = styled.label`
  font-size: 1em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: black;
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
      <TextContainer>
        <FieldNameLabel>
          {fieldName}
        </FieldNameLabel>
      </TextContainer>

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