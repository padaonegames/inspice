import { EditableFieldProps, LongTextFieldDefinition } from "../../../services/multistageFormActivity.model";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  InputArea
} from "./cardStyles";

export interface LongTextInputCardProps extends LongTextFieldDefinition {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must type into the field. */
  promptText: string;
  /** Text to display whenever value is set to an empty string, or undefined. */
  placeholder?: string;
  /** Callback used whenever the value of the input field is changed. */
  onChange?: (value: string) => void;
  /** Callback used whenever the enter key is pressed while the component is focused. */
  onEnterPress?: () => void;
  /** Maximum number of characters to allow within the input area. */
  maxLength?: number;
  /** Current value of the input field. Needs to be changed after onChange events to be kept in sync with internal state. */
  value?: string;
  /** Whether this field is considered required within the overall form (used to display an asterisk). */
  required?: boolean;
  /** Modifies the appearance of the card to reflect that the user tried to submit the form without entering a value for this field. */
  requiredAlert?: boolean;
}

/** Controlled card component to support input for longer texts. */
export const LongTextInputCard = (props: LongTextInputCardProps): JSX.Element => {

  const {
    promptText,
    placeholder,
    maxLength,
    value,
    requiredAlert,
    required,
    onChange,
    onEnterPress
  } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <InputArea
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
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
}; // LongTextInputCard

export interface EditableLongTextContentProps extends EditableFieldProps<LongTextFieldDefinition> {
} // EditableLongTextContentProps

export const EditableLongTextContent = (_: EditableLongTextContentProps): JSX.Element => {

  return (
    <Root>
      <InputArea
        disabled
        width='95%'
        placeholder='Long Text Answer'
        value={''}
      />
    </Root>
  );
}; // EditableLongTextContent

export default LongTextInputCard;