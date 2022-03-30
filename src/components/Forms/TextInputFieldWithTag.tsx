import { useState } from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  margin: 35px auto;
  padding: 15px;

  @media (max-width: 768px) {
    max-width: 760px;
  }
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

interface FieldNameLabelProps {
  textAlign: 'left' | 'right' | 'center' | 'justify';
}
const FieldNameLabel = styled.h3<FieldNameLabelProps>`
  align-self: ${props => props.textAlign};
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (min-width: 768px) {
    font-size: 1.1em;
  }
`;

export interface TextInputFieldWithTagProps {
  /** Default value for the text box. */
  initialValue?: string;
  /** Text to display when the value is empty or undefined. */
  placeholder?: string;
  /** Component renderized next to the text. */
  icon?: JSX.Element;
  /** Label used for the test box. */
  fieldName: string;
  /** Alignment used for the text. Aligned by default to the left. */ 
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  /** Callback to the parent with the new value of the textbox as a parameter. */
  onChange: (value: string) => void;
  /** Callback which notifies when the enter key is pressed while the component is focused */
  onEnterPress?: () => void;
  /** Maximum number of characters to allow within the input area. */
  maxLength?: number;
};


/**
 * <img src="media://TextInputFieldWithTag.PNG" alt="TextInputFieldWithTag">
 */
export const TextInputFieldWithTag = (props: TextInputFieldWithTagProps) => {

  const {
    onEnterPress,
    initialValue,
    placeholder,
    fieldName,
    onChange,
    maxLength,
    textAlign = 'left'
  } = props;

  const [value, setValue] = useState<string>(initialValue || '');

  return (
    <FieldContainer>
      <FieldNameLabel textAlign={textAlign}>
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