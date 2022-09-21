import {
  EditableItemProps,
  LoadSceneDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";
import { PromptField } from "./PromptField";

import styled from "styled-components";
import { Unity } from "@styled-icons/fa-brands/Unity";

const UnityIcon = styled(Unity)`
  position: relative;
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`;

const Root = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75em;
  border-radius: 1.25rem;
`;

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

const ItemTitle = styled.div`
  position: relative;
  font-size: 1em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding: 0.75em 1.25em;
  border-bottom: 2px solid rgb(15, 90, 188);
  color: black;
  line-height: 135%;
  width: fit-content;
  text-align: left;
  display: flex;
  align-items: center;
  background-color: rgb(240, 240, 240);
`;

export const EditableLoadSceneItemContent = (
  props: EditableItemProps<LoadSceneDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const handleEditSceneName = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      sceneName: value,
    });
  }; // handleEditSceneName

  return (
    <>
      <Root>
        <ItemTitle>
          Scene to load
          <UnityIcon />
        </ItemTitle>
        {/* Field to edit the name of the scene that the user wants to load with this item */}
        <PromptField
          promptText={payload.sceneName}
          promptPlaceholder="Scene name"
          onPromptChange={handleEditSceneName}
        />
      </Root>
    </>
  );
}; // EditableLoadSceneItemContent

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

const UnityIconPreview = styled(Unity)`
  position: relative;
  margin-top: 0.5rem;
  align-self: center;
  color: rgb(0, 0, 0);
  height: 60%;
`;

export const LoadSceneItemStageSlide = (
  props: LoadSceneDefinition
): JSX.Element => {
  const { sceneName } = props;

  return (
    <>
      <PreviewTitle>
        {sceneName === "" ? "Your scene name" : sceneName}
      </PreviewTitle>
      <UnityIconPreview />
    </>
  );
}; // LoadSceneItemStageSlide

export const loadSceneItemFactory: AbstractActivityItemFactory<LoadSceneDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableLoadSceneItemContent {...editingProps} />
    ),
    defaultDefinition: {
      sceneName: "",
    },
  }; // loadSceneItemFactory

export default EditableLoadSceneItemContent;
