import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RadioCircleMarked } from "styled-icons/boxicons-regular";

// navigation
import { ActivityCreationOverviewPanel, ActivityCreationOverviewPanelProps } from '../../components/Navigation/ActivityCreationOverviewPanel';

// services
import { useAsyncRequest } from '../../services/useAsyncRequest';

// steps
import { State } from '../../components/Navigation/Steps';
import { CompletedEscapeRoomActivityDefinition, EscapeRoomPuzzleDefinition, InProgressEscapeRoomActivityDefinition, RoomDefinition, RoomPuzzle } from '../../services/escapeRoomActivity.model';
import { PuzzleSlidesContainer } from './components/PuzzleSlidesContainer';
import EditablePuzzle, { PuzzleMapping } from './components/EditablePuzzle';
import { multipleChoicePuzzleFactory } from './components/MutipleChoicePuzzle';
import { puzzleTypeIcon } from './components/PuzzleSettingsContainer';
import { cloneDeep } from 'lodash';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const MultipleChoiceIcon = styled(RadioCircleMarked)`
  ${puzzleTypeIcon}
`;

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

const sample_puzzle: EscapeRoomPuzzleDefinition = {
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
  rooms: [{
    exitCode: '',
    hints: [],
    puzzles: [sample_puzzle]
  }]
};

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

  // currently selected room from activityDefinition.rooms
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  // currently selected puzzle from activityDefinition.rooms[selectedRoom].puzzles
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
      rooms: activityDefinition.rooms as RoomDefinition[]
    };

    onSubmitActivityDefinition(def);
  }; // handleSubmitActivityDefinition

  const handleAddPuzzle = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.rooms[selectedRoom].puzzles = [...next.rooms[selectedRoom].puzzles, sample_puzzle];
      return next;
    });
  }; // handleAddPuzzle

  const handleDeletePuzzle = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.rooms[selectedRoom].puzzles = next.rooms[selectedRoom].puzzles.filter((_, i) => i !== selectedPuzzle);
      return next;
    });
  }; // handleDeletePuzzle

  const handleDuplicatePuzzle = () => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      const puzzles = next.rooms[selectedRoom].puzzles;
      next.rooms[selectedRoom].puzzles = [
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
      next.rooms[selectedRoom].puzzles[selectedPuzzle] = puzzleDefinition;
      return next;
    });
  }; // handlePuzzleDefinitionChanged

  const puzzleMappings: PuzzleMapping[] = [
    {
      puzzleType: 'multiple-choice',
      displayName: 'Multiple Choice',
      iconComponent: <MultipleChoiceIcon />,
      defaultPuzzlePayload: multipleChoicePuzzleFactory.defaultPuzzleDefinition,
      editingComponentProducer: multipleChoicePuzzleFactory.puzzleEditingComponent as any
    }
  ];

  const puzzles = activityDefinition.rooms[selectedRoom].puzzles;

  return (
    <Root>
      <PuzzleSlidesContainer
        puzzles={puzzles}
        selectedPuzzleIndex={selectedPuzzle}
        onAddPuzzle={handleAddPuzzle}
        onSelectPuzzle={(index) => setSelectedPuzzle(index)}
      />
      <EditablePuzzle
        puzzleDefinition={puzzles[selectedPuzzle]}
        puzzleMappings={puzzleMappings}
        onPuzzleDefinitionChanged={handlePuzzleDefinitionChanged}
        onPuzzleDeleted={handleDeletePuzzle}
        onPuzzleDuplicated={handleDuplicatePuzzle}
      />
    </Root>
  );
}

export default CreateEscapeRoomScreen;