import React, { useState } from 'react';
import styled from 'styled-components';
import { StageButtonPanel } from './StageButtonPanel';

import ProgressLine from './ProgressLine';
import { NavigationComponentProps } from './Steps';

const Root = styled.div`
  padding-top: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #F3F3F3;
`;

const UpperRowContainer = styled.div`
  width: 100%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  height: max-content;
  display: inline-flex:
  flex-direction: row;
  align-content: center;
  border-style: solid;
  border-color: darkgrey;
  border-width: 0px 0px 1px 0px;
`;



export interface ActivityCreationOverviewPanelProps extends NavigationComponentProps {
  /**
   * Minimum number of stages to allow when stage adding/removal is enabled.
   */
  minStages?: number;
  /**
   * Maximum number of stages to allow when stage adding/removal is enabled.
   */
  maxStages?: number;
  /**
   * List of available stages to select from. Each entry contains information about the 
   * name of the stage and whether it has already been completed by the user or not.
   * Also specifies if the stage can be removed when clicking on edit stages.
   * Names will be used to display the label for each stage.
   */
  stages: { name: string, completed: boolean, canBeRemoved?: boolean }[];
  /**
   * Caption/label for the last button at the end of the stage sequence, generally used as a submission
   * button for the activity built during the creation process. If not provided, this last button 
   * will not be rendered.
   */
  finaItemCaption?: string;
  /**
   * Caption/label used to add a stage panel button that will be used to add new stages to the panel.
   * Has no effect if enableStageAddition is not active.
   */
  addStagePanelText?: string;
  /**
   * Caption/label used to edit stages panel button that will be used to edit stages in the panel (remove/add/reorder).
   * Has no effect if enableStageAddition is not active.
   */
  editStagesPanelText?: string;
  /**
   * Caption/label used to cancel edit stages panel button that will be used to disable edit mode (remove/add/reorder).
   * Has no effect if enableStageAddition is not active.
   */
  cancelEditStagesPanelText?: string;
  /**
   * Whether stage addition should be allowed for this activity. This determines
   * if the add stage panel is enabled when clicking on edit stages. Disabled by default.
   */
  enableStageAddition?: boolean;
  /**
   * Whether stage removal should be allowed for this activity. This determines
   * if the remove stage icons are enabled when clicking on edit stages. Disabled by default.
   */
  enableStageRemoval?: boolean;
  /**
   * Callback to notify parent component about the activity being submitted (submit button clicked).
   */
  onSubmitActivity?: () => void;
  /**
   * Callback to notify parent component about a specific stage being selected (by index).
   */
  onStageSelected?: (index: number) => void;
  /**
   * Callback to notify parent component about the user trying to add a new stage to the activity.
   */
  onAddNewStage?: () => void;
  /**
   * Callback to notify parent component about the user trying to remove a stage from the activity (by index).
   */
  onRemoveStage?: (index: number) => void;
};

/** Panel to display the current state of an activity creation flow/form and handle stage editing, addition and removal, as well as activity submission */
export const ActivityCreationOverviewPanel = (props : ActivityCreationOverviewPanelProps): JSX.Element => {

  const {
    minStages,
    maxStages,
    stages,
    finaItemCaption,
    addStagePanelText,
    editStagesPanelText,
    cancelEditStagesPanelText,
    enableStageAddition = false,
    enableStageRemoval = false,
    onSubmitActivity,
    onStageSelected,
    onAddNewStage,
    onRemoveStage
  } = props;

  // enable edition if addition is enabled or if any item can be removed.
  const editStagesEnabled = enableStageAddition || stages.some(elem => elem.canBeRemoved);

  // whether we are in edit mode
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <Root>
      <UpperRowContainer>
        <ProgressLine
          currentItem={props.currentStep}
          items={stages}
          onItemSelected={(index) => {
            props.jump(index);
            if (onStageSelected)
              onStageSelected(index);
          }}
          onSubmit={onSubmitActivity}
          onRemoveItem={onRemoveStage}
          finalItemCaption={finaItemCaption}
          removalAllowed={!minStages || minStages < stages.reduce((prev, curr) => prev + (curr.canBeRemoved ? 1 : 0), 0)}
          editing={editing}
        />
        {!editing && editStagesEnabled && (
          <StageButtonPanel
            panelIconType='edit'
            panelText={editStagesPanelText}
            enabled={!maxStages || stages.length < maxStages}
            onButtonClicked={() => setEditing(true)}
          />
        )}
        {editing && enableStageAddition && (
          <StageButtonPanel
            panelIconType='add'
            panelText={addStagePanelText}
            enabled={!maxStages || stages.length < maxStages}
            onButtonClicked={onAddNewStage}
          />
        )}
        {editing && editStagesEnabled && (
          <StageButtonPanel
            panelIconType='cancel'
            panelText={cancelEditStagesPanelText}
            enabled={!maxStages || stages.length < maxStages}
            onButtonClicked={() => setEditing(false)}
          />
        )}
      </UpperRowContainer>
    </Root>
  );
}

export default ActivityCreationOverviewPanel;