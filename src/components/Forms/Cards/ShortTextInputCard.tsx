import {
  ConsumableFieldProps,
  ShortTextFieldDefinition,
  ShortTextResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import { Root, InputText } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";

export interface ShortTextInputCardProps
  extends ConsumableFieldProps<
    ShortTextFieldDefinition,
    ShortTextResponseDefinition
  > {
  /** Proportion of container width to be used for input. 50% (0.5) by default */
  width?: number;
  /** Callback to the parent when the "Enter" key is pressed while the component is focused. */
  onEnterPress?: () => void;
} // ShortTextInputCardProps

/** Controlled card component to support input for shorter texts. */
export const ShortTextInputCard = (
  props: ShortTextInputCardProps
): JSX.Element => {
  const {
    fieldPayload,
    response,
    onResponseChanged,
    onEnterPress,
    width = 0.5,
    disabled = false,
    ...formProps
  } = props;

  const { isPassword, maxLength, placeholder } = fieldPayload;
  const { text } = response;

  const handleTextChanged = (value: string) => {
    if (onResponseChanged && !disabled) onResponseChanged({ text: value });
  }; // handleTextChanged

  return (
    <FormCard {...formProps}>
      <InputText
        disabled={disabled}
        textWidth={width}
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        maxLength={maxLength}
        value={text}
        onChange={(event) => handleTextChanged(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter" && onEnterPress && !disabled) {
            onEnterPress();
          }
        }}
      />
    </FormCard>
  );
}; // ShortTextInputCard

export interface EditableShortTextContentProps
  extends EditableFieldProps<ShortTextFieldDefinition> {} // EditableShortTextContentProps

export const EditableShortTextContent = (
  _: EditableShortTextContentProps
): JSX.Element => {
  return (
    <Root>
      <InputText
        disabled
        width="95%"
        placeholder="Short Text Answer"
        value={""}
      />
    </Root>
  );
}; // EditableShortTextContent

export default ShortTextInputCard;
