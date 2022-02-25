import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { FieldType, supportedFieldTypes } from "../../../services/multistageFormActivity.model";
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

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  justify-content: space-between;
  margin-bottom: 0.25em;
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
  /** Prompt to serve as a context for the user filling in the field (what they are supposed to do and so on). */
  promptText: string;
  /** callback notifying of prompt text being changed by the user */
  onPromptTextChanged?: (value: string) => void;
  /** Whether contained field should be required in the final form */
  required?: boolean;
  /** Callback notifying of required status being changed by the user */
  onRequiredChanged?: (value: boolean) => void;
  /** Placeholder for this card's prompt text */
  promptTextPlaceholder?: string;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** alert message to be displayed when required alert is set to true */
  alertMessage?: string;
  /** What type of question/ field this card is representing */
  fieldType: FieldType;
  /** Callback notifying of field type changing to a new format */
  onFieldTypeChanged?: (value: FieldType) => void;
  /** Callback notifying parent component of user wanting to delete this card */
  onCardDeleted?: () => void;
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
    promptText,
    onPromptTextChanged,
    required,
    onRequiredChanged,
    promptTextPlaceholder = 'Prompt',
    requiredAlert,
    alertMessage,
    fieldType,
    onFieldTypeChanged,
    onCardDeleted
  } = props;

  const promptAreaRef = useRef<HTMLTextAreaElement>(null);

  const [fieldTypeDropdownOpen, setFieldTypeDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (promptAreaRef.current == null) return;

    promptAreaRef.current.style.height = '0px';
    const scrollHeight = promptAreaRef.current.scrollHeight;
    promptAreaRef.current.style.height = scrollHeight + 'px';
  }, [promptText]);

  const handleFieldTypeSelected = (value: FieldType) => {
    if (onFieldTypeChanged) {
      onFieldTypeChanged(value);
    }
  };

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <HeaderRow>
          <InputArea
            dimBackground
            width='50%'
            height='2em'
            ref={promptAreaRef}
            placeholder={promptTextPlaceholder}
            maxLength={500}
            value={promptText}
            onChange={event => {
              if (onPromptTextChanged) onPromptTextChanged(event.target.value);
            }}
          />
          <SelectFieldTypeDropdownButton onClick={() => setFieldTypeDropdownOpen(prev => !prev)}>
            <MultipleChoiceIcon />{fieldMappings.get(fieldType)?.name ?? fieldType} <ExpandDropdownIcon />
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
        <DottedLine />
        <BottomRow>
          <CheckBoxInput
            style='radio'
            checked={required}
            labelText='Required'
            onCheckedChange={(checked) => {
              if (onRequiredChanged) {
                onRequiredChanged(checked)
              }
            }}
          />
          <HorizontalLine />
          <DeleteIcon onClick={onCardDeleted}/>
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