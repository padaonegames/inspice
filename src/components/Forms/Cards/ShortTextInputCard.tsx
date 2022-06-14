import { EditableFieldProps, ShortTextFieldDefinition } from "../../../services/multistageFormActivity.model";
import {
  Root,
  InputText,
} from "./cardStyles";
import FormCard from "./FormCard";
import { AbstractFormFactory } from "./FormFactory";

export interface ShortTextInputCardProps extends ShortTextFieldDefinition {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
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
  /** Whether this field represents a password (should be hidden) */
  isPassword?: boolean;
  /** Proportion of container width to be used for input. 50% (0.5) by default */
  width?: number;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
  alertMessage?: string;
} // ShortTextInputCardProps

/** Controlled card component to support input for shorter texts. */
export const ShortTextInputCard = (props: ShortTextInputCardProps): JSX.Element => {

  const {
    promptText,
    required = false,
    requiredAlert = false,
    placeholder,
    maxLength,
    value,
    isPassword = false,
    onChange,
    onEnterPress,
    width = 0.5,
    alertMessage
  } = props;

  return (
    <FormCard
      promptText={promptText || ''}
      required={required}
      requiredAlert={requiredAlert}
      alertMessage={alertMessage}
    >
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
    </FormCard>
  );
}; // ShortTextInputCard

export interface EditableShortTextContentProps extends EditableFieldProps<ShortTextFieldDefinition> {
} // EditableShortTextContentProps

export const EditableShortTextContent = (_: EditableShortTextContentProps): JSX.Element => {

  return (
    <Root>
      <InputText
        disabled
        width='95%'
        placeholder='Short Text Answer'
        value={''}
      />
    </Root>
  );
}; // EditableShortTextContent

export const shortTextCardFactory: AbstractFormFactory<ShortTextFieldDefinition> = {
  userFormComponent: (useFormPayload: ShortTextInputCardProps) => (
    <ShortTextInputCard
      {...useFormPayload}
    />
  ),
  formEditingComponent: (editingFormProps: EditableShortTextContentProps) => (
    <EditableShortTextContent
      {...editingFormProps}
    />
  ),
  defaultFormDefinition: {}
}; // ShortTextCardFactory


export default ShortTextInputCard;