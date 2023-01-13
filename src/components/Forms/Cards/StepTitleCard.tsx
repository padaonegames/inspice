import styled, { css } from "styled-components";
import { StoryDisplayActionButton } from "../../../templates/GamGame/components/generalStyles";
import {
  Root,
  TitleColor,
  TitleText,
  StepDescription,
  EditableTitleText,
  EditableStepDescription,
  RequiredAlertIcon,
  RequiredQuestionSpan,
} from "./cardStyles";

import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";
import { useEffect, useState } from "react";
import React from "react";

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

interface OptionIconProps {
  selected: boolean;
}
const OptionsIcon = styled(ThreeDotsVertical)<OptionIconProps>`
  ${fieldTypeIcon}
  position:absolute;
  right: 0%;
  margin-right: 0.25em;
  // bottom: 50%;
  top: 5px;
  // transform: translate(0%, 50%);
  border-radius: 100%;
  padding: 0.25rem;
  color: rgb(255, 255, 255);
  background-color: rgba(
    156,
    56,
    56,
    ${(props) => (props.selected ? "1" : "0")}
  );
  &:hover {
    background-color: rgb(156, 56, 56);
    cursor: pointer;
  }
`;

interface CardPanelProps {
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}
export const CardPanel = styled.div<CardPanelProps>`
  padding: 16px 16px 24px 16px;
  background-color: ${(props) => props.theme.cardBackground};
  ${(props) => !props.requiredAlert && "border: 1px solid #dadce0;"}
  ${(props) => props.requiredAlert && "border: 1px solid #c44c49;"}
  border-radius: 0 0 8px 8px;
  width: 100%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  position: relative;

  &:focus {
    outline: none !important;
    border-left: 6px solid #c44c49;
  }
  &:focus-within {
    border-left: 6px solid #c44c49;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25em;
`;

export const StepTopInfo = styled.div`
  position: relative;
  left: 15px;
  width: 30%;
  height: 40px;
  border-radius: 8px 8px 0 0;
  background-color: #c44c49;

  display: flex;
  flex-direction: row;
  align-items: left;

  font-size: 1.25em;
  color: rgb(255, 255, 255);
  padding-left: 20px;
  padding-top: 10px;
  // font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
`;

export const SelectFieldTypeDropdownButton = styled.span`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

  position: relative;
  height: 2.5em;
  width: 2rem;
  bottom: 10px;

  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.1rem 0px;
  border: 1px solid #dadce0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  top: 2.5em;
  background-color: ${(props) => props.theme.cardBackground};
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
    cursor: pointer;
  }
`;

export interface StepTitleCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Step's title. */
  stepTitle: string;
  /** Short description of what needs to be done within the step. */
  stepDescription?: string;
  /** Whether to enable action button at the top of the card. */
  enableAction?: boolean;
  /** Name of the action to be performed. If not specified, no action will be available (button won't be rendered). */
  actionName?: string;
  /** Callback to parent component indicating that the action has been requested by the user. */
  onActionCliked?: () => void;
  children?: React.ReactNode;
}

/**
 * Primary card component to display a form step's title and description.
 */
export const StepTitleCard = (props: StepTitleCardProps): JSX.Element => {
  const {
    stepTitle,
    stepDescription,
    actionName,
    enableAction = true,
    onActionCliked,
    children,
  } = props;

  useEffect(() => {}, []); // useEffect

  return (
    <Root {...props}>
      <TitleColor />
      <CardPanel>
        <HeaderRow>
          <TitleText>{stepTitle}</TitleText>
          {actionName && (
            <StoryDisplayActionButton
              onClick={onActionCliked}
              enabled={enableAction}
            >
              {actionName}
            </StoryDisplayActionButton>
          )}
        </HeaderRow>
        {stepDescription?.split("\n").map((i, key) => {
          return <StepDescription key={key}>{i}</StepDescription>;
        })}
        {children}
      </CardPanel>
    </Root>
  );
};

export interface EditableStepTitleCardProps {
  /** Step's title. */
  stepTitle: string;
  /** callback notifying of title being changed by the user */
  onTitleChanged?: (value: string) => void;
  /** Short description of what needs to be done within the step */
  stepDescription?: string;
  /** Callback notifying of description being changed by the user */
  onDescriptionChanged?: (value: string) => void;
  /** Placeholder for this card's title */
  titlePlaceholder?: string;
  /** Placeholder for this card's description */
  descriptionPlaceholder?: string;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** alert message to be displayed when required alert is set to true */
  alertMessage?: string;
  /** Callback notifying parent component of card getting the focus */
  onCardFocused?: () => void;
  /** Callback notifying parent component of card losing the focus */
  onCardLostFocus?: () => void;
  /** Callback notifying parent component of mouse entered this component */
  onMouseEntered?: () => void;
  /** Position of the stage this card represents inside the activity */
  position?: number;
  /** Callback notifying parent component that the user wants to move this stage upwards within the activity stages */
  onStageMovedUp?: () => void;
  /** Callback notifying parent component that the user wants to move this stage downwards within the activity stages */
  onStageMovedDown?: () => void;
  /** Callback notifying parent component that the user wants to delete this stage */
  onStageDeleted?: () => void;
}

/**
 * Editable version of StepTitleCard for form editing
 */
export const EditableStepTitleCard = (
  props: EditableStepTitleCardProps
): JSX.Element => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const options = ["Move Stage Up", "Move Stage Down", "Delete Stage"];

  const {
    stepTitle,
    stepDescription,
    titlePlaceholder = "Enter a title for this card...",
    descriptionPlaceholder = "Enter a description for this card...",
    requiredAlert,
    alertMessage,
    position = 0,
    onTitleChanged,
    onDescriptionChanged,
    onCardFocused,
    onCardLostFocus,
    onMouseEntered,
    onStageMovedDown,
    onStageMovedUp,
    onStageDeleted,
  } = props;

  const handleOptionSelected = (optionSelected: string) => {
    switch (optionSelected) {
      case "Move Stage Up":
        if (onStageMovedUp) onStageMovedUp();
        break;
      case "Move Stage Down":
        if (onStageMovedDown) onStageMovedDown();
        break;
      case "Delete Stage":
        if (onStageDeleted) onStageDeleted();
        break;
    }
    setShowOptions(false);
  }; // handleOptionSelected

  return (
    <Root>
      <StepTopInfo>
        Stage {position ? position + 1 : 1}
        <OptionsIcon
          selected={showOptions}
          onMouseDown={() => {
            setShowOptions((prev) => !prev);
          }}
        />
        {showOptions && (
          <DropdownMenu>
            {options.map((elem) => (
              <DropdownMenuItem
                key={elem}
                onClick={() => {
                  handleOptionSelected(elem);
                }}
              >
                {" "}
                {elem}{" "}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        )}
      </StepTopInfo>

      <TitleColor />
      <CardPanel
        requiredAlert={requiredAlert}
        onMouseEnter={onMouseEntered}
        onFocus={onCardFocused}
        onBlur={onCardLostFocus}
      >
        <HeaderRow>
          <EditableTitleText
            placeholder={titlePlaceholder}
            maxLength={150}
            value={stepTitle}
            onChange={(event) => {
              if (onTitleChanged) onTitleChanged(event.target.value);
            }}
          />
        </HeaderRow>
        <EditableStepDescription
          placeholder={descriptionPlaceholder}
          maxLength={5000}
          value={stepDescription}
          onChange={(event) => {
            if (onDescriptionChanged) onDescriptionChanged(event.target.value);
          }}
        />
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> {alertMessage ?? "This item is required."}
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default StepTitleCard;
