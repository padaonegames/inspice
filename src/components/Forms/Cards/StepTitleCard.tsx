import styled from "styled-components";
import { StoryDisplayActionButton } from "../../../templates/GamGame/components/generalStyles";
import {
  Root,
  TitleColor,
  TitleText,
  StepDescription,
  EditableTitleText,
  EditableStepDescription,
  RequiredAlertIcon,
  RequiredQuestionSpan
} from "./cardStyles";


interface CardPanelProps {
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}
export const CardPanel = styled.div<CardPanelProps>`
  padding: 16px 16px 24px 16px;
  background-color: ${props => props.theme.cardBackground};
  ${props => !props.requiredAlert && 'border: 1px solid #dadce0;'}
  ${props => props.requiredAlert && 'border: 1px solid #c44c49;'}
  border-radius: 0 0 8px 8px;
  width: 100%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25em;
`;

export interface StepTitleCardProps {
  /** Step's title. */
  stepTitle: string;
  /** Short description of what needs to be done within the step */
  stepDescription?: string;
  /** whether to enable action button at the top of the card */
  enableAction?: boolean;
  /** Name of the action to be performed. If not specified, no action will be available (button won't be rendered) */
  actionName?: string;
  /** callback to parent component indicating that the action has been requested by the user */
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
    children
  } = props;

  return (
    <Root>
      <TitleColor />
      <CardPanel>
        <HeaderRow>
          <TitleText>
            {stepTitle}
          </TitleText>
          {actionName && (
            <StoryDisplayActionButton
              onClick={onActionCliked}
              enabled={enableAction}
            >
              {actionName}
            </StoryDisplayActionButton>
          )}

        </HeaderRow>
        {stepDescription?.split('\n').map((i, key) => {
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
}

/**
 * Editable version of StepTitleCard for form editing
 */
export const EditableStepTitleCard = (props: EditableStepTitleCardProps): JSX.Element => {

  const {
    stepTitle,
    stepDescription,
    titlePlaceholder = 'Enter a title for this card...',
    descriptionPlaceholder = 'Enter a description for this card...',
    onTitleChanged,
    onDescriptionChanged,
    requiredAlert,
    alertMessage
  } = props;

  return (
    <Root>
      <TitleColor />
      <CardPanel requiredAlert={requiredAlert}>
        <HeaderRow>
          <EditableTitleText
            placeholder={titlePlaceholder}
            maxLength={150}
            value={stepTitle}
            onChange={event => {
              if (onTitleChanged) onTitleChanged(event.target.value);
            }}
          />
        </HeaderRow>
        <EditableStepDescription
          placeholder={descriptionPlaceholder}
          maxLength={5000}
          value={stepDescription}
          onChange={event => {
            if (onDescriptionChanged) onDescriptionChanged(event.target.value);
          }}
        />
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> {alertMessage ?? 'This item is required.'}
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default StepTitleCard;