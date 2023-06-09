import {
  EditableItemProps,
  LoadSceneDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled from "styled-components";
import { Unity } from "@styled-icons/fa-brands/Unity";
import { Root } from "./generalItemsStyles";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";

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
    <Root>
      <ShortTextInputCard
        fieldPayload={{ placeholder: "Scene name" }}
        response={{ text: payload.sceneName }}
        promptText="Scene to Load"
        onResponseChanged={(value) => handleEditSceneName(value.text)}
      />
    </Root>
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
