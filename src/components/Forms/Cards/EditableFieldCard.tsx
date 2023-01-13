import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  AvailableMultistageFormFieldType,
  MultistageFormField,
  availableMultistageFormItemTypes,
  SupportedFormField,
} from "../../../services/multistageFormActivity.model";
import {
  Root,
  RequiredAlertIcon,
  RequiredQuestionSpan,
  CardPanel,
  InputArea,
  SelectFieldTypeDropdownButton,
  CardBottomRow,
  DottedLine,
  HorizontalLine,
} from "./cardStyles";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { ArrowDownSquareFill } from "@styled-icons/bootstrap/ArrowDownSquareFill";
import { ArrowUpSquareFill } from "@styled-icons/bootstrap/ArrowUpSquareFill";
import CheckBoxInput from "../CheckBoxInput";
import React from "react";
import DropdownMenu from "../DropdownMenu";

/**
 * Recommended styles for an icon being passed to EditableFieldCard
 * component within a list of field Mapping specifications for optimal
 * rendering.
 */
export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const DeleteIcon = styled(Delete)`
  ${fieldTypeIcon}
  cursor: pointer;
`;

const ExpandDropdownIcon = styled(ChevronDown)`
  ${fieldTypeIcon}
  margin-left: auto;
`;

interface ButtonProps {
  avaliable: boolean;
}

const UpArrowIcon = styled(ArrowUpSquareFill)<ButtonProps>`
  ${fieldTypeIcon}
  position: absolute;
  left: 2%;
  top: 50%;
  transform: translate(0%, -50%);
  // border-radius: 100%;
  color: rgb(80, 80, 80);
  opacity: ${(props) => (props.avaliable ? "1" : "0.3")};
  &:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;

const DownArrowIcon = styled(ArrowDownSquareFill)<ButtonProps>`
  ${fieldTypeIcon}
  position: absolute;
  left: 8%;
  top: 50%;
  transform: translate(0%, -50%);
  color: rgb(80, 80, 80);
  opacity: ${(props) => (props.avaliable ? "1" : "0.3")};

  &:hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;

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

export interface EditableFieldProps<FieldPayload> {
  /** Definition to be used to render the stateless editable field component (only the exclusive part of the definition, prompt text and type are edited elsewhere) */
  fieldPayload: FieldPayload;
  /** Callback to notify parent component of a change whithin the current definition */
  onPayloadChanged?: (definition: FieldPayload) => void;
} // EditableFieldProps<T>

export interface FieldMappingEntry<T extends SupportedFormField> {
  /** How to render this option within a list. Defaults to fieldType */
  displayName: string;
  /** What component to place next to the display name */
  iconComponent?: JSX.Element;
  /** Generation logic to use to create a form editing component */
  editingComponentProducer: (
    editingFormProps: EditableFieldProps<T["payload"]>
  ) => JSX.Element;
  /** Default value for FieldPayload */
  defaultFieldPayload: T["payload"];
} // FieldMappingEntry

export type FieldMappings<T extends SupportedFormField> = {
  /** What type of field we are working with here*/
  [P in T["type"]]: FieldMappingEntry<Extract<T, { type: P }>>;
}; // FieldMappings

export interface EditableFieldCardProps {
  /** Placeholder for this card's prompt text */
  promptTextPlaceholder?: string;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** alert message to be displayed when required alert is set to true */
  alertMessage?: string;
  /** What type of question/ field this card is representing (type must be consistent with fieldMappings' name values) */
  initialField: MultistageFormField;
  /** What  mappings we are working with in this editiable field card (available field types and how to render them) */
  fieldMappings: FieldMappings<SupportedFormField>;
  /** Boolean that tells wether this card is currently being focused by the user */
  isFocused?: boolean;
  /** Boolean that tells wether this card is the first one in the activity and if it can be moved upwards or not */
  firstCard?: boolean;
  /** Boolean that tells wether this card is the last one in the activity and if it can be moved downwards or not */
  lastCard?: boolean;
  /** Callback notifying of field type changing to a new format */
  onFieldTypeChanged?: (value: AvailableMultistageFormFieldType) => void;
  /** Callback notifying parent of field changing (including data payload) */
  onFieldChanged?: (value: MultistageFormField) => void;
  /** Callback notifying parent component of user wanting to delete this card */
  onCardDeleted?: () => void;
  /** Callback notifying parent component of card getting the focus */
  onCardFocused?: () => void;
  /** Callback notifying parent component of card losing the focus */
  onCardLostFocus?: () => void;
  /** Callback notifying parent component of mouse entered this component */
  onMouseEntered?: () => void;
  /** Callback notifying parent component that the user wants to move this component upwards within the activity */
  onMoveUpCard?: () => void;
  /** Callback notifying parent component that the user wants to move this component downwards within the activity */
  onMoveDownCard?: () => void;
} // EditableFieldCardProps

/**
 * Editable version of StepTitleCard for form editing
 */
export const EditableFieldCard = (
  props: EditableFieldCardProps
): JSX.Element => {
  const {
    promptTextPlaceholder = "Prompt",
    requiredAlert,
    alertMessage,
    initialField,
    fieldMappings,
    isFocused = false,
    firstCard = false,
    lastCard = false,
    onFieldTypeChanged,
    onFieldChanged,
    onCardDeleted,
    onCardFocused,
    onCardLostFocus,
    onMouseEntered,
    onMoveDownCard,
    onMoveUpCard,
  } = props;

  // managed state for field definition
  const [fieldDefinition, setField] =
    useState<MultistageFormField>(initialField);

  // each time the stages are modified our state will notice it
  useEffect(() => {
    setField(initialField);
  }, [initialField]);

  // whether the field type dropdown is currently open
  const [fieldTypeDropdownOpen, setFieldTypeDropdownOpen] =
    useState<boolean>(false);
  // reference to the actual DOM element for the prompt area to allow for dynamic resizing
  const promptAreaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * useEffect hook to maintain a consistent height for the
   * HTMLTextAreaElement used to display the promptText.
   * Essentialy, this listens for changes in promptText and
   * modifies container's height dynamically to fit the entire text
   * without having to scroll.
   */
  useEffect(() => {
    if (promptAreaRef.current == null) return;

    promptAreaRef.current.style.height = "0px";
    const scrollHeight = promptAreaRef.current.scrollHeight;
    promptAreaRef.current.style.height = scrollHeight + "px";
  }, [fieldDefinition.promptText]); // useEffect

  /**
   * Manage the selection of a new field type from the dropdown
   * and notify parent component about the change, assuming that
   * a fitting onFieldTypeChanged callback has been provided.
   * @param value New field type selected by the user.
   */
  const handleFieldTypeSelected = (value: AvailableMultistageFormFieldType) => {
    // create a new field definition that's consistent with both new type and previous information
    const newField: MultistageFormField = {
      ...fieldDefinition,
      fieldData: {
        type: value,
        payload: fieldMappings[value].defaultFieldPayload,
      } as SupportedFormField,
    };
    // update inner state
    setField(newField);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldTypeChanged) {
      onFieldTypeChanged(value);
    }
    if (onFieldChanged) {
      onFieldChanged(newField);
    }
  }; // handleFieldTypeSelected

  /**
   * Manage any change from child fieldForm components over their
   * own field payloads to keep the results consistent with general
   * editing card and notify parent component about the change, assuming that
   * a fitting onFieldChanged callback has been provided.
   * @param payload New field definition payload after a change within the currently active child form.
   */
  const handleFieldPayloadChanged = (
    payload: SupportedFormField["payload"]
  ) => {
    // create a new field definition that's consistent with both new type and previous information
    const newField: MultistageFormField = {
      ...fieldDefinition,
      fieldData: {
        type: fieldDefinition.fieldData.type,
        payload: payload,
      } as SupportedFormField,
    };
    // update inner state
    setField(newField);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldChanged) {
      onFieldChanged(newField);
    }
  }; // handleFieldPayloadChanged

  /**
   * Manage a change in the required status of this field.
   * @param value New required status (boolean)
   */
  const handleFieldRequiredChanged = (value: boolean) => {
    // create a new field definition with the new required status
    const newField: MultistageFormField = {
      ...fieldDefinition,
      required: value,
    };
    // update inner state
    setField(newField);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldChanged) {
      onFieldChanged(newField);
    }
  }; // handleFieldRequiredChanged

  /**
   * Manage a change in the prompt text for this field
   * @param value New prompt text
   */
  const handlePromptTextChanged = (value: string) => {
    // create a new field definition with the new required status
    const newField: MultistageFormField = {
      ...fieldDefinition,
      promptText: value,
    };
    // update inner state
    setField(newField);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldChanged) {
      onFieldChanged(newField);
    }
  }; // handlePromptTextChanged

  const selectedField = fieldMappings[fieldDefinition.fieldData.type];

  return (
    <Root>
      <CardPanel
        requiredAlert={requiredAlert}
        onMouseEnter={onMouseEntered}
        onFocus={onCardFocused}
        onBlur={onCardLostFocus}
        isFocused={isFocused}
      >
        <HeaderRow>
          {/* Input field for the prompt of this card */}
          <InputArea
            dimBackground
            width="50%"
            height="2em"
            ref={promptAreaRef}
            placeholder={promptTextPlaceholder}
            maxLength={500}
            value={fieldDefinition.promptText}
            onChange={(event) => handlePromptTextChanged(event.target.value)}
          />
          {/* Drop down menu that allows the user to select a specific form for this card */}
          <SelectFieldTypeDropdownButton
            onClick={() => setFieldTypeDropdownOpen((prev) => !prev)}
          >
            {selectedField?.iconComponent}
            {selectedField.displayName}
            <ExpandDropdownIcon />
            {fieldTypeDropdownOpen && (
              <DropdownMenu
                options={availableMultistageFormItemTypes.map((elem) => ({
                  iconComponent: fieldMappings[elem].iconComponent,
                  displayName: fieldMappings[elem].displayName,
                  onOptionSelected: () => handleFieldTypeSelected(elem),
                }))}
                onCloseDropdown={() => setFieldTypeDropdownOpen(false)}
              />
            )}
          </SelectFieldTypeDropdownButton>
        </HeaderRow>
        {/* Form that has been selected for this card */}
        {selectedField &&
          selectedField.editingComponentProducer({
            fieldPayload: fieldDefinition.fieldData.payload as any,
            onPayloadChanged: handleFieldPayloadChanged,
          })}
        <DottedLine />
        {/* Container of the buttons that appear at the bottom of the card */}
        <CardBottomRow>
          <UpArrowIcon onMouseDown={onMoveUpCard} avaliable={!firstCard} />
          <DownArrowIcon onMouseDown={onMoveDownCard} avaliable={!lastCard} />

          <CheckBoxInput
            style="radio"
            checked={fieldDefinition.required}
            labelText="Required"
            onCheckedChange={handleFieldRequiredChanged}
          />
          <HorizontalLine />
          <DeleteIcon onClick={onCardDeleted} />
        </CardBottomRow>
        {/* Alert in case the card hasnt been filled correctly */}
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> {alertMessage ?? "This item is required."}
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
}; // EditableFieldCard

export default React.memo(EditableFieldCard);
