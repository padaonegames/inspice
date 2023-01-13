import {
  CheckboxGroupFieldDefinition,
  CheckboxGroupResponseDefinition,
  ConsumableFieldProps,
} from "../../../services/multistageFormActivity.model";
import {
  addItemToArray,
  removeItemFromArrayByIndex,
  transformItemFromArrayByIndex,
} from "../../../utils/arrayUtils";
import CheckBoxInput from "../CheckBoxInput";
import EditableCheckBoxInput from "../EditableCheckBoxInput";
import { CheckboxList, CheckboxOption } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";

export interface CheckBoxGroupInputCardProps
  extends ConsumableFieldProps<
    CheckboxGroupFieldDefinition,
    CheckboxGroupResponseDefinition
  > {} // CheckBoxGroupInputCardProps

export const CheckBoxGroupInputCard = (
  props: CheckBoxGroupInputCardProps
): JSX.Element => {
  const { fieldPayload, response, onResponseChanged, ...formProps } = props;
  const { fields } = fieldPayload;
  const { selectedFields } = response;

  const handleCheckedChange = (elementName: string, selected: boolean) => {
    if (!onResponseChanged) return;
    if (selected && !selectedFields.includes(elementName)) {
      // case 1: element is selected and was not previously selected => add element to array
      onResponseChanged({ selectedFields: [...selectedFields, elementName] });
    } else if (!selected && selectedFields.includes(elementName)) {
      // case 2: element is not selected and was previously selected => remove element from array
      onResponseChanged({
        selectedFields: selectedFields.filter((elem) => elem !== elementName),
      });
    }
  }; // handleCheckedChange

  return (
    <FormCard {...formProps}>
      <CheckboxList>
        {fields.map((elem) => (
          <CheckboxOption key={elem}>
            <CheckBoxInput
              labelText={elem}
              checked={selectedFields?.some((e) => e === elem)}
              boxSize="15px"
              onCheckedChange={(status) => handleCheckedChange(elem, status)}
            />
          </CheckboxOption>
        ))}
      </CheckboxList>
    </FormCard>
  );
};

export interface EditableCheckBoxGroupCardContentProps
  extends EditableFieldProps<CheckboxGroupFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableCheckBoxGroupCardContentProps

export const EditableCheckBoxGroupCardContent = (
  props: EditableCheckBoxGroupCardContentProps
): JSX.Element => {
  const {
    fieldPayload,
    addNewOptionLabel = "New Option",
    onPayloadChanged,
  } = props;

  const { fields } = fieldPayload;

  const handleAddOption = () => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      fields: addItemToArray(
        fieldPayload.fields,
        `Option ${fieldPayload.fields.length + 1}`,
        fieldPayload.fields.length
      ),
    });
  }; // handleAddOption

  const handleRemoveOption = (index: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      fields: removeItemFromArrayByIndex(fieldPayload.fields, index),
    });
  }; // handleAddOption

  const handleOptionTextChanged = (index: number, value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      fields: transformItemFromArrayByIndex(
        fieldPayload.fields,
        index,
        () => value
      ),
    });
  }; // handleOptionTextChanged

  return (
    <>
      <CheckboxList>
        {fields.map((elem, i) => (
          <CheckboxOption key={`checkBoxOption${i}`}>
            <EditableCheckBoxInput
              boxContent={{ type: "none" }}
              labelText={elem}
              style="checkbox"
              boxSize="15px"
              onObjectRemoved={() => handleRemoveOption(i)}
              inputType="text"
              onLabelTextChanged={(value) => handleOptionTextChanged(i, value)}
            />
          </CheckboxOption>
        ))}
        <CheckboxOption onClick={handleAddOption} key="checkBoxOptionAddNew">
          <EditableCheckBoxInput
            key="editableCheckBoxInputAddNew"
            boxContent={{ type: "none" }}
            labelText=""
            labelTextPlaceholder={addNewOptionLabel}
            style="checkbox"
            boxSize="15px"
            inputType="click"
          />
        </CheckboxOption>
      </CheckboxList>
    </>
  );
}; // EditableCheckBoxGroupCardContent

export default CheckBoxGroupInputCard;
