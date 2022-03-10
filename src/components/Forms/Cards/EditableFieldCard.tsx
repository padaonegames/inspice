import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { FieldDefinition, FieldType, supportedFieldTypes } from "../../../services/multistageFormActivity.model";
import {
  Root,
  RequiredAlertIcon,
  RequiredQuestionSpan,
  CardPanel,
  InputArea,
  SelectFieldTypeDropdownButton
} from "./cardStyles";
import { RadioCircleMarked } from "styled-icons/boxicons-regular";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ShortText } from "@styled-icons/material/ShortText";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { CalendarEvent } from "@styled-icons/boxicons-regular/CalendarEvent";
import { Likert } from "@styled-icons/fluentui-system-regular/Likert";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import { CheckboxChecked } from "@styled-icons/fluentui-system-filled/CheckboxChecked";
import { LinearScale } from "@styled-icons/material-outlined/LinearScale";
import { Tags } from "@styled-icons/fa-solid/Tags";
import { Delete } from '@styled-icons/fluentui-system-regular/Delete';
import CheckBoxInput from "../CheckBoxInput";
import { EditableMultipleChoiceCardContent } from "./MultipleChoiceCard";
import { EditableCheckBoxGroupCardContent } from "./CheckBoxGroupInputCard";
import { EditableShortTextContent } from "./ShortTextInputCard";

const HeaderRow = styled.div`
  display: flex;
  padding: 5px 0;
  justify-content: space-between;
  margin-bottom: 0.25em;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  justify-content: right;
  align-items: center;
  margin-top: 0.25em;
`;

const fieldTypeIcon = css`
  color: ${props => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const ExpandDropdownIcon = styled(ChevronDown)`
  ${fieldTypeIcon}
  margin-left: auto;
`;

const MultipleChoiceIcon = styled(RadioCircleMarked)`
  ${fieldTypeIcon}
`;

const ShortTextIcon = styled(ShortText)`
  ${fieldTypeIcon}
`;

const LongTextIcon = styled(TextLeft)`
  ${fieldTypeIcon}
`;

const DateIcon = styled(CalendarEvent)`
  ${fieldTypeIcon}
`;

const LikertIcon = styled(Likert)`
  ${fieldTypeIcon}
`;

const ImageUploadIcon = styled(ImageAdd)`
  ${fieldTypeIcon}
`;

const CheckboxIcon = styled(CheckboxChecked)`
  ${fieldTypeIcon}
`;

const RangeIcon = styled(LinearScale)`
  ${fieldTypeIcon}
`;

const TagsIcon = styled(Tags)`
  ${fieldTypeIcon}
`;

const DeleteIcon = styled(Delete)`
  ${fieldTypeIcon}
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 2.5em;
  background-color: ${props => props.theme.cardBackground};
  min-width: 160px;
  width: 100%;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${props => props.theme.textColor};
  padding: 0.5em 0.85em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  text-decoration: none;
  height: 2.5em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-family: ${props => props.theme.contentFont};

  &:hover {
    background-color: #eeeeee;
  }
`;

const DottedLine = styled.div`
  height: 0.5em;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin: 0.5em 0;
`;

const HorizontalLine = styled.div`
  height: 1.75em;
  width: 0.5em;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 2px 0px 0px;
  margin: 0 0.5em;
`;

export interface EditableFieldCardProps {
  /** Placeholder for this card's prompt text */
  promptTextPlaceholder?: string;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** alert message to be displayed when required alert is set to true */
  alertMessage?: string;
  /** What type of question/ field this card is representing */
  fieldDefinition: FieldDefinition;
  /** Callback notifying of field type changing to a new format */
  onFieldTypeChanged?: (value: FieldType) => void;
  /** Callback notifying parent of field changing (including data payload) */
  onFieldDefinitionChanged?: (value: FieldDefinition) => void;
  /** Callback notifying parent component of user wanting to delete this card */
  onCardDeleted?: () => void;
  /** Callback notifying parent component of card getting the focus */
  onCardFocused?: () => void;
}

const fieldMappings: Map<FieldType, { component: JSX.Element; name: string; }> = new Map();
fieldMappings.set('short-text', { component: <ShortTextIcon />, name: 'Short Text' });
fieldMappings.set('long-text', { component: <LongTextIcon />, name: 'Paragraph' });
fieldMappings.set('multiple-choice', { component: <MultipleChoiceIcon />, name: 'Multiple Choice' });
fieldMappings.set('likert-scale', { component: <LikertIcon />, name: 'Likert Scale' });
fieldMappings.set('checkbox', { component: <CheckboxIcon />, name: 'Checkbox' });
fieldMappings.set('image-upload', { component: <ImageUploadIcon />, name: 'Image Upload' });
fieldMappings.set('range', { component: <RangeIcon />, name: 'Numeric Range' });
fieldMappings.set('calendar', { component: <DateIcon />, name: 'Date' });
fieldMappings.set('tags', { component: <TagsIcon />, name: 'Tag Cloud' });

/**
 * Editable version of StepTitleCard for form editing
 */
export const EditableFieldCard = (props: EditableFieldCardProps): JSX.Element => {

  const {
    promptTextPlaceholder = 'Prompt',
    requiredAlert,
    alertMessage,
    fieldDefinition,
    onFieldTypeChanged,
    onFieldDefinitionChanged,
    onCardDeleted,
    onCardFocused
  } = props;

  const promptAreaRef = useRef<HTMLTextAreaElement>(null);

  const [fieldTypeDropdownOpen, setFieldTypeDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (promptAreaRef.current == null) return;

    promptAreaRef.current.style.height = '0px';
    const scrollHeight = promptAreaRef.current.scrollHeight;
    promptAreaRef.current.style.height = scrollHeight + 'px';
  }, [fieldDefinition.promptText]);

  const handleFieldTypeSelected = (value: FieldType) => {
    if (onFieldTypeChanged) {
      onFieldTypeChanged(value);
    }
  };

  const handleFieldDefinitionChanged = (value: Omit<FieldDefinition, 'type' | 'promptText'>) => {
    if (onFieldDefinitionChanged) {
      onFieldDefinitionChanged({
        ...fieldDefinition,
        ...value
      })
    }
  };

  return (
    <Root>
      <CardPanel
        onClick={onCardFocused}
        requiredAlert={requiredAlert}
      >
        <HeaderRow>
          <InputArea
            dimBackground
            width='50%'
            height='2em'
            ref={promptAreaRef}
            placeholder={promptTextPlaceholder}
            maxLength={500}
            value={fieldDefinition.promptText}
            onChange={event => {
              if (onFieldDefinitionChanged) {
                onFieldDefinitionChanged({
                  ...fieldDefinition,
                  promptText: event.target.value
                });
              }
            }}
          />
          <SelectFieldTypeDropdownButton onClick={() => setFieldTypeDropdownOpen(prev => !prev)}>
            <MultipleChoiceIcon />{fieldMappings.get(fieldDefinition.type)?.name ?? fieldDefinition.type} <ExpandDropdownIcon />
            {fieldTypeDropdownOpen &&
              <DropdownMenu>
                {supportedFieldTypes.map(elem => (
                  <DropdownMenuItem onClick={() => handleFieldTypeSelected(elem)}>
                    {fieldMappings.get(elem)?.component ?? <></>}
                    {fieldMappings.get(elem)?.name ?? elem}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>}
          </SelectFieldTypeDropdownButton>
        </HeaderRow>
        {fieldDefinition.type === 'short-text' && (
          <EditableShortTextContent
            fieldDefinition={fieldDefinition}
          />
        )}
        {fieldDefinition.type === 'long-text' && (
          <></>
        )}
        {fieldDefinition.type === 'multiple-choice' && (
          <EditableMultipleChoiceCardContent
            addNewOptionLabel='Add new option'
            fieldDefinition={fieldDefinition}
            onDefinitionChanged={handleFieldDefinitionChanged}
          />
        )}
        {fieldDefinition.type === 'checkbox' && (
          <EditableCheckBoxGroupCardContent
            addNewOptionLabel='Add new option'
            fieldDefinition={fieldDefinition}
            onDefinitionChanged={handleFieldDefinitionChanged}
          />
        )}
        <DottedLine />
        <BottomRow>
          <CheckBoxInput
            style='radio'
            checked={fieldDefinition.required}
            labelText='Required'
            onCheckedChange={(checked) => {
              if (onFieldDefinitionChanged) {
                onFieldDefinitionChanged({
                  ...fieldDefinition,
                  required: checked
                });
              }
            }}
          />
          <HorizontalLine />
          <DeleteIcon onClick={onCardDeleted} />
        </BottomRow>
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> {alertMessage ?? 'This item is required.'}
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default EditableFieldCard;