import React, { useState } from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-top: 35px;
  flex-direction: column;
  display: flex;
  width: 600px;
`;

const TextInputField = styled.input`
  box-shadow: 0 0 1px 3px #efefef;
  align-self: center;
  background-color: white;
  width: 90%;
  padding: 15px;
  margin-top: 30px;
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
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
`;

export interface TextInputFieldWithTagProps {
  initialValue?: string;
  placeholder?: string;
  icon?: JSX.Element;
  fieldName: string;
  onChange: (value: string) => void;
  onEnterPress?: () => void;
  maxLength?: number;
};

/**
 * <img src="media://TextInputFieldWithTag.PNG" alt="TextInputFieldWithTag">
 */
export const TextInputFieldWithTag: React.FC<TextInputFieldWithTagProps> = ({
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