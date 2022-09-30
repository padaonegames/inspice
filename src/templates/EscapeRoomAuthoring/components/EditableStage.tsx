import styled from "styled-components";
import StepTitleCard from "../../../components/Forms/Cards/StepTitleCard";
import {
  AvailableEscapeRoomStageType,
  EditableItemProps,
  SupportedStage,
} from "../../../services/escapeRoomActivity.model";
import { Root } from "./items/generalItemsStyles";
import { StageSettingsContainer } from "./StageSettingsContainer";

const ContentWrapper = styled.main`
  position: fixed;
  left: 0;
  height: 100%;
  width: 97.5%;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  margin: 0px;
  padding: 0px;
  border: 0px none;
  font: inherit;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
`;

const ContentBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgb(242, 242, 241) none repeat scroll 0% 0%;
  flex: 1 1 calc(100% + clamp(-96px, -4vmin, -32px));
  padding: 48px clamp(16px, 2vmin, 48px);
  height: 100%;
  margin-left: 12rem;
`;

export interface EditableStageComponentProps {
  /** What type of question/ stage this is representing (type must be consistent with stageMappings' name values) */
  stageDefinition?: SupportedStage;
  /** What mappings we are working with in this editable stage (available stage types and how to render them) */
  stageMappings: StageMappings<SupportedStage>;
  /** Callback notifying of stage type changing to a new format */
  onStageTypeChanged?: (value: string) => void;
  /** Callback notifying parent of stage changing */
  onStageDefinitionChanged?: (value: SupportedStage) => void;
  /** Callback notifying parent component of user wanting to delete this stage */
  onStageDeleted?: () => void;
  /** Callback notifying parent component of user wanting to duplicate this stage */
  onStageDuplicated?: () => void;
}

export type StageMappings<T extends SupportedStage> = {
  /** What type of stage we are working with here*/
  [P in T["type"]]: {
    /** How to render this option within a list. Defaults to stageType */
    displayName?: string;
    /** What component to place next to the display name */
    iconComponent?: JSX.Element;
    /** Generation logic to use to create a form editing component */
    editingComponentProducer: (
      editingFormProps: EditableItemProps<Extract<T, { type: P }>["payload"]>
    ) => JSX.Element;
    /** Default value for StagePayload */
    defaultStagePayload: Extract<T, { type: P }>["payload"];
  };
};

/**
 * Editable version of StepTitleCard for form editing
 */
export const EditableStageComponent = (
  props: EditableStageComponentProps
): JSX.Element => {
  const {
    stageDefinition,
    stageMappings,
    onStageTypeChanged,
    onStageDefinitionChanged,
    onStageDeleted,
    onStageDuplicated,
  } = props;

  if (!stageDefinition) return <></>;

  /**
   * Manage the selection of a new stage type from the dropdown
   * and notify parent component about the change, assuming that
   * a fitting onStageTypeChanged callback has been provided.
   * @param value New stage type selected by the user.
   */
  const handleStageTypeSelected = (value: AvailableEscapeRoomStageType) => {
    // create a new stage definition that's consistent with both new type and previous information
    const payload = stageMappings[value].defaultStagePayload;

    // NOTE: This might look like unsafe type cohertion but it is actually correct in that
    // regardless of the value of value, payload will always be consistent due to the way in which
    // the stageMappings are defined (Accessing by a key will always return consistent typings).
    const newStageDefinition = {
      ...stageDefinition,
      type: value,
      payload: payload,
    } as SupportedStage;

    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onStageTypeChanged) {
      onStageTypeChanged(value);
    }
    if (onStageDefinitionChanged) {
      onStageDefinitionChanged(newStageDefinition);
    }
  }; // handleStageTypeSelected

  /**
   * Manage any change from child stageForm components over their
   * own stage payloads to keep the results consistent with general
   * editing card and notify parent component about the change, assuming that
   * a fitting onStageDefinitionChanged callback has been provided.
   * @param payload New stage definition payload after a change within the currently active child form.
   */
  const handleStagePayloadChanged = (payload: SupportedStage["payload"]) => {
    // create a new stage definition that's consistent with both new type and previous information
    const newStageDefinition = {
      ...stageDefinition,
      payload: payload,
    } as SupportedStage;

    // and notify parent component about the change, if callbacks have been provided for that purpose
    if (onStageDefinitionChanged) {
      onStageDefinitionChanged(newStageDefinition);
    }
  }; // handleStagePayloadChanged

  const selectedStage = stageMappings[stageDefinition.type];

  const renderedContent = () => {
    const content = selectedStage.editingComponentProducer({
      payload: stageDefinition.payload as any,
      onPayloadChanged: handleStagePayloadChanged,
    });
    if (stageDefinition.type === "room") {
      return content;
    } else
      return (
        <Root>
          <StepTitleCard
            stepTitle={
              `${selectedStage.displayName} stage` ?? "Stage Configuration"
            }
          >
            {content}
          </StepTitleCard>
        </Root>
      );
  };

  return (
    <ContentWrapper>
      <Content>
        <ContentBackground>{renderedContent()}</ContentBackground>
        <StageSettingsContainer
          stageMappings={stageMappings}
          selectedStageType={stageDefinition.type}
          onStageTypeChanged={handleStageTypeSelected}
          onStageDeleted={onStageDeleted}
          onStageDuplicated={onStageDuplicated}
        />
      </Content>
    </ContentWrapper>
  );
}; // EditableStageComponent

export default EditableStageComponent;
