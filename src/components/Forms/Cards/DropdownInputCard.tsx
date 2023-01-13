import {
  ConsumableFieldProps,
  DropdownFieldDefinition,
  DropdownResponseDefinition,
} from "../../../services/multistageFormActivity.model";
import { Root } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";
import { DropdownSelector } from "../DropdownSelector";

export interface DropdownInputCardProps
  extends ConsumableFieldProps<
    DropdownFieldDefinition,
    DropdownResponseDefinition
  > {
  disabled?: boolean;
} // DropdownInputCardProps

/** Controlled card component to support input for shorter texts. */
export const DropdownInputCard = (
  props: DropdownInputCardProps
): JSX.Element => {
  const {
    promptText = "",
    required = false,
    requiredAlert = false,
    alertMessage,
    fieldPayload,
    response,
    onResponseChanged,
    disabled = false,
  } = props;

  const { options } = fieldPayload;
  const { selectedOption } = response;

  const handleDropdownItemSelected = (elem: string) => {
    if (!onResponseChanged) return;
    onResponseChanged({ selectedOption: elem });
  }; // handleDropdownItemSelected

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
      alertMessage={alertMessage}
    >
      <DropdownSelector
        disabled={disabled}
        options={options.map((opt) => ({
          displayName: opt,
          onOptionSelected: () => handleDropdownItemSelected(opt),
        }))}
        selectedOption={selectedOption ?? "Select an option"}
      />
    </FormCard>
  );
}; // DropdownInputCard

export interface EditableDropdownContentProps
  extends EditableFieldProps<DropdownFieldDefinition> {} // EditableDropdownContentProps

export const EditableDropdownContent = (
  _: EditableDropdownContentProps
): JSX.Element => {
  return <Root></Root>;
}; // EditableDropdownContent

export default DropdownInputCard;
