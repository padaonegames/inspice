import {
  ConsumableFieldProps,
  LongTextFieldDefinition,
  LongTextResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import { Root, InputArea } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";

export interface LongTextInputCardProps
  extends ConsumableFieldProps<
    LongTextFieldDefinition,
    LongTextResponseDefinition
  > {
  /** Callback used whenever the enter key is pressed while the component is focused. */
  onEnterPress?: () => void;
  disabled?: boolean;
}

/** Controlled card component to support input for longer texts. */
export const LongTextInputCard = (
  props: LongTextInputCardProps
): JSX.Element => {
  const {
    response,
    fieldPayload,
    onResponseChanged,
    onEnterPress,
    disabled = false,
    ...formProps
  } = props;

  const { text } = response;
  const { maxLength, placeholder } = fieldPayload;

  const handleTextChanged = (value: string) => {
    if (onResponseChanged && !disabled) onResponseChanged({ text: value });
  }; // handleTextChanged

  return (
    <FormCard {...formProps}>
      <InputArea
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        value={text}
        onChange={(event) => handleTextChanged(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter" && onEnterPress) {
            onEnterPress();
          }
        }}
      />
    </FormCard>
  );
}; // LongTextInputCard

export interface EditableLongTextContentProps
  extends EditableFieldProps<LongTextFieldDefinition> {} // EditableLongTextContentProps

export const EditableLongTextContent = (
  _: EditableLongTextContentProps
): JSX.Element => {
  return (
    <Root>
      <InputArea
        disabled
        width="95%"
        placeholder="Long Text Answer"
        value={""}
      />
    </Root>
  );
}; // EditableLongTextContent

export default LongTextInputCard;
