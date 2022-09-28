import styled, { css } from "styled-components";
import { SupportedStage } from "../../../services/escapeRoomActivity.model";
import {
  EscapeRoomStageSlide,
  EscapeRoomStageSlideProps,
} from "./EscapeRoomEditorSlide";
import { EscapeRoomSettingsStageSlide } from "./items/EscapeRoomSettings";
import { Plus } from "styled-icons/bootstrap";

const Root = styled.div`
  position: fixed;
  left: 0;
  z-index: 101;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  bottom: unset;
  width: 12rem;
  height: 100%;
  border-right: 0px solid rgb(19, 104, 206);
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px 0px;
  padding-top: 0;
`;

const SlidesContainer = styled.div`
  position: relative;
  height: 72.5%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  overflow-y: auto; //scroll to always show
  overflow-x: hidden;
  margin: 0px 0px;
  scrollbar-gutter: stable;
  ::-webkit-scrollbar {
    width: 8px;
    z-index: 1000;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: start;
  justify-content: flex-start;
  min-width: 100%;
  padding: 0 0.75rem 0.75rem 0.75rem;
  z-index: 9999;
  box-shadow: 0px 0px 10px 0px #000000;
`;

const AddItemButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  transition: all 0.2s ease 0s;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AddItemButton = styled.button`
  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.contentFontSize};
  cursor: pointer;
  background-color: hsl(10, 80%, 80%);
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: fit-content;
  padding: 0.4em 0.85em 0.4em 0.6em;
  color: white;
  width: fit-content;
  margin: auto;
`;

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddItemIcon = styled(Plus)`
  ${fieldTypeIcon}
  cursor: pointer;
  color: white;
`;

export type StageToSlideProducerMapping<T extends SupportedStage> = {
  /** What type of stage we are working with here*/
  [P in T["type"]]:
    | ((slidePreviewProps: Extract<T, { type: P }>["payload"]) => JSX.Element)
    | undefined;
};

export interface EscapeRoomStageSlidesContainerProps {
  escapeRoomTitle?: string;
  /** list of stages currently included in the activity */
  stages: SupportedStage[];
  /** index of currently selected stage in stages */
  selectedStageIndex: number;
  /** What  mappings we are working with in this slides list (available stage types and how to render their previews) */
  stageMappings: StageToSlideProducerMapping<SupportedStage>;
  /** Callback to parent component specifying that user wishes to add a new stage to the activity */
  onAddStage?: () => void;
  /** Callback to parent component specifying that user wishes to select a given stage from the activity */
  onSelectStage?: (index: number) => void;

  handleDuplicateStage?: (index: number) => void;
  handleDeleteStage?: (index: number) => void;

  handleGoToSettings: () => void;
} // EscapeRoomStageSlidesContainerProps

export const EscapeRoomStageSlidesContainer = (
  props: EscapeRoomStageSlidesContainerProps
): JSX.Element => {
  const {
    escapeRoomTitle = "No title asigned",
    stages,
    selectedStageIndex,
    stageMappings,
    onAddStage,
    onSelectStage,
    handleDuplicateStage,
    handleDeleteStage,
    handleGoToSettings,
  } = props;

  const handleSelectStage = (index: number) => {
    if (onSelectStage) {
      onSelectStage(index);
    }
  }; // handleSelectStage

  return (
    <Root>
      <EscapeRoomSettingsStageSlide
        title={escapeRoomTitle}
        goToSettings={handleGoToSettings}
      ></EscapeRoomSettingsStageSlide>
      <SlidesContainer>
        {stages.map((s, i) => {
          // This is "unsafe", but in reality due to how stageMappings is defined
          // it will never really be problematic (s and stageMappings[s.type] are forcefully consistent)
          const slideProps = {
            selected: i == selectedStageIndex,
            stage: s,
            slidePreviewProducer: stageMappings[s.type],
            onSlideSelected: () => handleSelectStage(i),

            index: i,
            duplicateStage: handleDuplicateStage,
            deleteStage: handleDeleteStage,
          } as EscapeRoomStageSlideProps;

          return (
            <EscapeRoomStageSlide key={s.type + "_" + i} {...slideProps} />
          );
        })}
      </SlidesContainer>
      <ButtonsContainer>
        <AddItemButtonContainer>
          <AddItemButton onClick={onAddStage}>
            <AddItemIcon />
            Add Stage
          </AddItemButton>
        </AddItemButtonContainer>
      </ButtonsContainer>
    </Root>
  );
}; // EscapeRoomStageSlidesContainer
