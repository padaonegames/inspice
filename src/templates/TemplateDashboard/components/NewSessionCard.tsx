import styled, { css } from "styled-components";
import { useState } from "react";
import {
  CardPanel,
  DottedLine,
  CardBottomRow,
  InputArea,
  Root,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  HorizontalLine,
} from "../../../components/Forms/Cards/cardStyles";
import { PeopleCommunityAdd } from "@styled-icons/fluentui-system-regular/PeopleCommunityAdd";
import { Cancel } from "@styled-icons/material-outlined/Cancel";

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddSessionIcon = styled(PeopleCommunityAdd)`
  ${fieldTypeIcon}
  color: white;
`;

const CancelSessionIcon = styled(Cancel)`
  ${fieldTypeIcon}
  color: white;
`;

interface ButtonProps {
  enabled?: boolean;
}
const actionButtonStyle = css<ButtonProps>`
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.8em;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
  opacity: 50%;

  ${(props) =>
    props.enabled &&
    `
  opacity: 100%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
  `}
`;

const AddSessionButton = styled.button`
  ${actionButtonStyle}
  background-color: hsl(10, 80%, 80%);
`;

const CancelSessionButton = styled.button`
  ${actionButtonStyle}
  background-color: #c44c49;
`;

export interface NewSessionCardProps {
  /** callback to parent to notify of new session being ready to be submitted to server */
  onSubmitNewSession?: (sessionName: string) => void;
  /** callback to parent to notify of the user wishing to cancel the creation of a new session */
  onCancelSessionCreation?: () => void;
  /** names of the sessions currently in use for current activity (used to keep the user from inputing duplicated names) */
  activitySessionNames: string[];
} // NewSessionCardProps

/** Controlled card component to edit and manage a set of user generated tags */
export const NewSessionCard = (props: NewSessionCardProps): JSX.Element => {
  const { onSubmitNewSession, onCancelSessionCreation, activitySessionNames } =
    props;

  const [sessionName, setSessionName] = useState<string>("");

  const handleSessionNameChangeEvent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSessionName(event.target.value);
  }; // handleSessionNameChangeEvent

  const nameNonEmpty = sessionName.length > 0;
  const nameNotRepeated = activitySessionNames.every(
    (name) => name !== sessionName
  );
  const handleSubmitNewSessionClicked = () => {
    if (onSubmitNewSession && nameNonEmpty && nameNotRepeated) {
      onSubmitNewSession(sessionName);
    }
  }; // handleSubmitNewSessionClicked

  const handleCancelCreateSession = () => {
    if (onCancelSessionCreation) {
      onCancelSessionCreation();
    }
  }; // handleCancelCreateSession

  return (
    <Root>
      <CardPanel requiredAlert={!(nameNonEmpty && nameNotRepeated)}>
        <InputArea
          title="Enter a session name (max. 25 characters including spaces)"
          placeholder="Session Name..."
          height="2.5em"
          maxLength={25}
          width="50%"
          onChange={handleSessionNameChangeEvent}
        />
        <DottedLine />
        <CardBottomRow>
          <CancelSessionButton
            enabled
            title="Cancel session creation"
            onClick={handleCancelCreateSession}
          >
            <CancelSessionIcon />
            Cancel
          </CancelSessionButton>
          <HorizontalLine />
          <AddSessionButton
            enabled={nameNonEmpty && nameNotRepeated}
            title="Create a new session with given name"
            onClick={handleSubmitNewSessionClicked}
          >
            <AddSessionIcon />
            Create Session
          </AddSessionButton>
        </CardBottomRow>
        {!nameNonEmpty && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> Please write a name for your session.
          </RequiredQuestionSpan>
        )}
        {nameNonEmpty && !nameNotRepeated && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> Session name already in use.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default NewSessionCard;
