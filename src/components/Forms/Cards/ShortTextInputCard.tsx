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
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must type into the field. */
  promptText: string;
  /** Text to display when the value is empty or undefined. */
  placeholder?: string;
  /** Callback to the parent used whenever the value of the input field is changed. */
  onChange?: (value: string) => void;
  /** Callback to the parent when the "Enter" key is pressed while the component is focused. */
  onEnterPress?: () => void;
  /** Maximum number of characters allowed within the input area. */
  maxLength?: number;
  /** Current value of the input field. Needs to be changed after onChange events in order to be synchronized with the internal state. */
  value?: string;
  /** If the field is required within the overall form (used to display an asterisk). */
  required?: boolean;
  /** If the user tries to submit the form without a required field this changes the appearance of the card. */
  requiredAlert?: boolean;
  /** Alert message to be displayed when required alert is set to true. */
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