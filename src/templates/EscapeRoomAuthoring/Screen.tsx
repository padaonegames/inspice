import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RadioCircleMarked } from "styled-icons/boxicons-regular";
import { Exit } from "@styled-icons/icomoon/Exit";

// services
import { useAsyncRequest } from '../../services/useAsyncRequest';

// steps
import { CompletedEscapeRoomActivityDefinition, EscapeRoomPuzzleDefinition, EscapeRoomStage, InProgressEscapeRoomActivityDefinition, RoomPuzzle } from '../../services/escapeRoomActivity.model';
import { EscapeRoomStageSlidesContainer } from './components/EscapeRoomStageSlidesContainer';
import EditableStage, { StageMappings } from './components/EditableStage';
import { multipleChoiceItemFactory } from './components/MutipleChoiceItem';
import { stageTypeIcon } from './components/StageSettingsContainer';
import { cloneDeep } from 'lodash';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 Stage Mappings
//-------------------------------------------------------

const MultipleChoiceIcon = styled(RadioCircleMarked)`
  ${stageTypeIcon}
`;

const RoomIcon = styled(Exit)`
  ${stageTypeIcon}
`;

export const stageMappings: StageMappings<EscapeRoomStage> = {
  'room': {
    displayName: 'Room',
    iconComponent: <RoomIcon />,
    editingComponentProducer: () => <></>,
    defaultStagePayload: {
      exitCode: '',
      hints: [],
      puzzles: []
    }
  },
  'multiple-choice': {
    displayName: 'Multiple Choice',
    iconComponent: <MultipleChoiceIcon />,
    editingComponentProducer: multipleChoiceItemFactory.editingComponent,
    defaultStagePayload: multipleChoiceItemFactory.defaultDefinition
  }
}

//-------------------------------------------------------
//                    Defaults
//-------------------------------------------------------

const sample_puzzle: EscapeRoomPuzzleDefinition = {
  entryPoint: {
    type: 'qr-scan',
    text: 'sample QR text'
  },
  type: 'multiple-choice',
  payload: {
    answers: []
  }
};

const sample_stage: EscapeRoomStage = {
  type: 'multiple-choice',
  payload: {
    answers: []
  }
};

const sample_base: InProgressEscapeRoomActivityDefinition = {
  activityType: 'Escape Room',
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  stages: [sample_stage]
};

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

/**
 * Screen to encapsulate the creation flow of a Escape Room activity.
 * Component responsible for handling the information fetching and posting logic; actual
 * rendering of this screen is delegated to the *CreateEscapeRoomActivityScreenComponent* component.
 */
export const CreateEscapeRoomScreen = () => {

  const [completedActivity, setCompletedActivity] = useState<CompletedEscapeRoomActivityDefinition | undefined>(undefined);

  const submitDefinition = async () => {
    if (!completedActivity) return Promise.reject();
    setCompletedActivity(undefined);
    return Promise.reject();
  };

  const [submitDefinitionStatus] = useAsyncRequest(submitDefinition, [completedActivity]);

  useEffect(() => {
    if (submitDefinitionStatus.kind === 'success' /*&& submitDefinitionStatus.result.kind === 'ok'*/) {
      window.alert('Your activity was successfully uploaded to the linked data hub.');
    }
  }, [submitDefinitionStatus]);


  return (
    <CreateEscapeRoomScreenComponent
      initialActivityDefinition={undefined}
    />
  );
}

//-------------------------------------------------------
//                 Escape Room Creation
//-------------------------------------------------------

interface CreateEscapeRoomScreenComponentProps {
  /** Initial state that this component will take as base */
  initialActivityDefinition?: InProgressEscapeRoomActivityDefinition | undefined;
  /** callback to parent notifying of a change within the internal state of this component */
  onActivityDefinitionChanged?: (value: InProgressEscapeRoomActivityDefinition) => void;
  /** callback to parent notifying of activity definition being submitted by the user.
   * Submission does NOT take place within this component. Rather, the action is lifted to
   * the parent so that rendering and communication with the services remain isolated.
   */
  onSubmitActivityDefinition?: (value: CompletedEscapeRoomActivityDefinition) => void;
}

export const CreateEscapeRoomScreenComponent = (props: CreateEscapeRoomScreenComponentProps): JSX.Element => {

  const {
    initialActivityDefinition,
    onActivityDefinitionChanged,
    onSubmitActivityDefinition
  } = props;

  // Initialize internal component state using fields from the provided initialActivityDefinition, if any.
  // Note here that we are adding the minimum necessary fields to have a valid transformation from State into InProgressEscapeRoomActivityDefinition
  // by incorporating the base content from sample_base.
  const [activityDefinition, setActivityDefinition] =
    useState<InProgressEscapeRoomActivityDefinition>(initialActivityDefinition ? { ...sample_base, ...initialActivityDefinition } : { ...sample_base });

  // currently selected stage from activityDefinition.stages
  const [selectedStage, setSelectedStage] = useState<number>(0);
  // currently selected puzzle from activityDefinition.stages[selectedStage].puzzles
  const [selectedPuzzle, setSelectedPuzzle] = useState<number>(0);

  useEffect(() => {
    if (!onActivityDefinitionChanged) return;
    onActivityDefinitionChanged(activityDefinition as unknown as InProgressEscapeRoomActivityDefinition);
  }, [activityDefinition]);

  const handleSubmitActivityDefinition = () => {
    if (!onSubmitActivityDefinition) return;

    const def: CompletedEscapeRoomActivityDefinition = {
      activityType: 'Escape Room',
      activityAuthor: activityDefinition.activityAuthor as string,
      activityTitle: activityDefinition.activityTitle as string,
      description: activityDefinition.description as string,
      beginsOn: activityDefinition.beginsOn as Date,
      endsOn: activityDefinition.endsOn as Date,
      tags: activityDefinition.tags as string[],
      imageSrc: activityDefinition.imageSrc as string,
      stages: activityDefinition.stages
    };

    onSubmitActivityDefinition(def);
  }; // handleSubmitActivityDefinition

  const handleAddStage = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.stages = [...next.stages, sample_stage];
      return next;
    });
  }; // handleAddStage

  const handleAddPuzzle = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      const currentRoom = next.stages[selectedStage];
      // can only add puzzle to room-type stage
      if (currentRoom.type !== 'room') return prev;

      currentRoom.payload.puzzles = [...currentRoom.payload.puzzles, sample_puzzle];
      return next;
    });
  }; // handleAddPuzzle

  const handleDeletePuzzle = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      const currentRoom = next.stages[selectedStage];
      // can only remove puzzle from room-type stage
      if (currentRoom.type !== 'room') return prev;

      currentRoom.payload.puzzles = (currentRoom.payload.puzzles as EscapeRoomPuzzleDefinition[]).filter((_, i) => i !== selectedPuzzle);
      return next;
    });
  }; // handleDeletePuzzle

  const handleDuplicatePuzzle = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      const currentRoom = next.stages[selectedStage];
      // can only duplicate puzzle within room-type stage
      if (currentRoom.type !== 'room') return prev;

      const puzzles: EscapeRoomPuzzleDefinition[] = currentRoom.payload.puzzles;
      currentRoom.payload.puzzles = [
        ...puzzles.slice(0, selectedPuzzle),
        puzzles[selectedPuzzle],
        ...puzzles.slice(selectedPuzzle, puzzles.length)
      ];
      return next;
    });
  }; // handleDuplicatePuzzle

  const handlePuzzleDefinitionChanged = (puzzleDefinition: EscapeRoomPuzzleDefinition) => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      const currentRoom = next.stages[selectedStage];
      // can only change puzzle within room-type stage
      if (currentRoom.type !== 'room') return prev;

      currentRoom.payload.puzzles[selectedPuzzle] = puzzleDefinition;
      return next;
    });
  }; // handlePuzzleDefinitionChanged

  const handleStageDefinitionChanged = (stageDefinition: EscapeRoomStage) => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.stages[selectedStage] = stageDefinition;
      return next;
    });
  }; // handleStageDefinitionChanged

  const handleDeleteStage = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, selectedStage),
        ...next.stages.slice(selectedStage + 1, next.stages.length)
      ];
      return next;
    });
  }; // handleDeleteStage

  const handleDuplicateStage = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, selectedStage),
        next.stages[selectedStage],
        ...next.stages.slice(selectedStage, next.stages.length)
      ];
      return next;
    });
  }; // handleDuplicateStage

  const currentStage = activityDefinition.stages[selectedStage];

  return (
    <Root>
      <EscapeRoomStageSlidesContainer
        stages={activityDefinition.stages}
        selectedStageIndex={selectedStage}
        onAddStage={handleAddStage}
        onSelectStage={(index) => setSelectedStage(index)}
      />
      <EditableStage
        stageDefinition={currentStage}
        stageMappings={stageMappings}
        onStageDefinitionChanged={handleStageDefinitionChanged}
        onStageDeleted={handleDeleteStage}
        onStageDuplicated={handleDuplicateStage}
      />
    </Root>
  );
}

export default CreateEscapeRoomScreen;