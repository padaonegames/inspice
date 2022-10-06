import {
  ConsumableFieldProps,
  LongTextFieldDefinition,
  LongTextResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  InputArea,
} from "./cardStyles";
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
    promptText = "",
    requiredAlert,
    required,
    response,
    fieldPayload,
    alertMessage,
    onResponseChanged,
    onEnterPress,
    disabled = false,
  } = props;

  const { text } = response;
  const { maxLength, placeholder } = fieldPayload;

  return (
    <FormCard
      {...props}
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
      alertMessage={alertMessage}
    >
      <InputArea
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        value={text}
        onChange={(event) => {
          if (onResponseChanged)
            onResponseChanged({ text: event.target.value });
        }}
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
