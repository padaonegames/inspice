import {
  EditableItemProps,
  SessionCodeDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled, { css } from "styled-components";
import { Root } from "./generalItemsStyles";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import CheckBoxGroupInputCard from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";
import { LogInCircle } from "@styled-icons/boxicons-regular/LogInCircle";
import { UserCog } from "styled-icons/fa-solid";
import SessionManagementCard from "../../../../components/Forms/Cards/SessionManagementCard";
import NewSessionCard from "../../../TemplateDashboard/components/NewSessionCard";
import { useState } from "react";
import FormCard from "../../../../components/Forms/Cards/FormCard";

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "6em"};
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${(props) =>
    props.dimBackground ? "#f8f9fa" : "transparent"};
  resize: none;
  overflow-y: hidden;

  text-align: center;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
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
  margin-top: 1em;

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

export const isSessionCodeItemValid = (
  item: SessionCodeDefinition
): boolean => {
  return (
    item.sessions.length > 0 &&
    item.text.length > 0 &&
    item.sessions.every((session) => session.sessionName.length > 0)
  );
}; // isSessionCodeItemValid

export interface EditableSessionCodeItemContentProps
  extends EditableItemProps<SessionCodeDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableSessionCodeItemContentProps

export const EditableSessionCodeItemContent = (
  props: EditableSessionCodeItemContentProps
): JSX.Element => {
  const {
    payload,
    addNewOptionLabel = "Add new text",
    onPayloadChanged,
  } = props;

  const { sessions, text, caseSensitive } = payload;

  const [newSessionOpen, setNewSessionOpen] = useState<boolean>(false);

  const handleEditText = (text: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      text: text,
    });
  }; // handleEditText

  const handleSetCaseSensitive = (value: boolean) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ ...payload, caseSensitive: value });
  }; // handleSetCaseSensitive

  const handleSubmitNewSession = (sessionName: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      sessions: [
        ...sessions,
        { sessionName: sessionName, availableUsernames: [] },
      ],
    });
    setNewSessionOpen(false);
  }; // handleSubmitNewSession

  const handleUsersRequested = (
    sessionName: string,
    requestedUsers: number
  ) => {
    if (!onPayloadChanged) return;

    const index = sessions.findIndex((s) => s.sessionName === sessionName);
    if (index < 0) return;

    const newUsernames = sessions[index].availableUsernames;
    const originalLength = newUsernames.length;

    while (newUsernames.length < originalLength + requestedUsers) {
      const num = "0000" + Math.floor(Math.random() * 10000);
      let checksum = 0;
      for (let i = 0; i < num.length; i++) {
        checksum += parseInt(num[i]) ?? 0;
      }
      const checksumSuffix = "00" + checksum;
      const newUser =
        sessionName +
        num.substring(num.length - 4) +
        checksumSuffix.substring(checksumSuffix.length - 2);
      if (!newUsernames.some((elem) => elem === newUser)) {
        newUsernames.push(newUser);
      }
    }

    onPayloadChanged({
      ...payload,
      sessions: [
        ...sessions.slice(0, index),
        { ...sessions[index], availableUsernames: newUsernames },
        ...sessions.slice(index + 1),
      ],
    });
  }; // handleUsersRequested

  const makeCaseSensitiveKey = "Make codes case-sensitive.";

  return (
    <Root>
      {/* Text to show before entering the code to solve the puzzle */}
      <ShortTextInputCard
        required
        width={1}
        requiredAlert={text.length === 0}
        alertMessage="Please enter a text to show before entering the code."
        promptText="Text to show before entering the code:"
        fieldPayload={{ placeholder: "Enter your text" }}
        response={{ text: text }}
        onResponseChanged={(value) => handleEditText(value.text)}
      />
      <FormCard promptText="Manage your sessions:" addFocusEffect={false}>
        <TemplateContainer>
          {sessions.map((s) => (
            <SessionManagementCard
              key={s.sessionName}
              sessionData={{ ...s, _id: "", activityId: "" }}
              onUsersRequested={(amount) =>
                handleUsersRequested(s.sessionName, amount)
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
              maxLength={2}
              activitySessionNames={sessions.map((s) => s.sessionName)}
              onCancelSessionCreation={() => setNewSessionOpen(false)}
              onSubmitNewSession={handleSubmitNewSession}
            />
          )}
        </TemplateContainer>
      </FormCard>
      <CheckBoxGroupInputCard
        promptText="Additional settings:"
        fieldPayload={{ fields: [makeCaseSensitiveKey] }}
        response={{
          selectedFields: caseSensitive ? [makeCaseSensitiveKey] : [],
        }}
        onResponseChanged={(value) =>
          handleSetCaseSensitive(
            value.selectedFields.includes(makeCaseSensitiveKey)
          )
        }
      />
    </Root>
  );
}; // EditableSessionCodeItemContent

const PreviewBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PreviewTitle = styled.div`
  width: 100%;
  height: 20%;
  color: black;
  text-align: center;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 1.33;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
`;

const SessionIcon = styled(LogInCircle)`
  position: absolute;
  color: rgb(0, 0, 0);
  right: -10%;
  bottom: 10%;
  height: 60%;
  width: 60%;
`;

const PreviewAnswers = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  color: rgb(178, 178, 178);
  overflow: hidden;
`;

const PreviewAnswer = styled.div`
  position: relative;
  width: 100%;
  height: 0.5em;
  margin-bottom: 3px;
  color: white;
  background-color: transparent;
  border: 2px solid #e9e9e9;
  border-radius: 0.125rem;
`;

export const SessionCodeItemStageSlide = (
  props: SessionCodeDefinition
): JSX.Element => {
  const { sessions, text } = props;

  return (
    <PreviewBody>
      <PreviewTitle>{text.length === 0 ? "No Text" : text}</PreviewTitle>
      <PreviewAnswers>
        {[...Array(sessions.length)].map((_, i) => (
          <PreviewAnswer key={i} />
        ))}
      </PreviewAnswers>
      <SessionIcon />
    </PreviewBody>
  );
}; // SessionCodeItemStageSlide

export const sessionCodeItemFactory: AbstractActivityItemFactory<SessionCodeDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableSessionCodeItemContent {...editingProps} />
    ),
    defaultDefinition: {
      sessions: [],
      text: "",
    },
  }; // sessionCodeItemFactory

export default EditableSessionCodeItemContent;
