import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { Close } from "@styled-icons/evaicons-solid/Close";
import SessionManagementCard from "../../../components/Forms/Cards/SessionManagementCard";
import { activityService } from "../../../services";
import { useAsyncRequest } from "../../../services/useAsyncRequest";
import { useState } from "react";
import NewSessionCard from "./NewSessionCard";
import { UserCog } from "styled-icons/fa-solid";

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
`;

const Root = styled.div`
  width: 75vw;
  height: 80vh;
  margin-top: 15vh;
  margin-left: 12.5vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background-color: ${(props) => props.theme.bodyBackground};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  // border: solid 1px ${(props) => props.theme.textColor};
  z-index: 5;
`;

const CloseIcon = styled(Close)`
  cursor: pointer;
  top: 1%;
  right: 12px;
  height: 50px;
  transform: scale(0.5);
  position: absolute;
  color: ${(props) => props.theme.textColor};
  &:hover {
    transform: scale(0.7);
  }
`;

const TitleText = styled.div`
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.headerBackground};
  text-align: center;
  color: ${(props) => props.theme.textColor};
  width: 100%;
  height: 12.5%;
  align-self: center;
  letter-spacing: +0.5px;
  font-family: Raleway;
  font-size: 1.05rem;
  border-radius: 10px 10px 0 0;
`;

const TemplateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  -moz-box-pack: center;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0;
  overflow-y: auto;
`;

const AddSessionButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.8em;
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3.5em;
  padding: 0 2em;
  color: white;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
`;

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddUsersIcon = styled(UserCog)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

export interface ActivitySessionsPopupProps {
  /** ID of the activity whose sessions we are managing within this component */
  activityId: string;
  /** Callback to notify the parent if the user has closed the pop-up. */
  onPopupClose?: () => void;
} // ActivitySessionsPopupProps

export const ActivitySessionsPopup = (
  props: ActivitySessionsPopupProps
): JSX.Element => {
  const { onPopupClose, activityId } = props;

  const [selectedSessionId, setSelectedSessionId] =
    useState<string | undefined>(undefined);
  const [selectedUsernameQuantity, setSelectedUsernameQuantity] =
    useState<number | undefined>(undefined);
  // whether we've clicked on the new session button
  const [newSessionOpen, setNewSessionOpen] = useState<boolean>(false);

  const fetchActivitySessions = async () => {
    return activityService.getSessionDefinitionsByActivityId(activityId);
  }; // fetchActivitySessions

  const [fetchActivitySessionRequest, triggerFetchActivitySessions] =
    useAsyncRequest(fetchActivitySessions, []);

  const requestUsers = async () => {
    if (!selectedSessionId || selectedUsernameQuantity === undefined)
      return Promise.reject();
    await activityService.requestUsernamesForSessionWithId(
      selectedSessionId,
      selectedUsernameQuantity
    );
    setSelectedSessionId(undefined);
    setSelectedUsernameQuantity(undefined);
    triggerFetchActivitySessions();
  }; // requestUsers

  const [requestUsersRequest] = useAsyncRequest(
    requestUsers,
    [selectedSessionId],
    false
  );

  const handleUsersRequested = (sessionId: string, usernameAmount: number) => {
    setSelectedUsernameQuantity(usernameAmount);
    setSelectedSessionId(sessionId);
  }; // handleUsersRequested

  if (
    fetchActivitySessionRequest.kind === "success" &&
    fetchActivitySessionRequest.result.kind === "ok"
  ) {
    const sessions = fetchActivitySessionRequest.result.data;
    return ReactDOM.createPortal(
      <>
        <Background onClick={onPopupClose} />
        <Root>
          <TitleText>Manage activity's sessions and usernames</TitleText>
          <CloseIcon onClick={onPopupClose} />
          <TemplateContainer>
            {sessions.map((s) => (
              <SessionManagementCard
                sessionData={s}
                onUsersRequested={(amount) =>
                  handleUsersRequested(s._id, amount)
                }
              />
            ))}
            {!newSessionOpen && (
              <AddSessionButton onClick={() => setNewSessionOpen(true)}>
                <AddUsersIcon />
                Add New Session
              </AddSessionButton>
            )}
            {newSessionOpen && (
              <NewSessionCard
                activitySessionNames={sessions.map((s) => s.sessionName)}
                onCancelSessionCreation={() => setNewSessionOpen(false)}
              />
            )}
          </TemplateContainer>
        </Root>
      </>,
      document.body
    );
  }

  return <></>;
};

export default ActivitySessionsPopup;
