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
  promptText: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnterPress?: () => void;
  maxLength?: number;
  value?: string;
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}

export const ShortTextInputCard = (props: ShortTextInputCardProps): JSX.Element => {

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
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default ShortTextInputCard;