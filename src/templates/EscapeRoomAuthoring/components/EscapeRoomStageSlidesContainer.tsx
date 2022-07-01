import styled from "styled-components";
import { SupportedStage } from "../../../services/escapeRoomActivity.model";
import { EscapeRoomStageSlide, EscapeRoomStageSlideProps } from "./EscapeRoomEditorSlide";
import { EscapeRoomSettings, EscapeRoomSettingsStageSlide } from "./items/EscapeRoomSettings";


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
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  padding-top: 0;
`;

const SlidesContainer = styled.div`
  display: block;
  position: relative;
  z-index: 4;
  height: 67%; //80%
  width: 100%;
  overflow-y: auto;
  margin: 0px 0px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: start;
  justify-content: flex-start;
  min-width: 100%;
  padding: 0px 1.5rem 1.5rem 1.5rem;
  position: absolute;
  bottom: 0;
  z-index: 9999;
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
  width: 100%;
  margin: 0px;
  border: 0px none;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset;

  background: rgb(19, 104, 206) none repeat scroll 0% 0%;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;

  font-family: ${props => props.theme.contentFont};
  text-align: center;
  text-decoration: none;
  min-width: 42px;
  min-height: 42px;
  padding: 0px 16px 4px;
  position: relative;

  transition: all 0s;
  &:hover {
    transition: all 0s;
    min-height: 40px;
    margin-top: 2px;
    padding-bottom: 2px;
    background-color: rgb(18, 96, 190);
    box-shadow: rgba(0, 0, 0, 0.25) 0px -2px inset;
  }
`;

export type StageToSlideProducerMapping<T extends SupportedStage> = {
  /** What type of stage we are working with here*/
  [P in T['type']]: ((slidePreviewProps: Extract<T, { type: P }>['payload']) => JSX.Element) | undefined;
}

export interface EscapeRoomStageSlidesContainerProps {

  escapeRoomTitle?:string
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

export const EscapeRoomStageSlidesContainer = (props: EscapeRoomStageSlidesContainerProps): JSX.Element => {

  const {
    escapeRoomTitle="No title asigned",
    stages,
    selectedStageIndex,
    stageMappings,
    onAddStage,
    onSelectStage,
    handleDuplicateStage,
    handleDeleteStage,
    handleGoToSettings
  } = props;

  const handleSelectStage = (index: number) => {
    if (onSelectStage) {
      onSelectStage(index);
    }
  }; // handleSelectStage

  return (
    <Root>
      <EscapeRoomSettingsStageSlide title={escapeRoomTitle} goToSettings={handleGoToSettings}></EscapeRoomSettingsStageSlide>
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
            deleteStage: handleDeleteStage
          } as EscapeRoomStageSlideProps;

          return (
            <EscapeRoomStageSlide
              key={s.type + '_' + i}
              {...slideProps}
            />
          );
        })}
      </SlidesContainer>
      <ButtonsContainer>
        <AddItemButtonContainer>
          <AddItemButton onClick={onAddStage}>Add Stage</AddItemButton>
        </AddItemButtonContainer>
      </ButtonsContainer>
    </Root>
  );
}; // EscapeRoomStageSlidesContainer