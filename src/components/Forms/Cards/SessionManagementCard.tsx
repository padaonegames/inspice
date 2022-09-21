import { ActivitySession } from "../../../services/activity.model";
import {
  Root,
  CardPanel,
  PromptText,
  TagsContainer,
  TagText,
  TagWrapper,
  CardBottomRow,
  DottedLine,
  HorizontalLine,
} from "./cardStyles";

import { ArrowDownload } from "@styled-icons/fluentui-system-filled/ArrowDownload";
import { UserPlus } from "@styled-icons/boxicons-regular/UserPlus";
import styled, { css } from "styled-components";
import { IntegerCounter } from "./IntegerCounter";
import { useState } from "react";

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const DownloadIcon = styled(ArrowDownload)`
  ${fieldTypeIcon}
  cursor: pointer;
`;

const AddUsersIcon = styled(UserPlus)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

const AddUsersButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.8em;
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
`;

const LeftFloatedBottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1em;
`;

export interface SessionManagementCardProps {
  /** data associated with given session */
  sessionData: ActivitySession;
  /** callback to parent to notify of user requesting the addition of N new users to the session */
  onUsersRequested?: (usernameAmount: number) => void;
} // SessionManagementCardProps

/** Controlled card component to edit and manage a set of user generated tags */
export const SessionManagementCard = (
  props: SessionManagementCardProps
): JSX.Element => {
  const { sessionData, onUsersRequested } = props;

  const [usersToAdd, setUsersToAdd] = useState<number | undefined>(0);

  const handleIntegerCounterChanged = (value: number | undefined) => {
    setUsersToAdd(value);
  }; // handleIntegerCounterChanged

  const handleAddUsers = () => {
    if (!onUsersRequested || !usersToAdd || usersToAdd <= 0) return;
    onUsersRequested(usersToAdd);
  }; // handleAddUsers

  const handleDownloadSessionDataAsCsv = () => {
    const content = sessionData.availableUsernames.reduce(
      (prev, curr) => `${prev}\n${curr}`
    );
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:attachment/text," + encodeURI(content);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${sessionData.sessionName}.csv`;
    hiddenElement.click();
    hiddenElement.remove();
  }; // handleDownloadSessionDataAsCsv

  return (
    <Root>
      <CardPanel>
        <PromptText>{sessionData.sessionName}</PromptText>
        <DottedLine />
        <TagsContainer>
          {sessionData.availableUsernames.map((username) => (
            <TagWrapper key={username}>
              <TagText>{username}</TagText>
            </TagWrapper>
          ))}
        </TagsContainer>
        <DottedLine />
        <CardBottomRow>
          <LeftFloatedBottomContent>
            <CounterContainer>
              <IntegerCounter
                value={usersToAdd}
                minimum={0}
                maximum={1000}
                onValueChanged={handleIntegerCounterChanged}
              />
            </CounterContainer>
            <AddUsersButton
              disabled={!usersToAdd || usersToAdd <= 0}
              title="Add users to session"
              onClick={handleAddUsers}
            >
              <AddUsersIcon />
              Add Users
            </AddUsersButton>
          </LeftFloatedBottomContent>
          <HorizontalLine />
          <DownloadIcon
            title="Download usernames as CSV"
            onClick={handleDownloadSessionDataAsCsv}
          />
        </CardBottomRow>
      </CardPanel>
    </Root>
  );
};

export default SessionManagementCard;
