import { EditableFieldProps, ShortTextFieldDefinition } from "../../../services/multistageFormActivity.model";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  InputText,
  RequiredQuestionSpan,
  RequiredAlertIcon
} from "./cardStyles";

export interface ShortTextInputCardProps {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must type into the field */
  promptText: string;
  /** Text to display whenever value is set to an empty string, or undefined */
  placeholder?: string;
  /** callback to use whenever the value of the input field is changed */
  onChange?: (value: string) => void;
  /** callback to use whenever the enter key is pressed while the component is focused */
  onEnterPress?: () => void;
  /** maximum number of characters to allow within the input area */
  maxLength?: number;
  /** current value of the input field. Needs to be changed after onChange events to be kept in sync with internal state */
  value?: string;
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** alert message to be displayed when required alert is set to true */
  alertMessage?: string;
  /** Whether this field represents a password (should be hidden) */
  isPassword?: boolean;
  /** Proportion of container width to be used for input. 50% (0.5) by default */
  width?: number;
}

/** Controlled card component to support input for shorter texts. */
export const ShortTextInputCard = (props: ShortTextInputCardProps): JSX.Element => {

  const {
    promptText,
    placeholder,
    maxLength,
    value,
    requiredAlert,
    required,
    alertMessage,
    isPassword = false,
    onChange,
    onEnterPress,
    width = 0.5
  } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <InputText
          textWidth={width}
          type={isPassword ? 'password' : 'text'}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={event => {
            if (onChange) onChange(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter' && onEnterPress) {
              onEnterPress();
            }
          }}
        />
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> {alertMessage ?? 'This question is required.'}
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export interface EditableShortTextContentProps extends EditableFieldProps<ShortTextFieldDefinition> {
}

export const EditableShortTextContent = (props: EditableShortTextContentProps): JSX.Element => {

  const {
    fieldDefinition,
    onDefinitionChanged
  } = props;

  return (
    <Root>
      <InputText
        width='95%'
        placeholder='Placeholder...'
        value={fieldDefinition.placeholder || ''}
        onChange={event => {
          if (onDefinitionChanged) onDefinitionChanged({ ...fieldDefinition, placeholder: event.target.value });
        }}
      />
    </Root>
  );
};


export default ShortTextInputCard;