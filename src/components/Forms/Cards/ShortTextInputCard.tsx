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
    onChange,
    onEnterPress
  } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <InputText
          type='text'
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

export default ShortTextInputCard;