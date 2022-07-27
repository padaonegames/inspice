import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  AvailableMultistageFormFieldType,
  EditableFieldProps,
  MultistageFormFieldDefinition,
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
} from "./cardStyles";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { ArrowDownSquareFill } from "@styled-icons/bootstrap/ArrowDownSquareFill";
import { ArrowUpSquareFill } from "@styled-icons/bootstrap/ArrowUpSquareFill";
import CheckBoxInput from "../CheckBoxInput";

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

const BottomRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  justify-content: right;
  align-items: center;
  margin-top: 0.25em;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 2.5em;
  background-color: ${(props) => props.theme.cardBackground};
  min-width: 160px;
  width: 100%;
  box-shadow: rgba(37, 7, 107, 0.35) 0px 2px 4px 0px;
  z-index: 25;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
`;

const DropdownMenuItem = styled.a`
  color: ${(props) => props.theme.textColor};
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
  font-family: ${(props) => props.theme.contentFont};

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
  /** What type of question/ field this card is representing (type must be consistent with fieldMappings' name values) */
  initialFieldDefinition?: MultistageFormFieldDefinition;
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
  onFieldDefinitionChanged?: (value: MultistageFormFieldDefinition) => void;
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
}

export type FieldMappings<T extends SupportedFormField> = {
  /** What type of field we are working with here*/
  [P in T["type"]]: {
    /** How to render this option within a list. Defaults to fieldType */
    displayName?: string;
    /** What component to place next to the display name */
    iconComponent?: JSX.Element;
    /** Generation logic to use to create a form editing component */
    editingComponentProducer: (
      editingFormProps: EditableFieldProps<Extract<T, { type: P }>["payload"]>
    ) => JSX.Element;
    /** Default value for FieldPayload */
    defaultFieldPayload: Extract<T, { type: P }>["payload"];
  };
}; // FieldMappings

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
    initialFieldDefinition,
    fieldMappings,
    isFocused = false,
    firstCard = false,
    lastCard = false,
    onFieldTypeChanged,
    onFieldDefinitionChanged,
    onCardDeleted,
    onCardFocused,
    onCardLostFocus,
    onMouseEntered,
    onMoveDownCard,
    onMoveUpCard,
  } = props;

  // managed state for field definition
  const [fieldDefinition, setFieldDefinition] =
    useState<MultistageFormFieldDefinition>(
      initialFieldDefinition ?? {
        promptText: "",
        required: false,
        fieldData: {
          type: "multiple-choice",
          payload: fieldMappings["multiple-choice"].defaultFieldPayload,
        },
        _id: "",
      }
    );

  // each time the stages are modified our state will notice it
  useEffect(() => {
    setFieldDefinition(
      initialFieldDefinition ?? {
        promptText: "",
        required: false,
        fieldData: {
          type: "multiple-choice",
          payload: fieldMappings["multiple-choice"].defaultFieldPayload,
        },
        _id: "",
      }
    );
  }, [initialFieldDefinition]);

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
    const newFieldDefinition: MultistageFormFieldDefinition = {
      ...fieldDefinition,
      fieldData: {
        type: value,
        payload: fieldMappings[value].defaultFieldPayload,
      } as SupportedFormField,
    };
    // update inner state
    setFieldDefinition(newFieldDefinition);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldTypeChanged) {
      onFieldTypeChanged(value);
    }
    if (onFieldDefinitionChanged) {
      onFieldDefinitionChanged(newFieldDefinition);
    }
  }; // handleFieldTypeSelected

  /**
   * Manage any change from child fieldForm components over their
   * own field payloads to keep the results consistent with general
   * editing card and notify parent component about the change, assuming that
   * a fitting onFieldDefinitionChanged callback has been provided.
   * @param payload New field definition payload after a change within the currently active child form.
   */
  const handleFieldPayloadChanged = (
    payload: SupportedFormField["payload"]
  ) => {
    // create a new field definition that's consistent with both new type and previous information
    const newFieldDefinition: MultistageFormFieldDefinition = {
      ...fieldDefinition,
      fieldData: {
        type: fieldDefinition.fieldData.type,
        payload: payload,
      } as SupportedFormField,
    };
    // update inner state
    setFieldDefinition(newFieldDefinition);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldDefinitionChanged) {
      onFieldDefinitionChanged(newFieldDefinition);
    }
  }; // handleFieldPayloadChanged

  /**
   * Manage a change in the required status of this field.
   * @param value New required status (boolean)
   */
  const handleFieldRequiredChanged = (value: boolean) => {
    // create a new field definition with the new required status
    const newFieldDefinition: MultistageFormFieldDefinition = {
      ...fieldDefinition,
      required: value,
    };
    // update inner state
    setFieldDefinition(newFieldDefinition);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldDefinitionChanged) {
      onFieldDefinitionChanged(newFieldDefinition);
    }
  }; // handleFieldRequiredChanged

  /**
   * Manage a change in the prompt text for this field
   * @param value New prompt text
   */
  const handlePromptTextChanged = (value: string) => {
    // create a new field definition with the new required status
    const newFieldDefinition: MultistageFormFieldDefinition = {
      ...fieldDefinition,
      promptText: value,
    };
    // update inner state
    setFieldDefinition(newFieldDefinition);
    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onFieldDefinitionChanged) {
      onFieldDefinitionChanged(newFieldDefinition);
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
            {selectedField?.displayName ??
              fieldDefinition.fieldData.type ??
              "Select a field type"}{" "}
            <ExpandDropdownIcon />
            {fieldTypeDropdownOpen && (
              <DropdownMenu>
                {availableMultistageFormItemTypes.map((elem) => (
                  <DropdownMenuItem
                    onClick={() => handleFieldTypeSelected(elem)}
                  >
                    {fieldMappings[elem].iconComponent}
                    {fieldMappings[elem].displayName ?? elem}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
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
        <BottomRow>
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
        </BottomRow>
        {/* Alert in case the card hasnt been filled correctly */}
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> {alertMessage ?? "This item is required."}
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default EditableFieldCard;
