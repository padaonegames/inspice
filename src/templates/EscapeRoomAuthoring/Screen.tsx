import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RadioCircleMarked } from "styled-icons/boxicons-regular";
import { Exit } from "@styled-icons/icomoon/Exit";

// services
import { useAsyncRequest } from '../../services/useAsyncRequest';

// steps
import { CompletedEscapeRoomActivityDefinition, default_room,default_escape_room_settings, InProgressEscapeRoomActivityDefinition, SupportedStage } from '../../services/escapeRoomActivity.model';
import { EscapeRoomStageSlidesContainer, StageToSlideProducerMapping } from './components/EscapeRoomStageSlidesContainer';
import EditableStage, { StageMappings } from './components/EditableStage';
import { multipleChoiceItemFactory, MultipleChoiceItemStageSlide } from './components/items/MutipleChoiceItem';
import { waitingCodeItemFactory, WaitingCodeItemStageSlide } from './components/items/WaitingCodeItem';
import { qrScanItemFactory, QRScanItemStageSlide } from './components/items/QRScanItem';
import { arScanItemFactory, ARScanItemStageSlide } from './components/items/ARScanItem';
import { loadSceneItemFactory, LoadSceneItemStageSlide } from './components/items/LoadSceneItem';
import { narrativeItemFactory, NarrativeItemStageSlide } from './components/items/NarrativeItem';
import { escapeRoomSettingsItemFactory, EscapeRoomSettingsItemStageSlide } from './components/items/EscapeRoomSettingsItem';



import { stageTypeIcon } from './components/StageSettingsContainer';
import {Wondering2} from "@styled-icons/icomoon/Wondering2"
import { QrCode } from "@styled-icons/material/QrCode";

import { cloneDeep } from 'lodash';
import { roomItemFactory } from './components/items/RoomItem';
import EditableUnlockPasswordItemContent, { unlockPasswordItemFactory, UnlockPasswordItemStageSlide } from './components/items/UnlockPasswordtem';

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

const WaitingCodeIcon = styled(Wondering2)`
  ${stageTypeIcon}
`;

const QRCodeIcon = styled(QrCode)`
  ${stageTypeIcon}
`;

export const stageMappings: StageMappings<SupportedStage> = {
  'escape-room-settings': {
    displayName: 'Settings',
    iconComponent: <RoomIcon />,
    editingComponentProducer: escapeRoomSettingsItemFactory.editingComponent,
    defaultStagePayload: escapeRoomSettingsItemFactory.defaultDefinition
  },
  'room': {
    displayName: 'Room',
    iconComponent: <RoomIcon />,
    editingComponentProducer: roomItemFactory.editingComponent,
    defaultStagePayload: roomItemFactory.defaultDefinition
  },
  'multiple-choice': {
    displayName: 'Multiple Choice',
    iconComponent: <MultipleChoiceIcon />,
    editingComponentProducer: multipleChoiceItemFactory.editingComponent,
    defaultStagePayload: multipleChoiceItemFactory.defaultDefinition
  },
  'waiting-code': {
    displayName: 'Waiting Code',
    iconComponent: <WaitingCodeIcon />,
    editingComponentProducer: waitingCodeItemFactory.editingComponent,
    defaultStagePayload: waitingCodeItemFactory.defaultDefinition
  },
  'qr-scan': {
    displayName: 'QR Scan',
    iconComponent: <QRCodeIcon />,
    editingComponentProducer: qrScanItemFactory.editingComponent,
    defaultStagePayload: qrScanItemFactory.defaultDefinition
  },
  'ar-scan': {
    displayName: 'AR Scan',
    iconComponent: <QRCodeIcon />,
    editingComponentProducer: arScanItemFactory.editingComponent,
    defaultStagePayload: arScanItemFactory.defaultDefinition
  },
  'load-scene': {
    displayName: 'Load Scene ',
    iconComponent: <QRCodeIcon />,
    editingComponentProducer: loadSceneItemFactory.editingComponent,
    defaultStagePayload: loadSceneItemFactory.defaultDefinition
  },
  'narrative': {
    displayName: 'Narrative Scene',
    iconComponent: <QRCodeIcon />,
    editingComponentProducer: narrativeItemFactory.editingComponent,
    defaultStagePayload: narrativeItemFactory.defaultDefinition
  },
  'unlock-password': {
    displayName: 'Unlock Password',
    iconComponent: <QRCodeIcon />,
    editingComponentProducer: unlockPasswordItemFactory.editingComponent,
    defaultStagePayload: unlockPasswordItemFactory.defaultDefinition
  }
};

export const stageSlidesMappings: StageToSlideProducerMapping<SupportedStage> = {
  'escape-room-settings': EscapeRoomSettingsItemStageSlide,
  'room': undefined,
  'multiple-choice': MultipleChoiceItemStageSlide,
  'waiting-code': WaitingCodeItemStageSlide,
  "qr-scan":QRScanItemStageSlide,
  "ar-scan":ARScanItemStageSlide,
  "load-scene": LoadSceneItemStageSlide,
  "narrative":NarrativeItemStageSlide,
  "unlock-password": UnlockPasswordItemStageSlide
};

//-------------------------------------------------------
//                    Defaults
//-------------------------------------------------------



const settings: SupportedStage = {
  type: 'escape-room-settings',
  payload: default_escape_room_settings
};

const sample_stage: SupportedStage = {
  type: 'room',
  payload: default_room
};

const sample_base: InProgressEscapeRoomActivityDefinition = {
  activityType: 'Escape Room',
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  stages: [settings]
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

  const handleStageDefinitionChanged = (stageDefinition: SupportedStage) => {
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

  const duplicateStage= (index:number) => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, index),
        next.stages[index],
        ...next.stages.slice(index, next.stages.length)
      ];
      return next;
    });

    //Changes index if necesary to continue displaying the same stage
    setSelectedStage(prev => index<prev ? prev+1 : prev);
  }; //duplicateStage

  const deleteStage = (index: number) => {
    setActivityDefinition(prev => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, index),
        ...next.stages.slice(index + 1, next.stages.length)
      ];
      return next;
    });

     //Changes index if necesary to continue displaying the same stage
    setSelectedStage(prev => index<prev ? prev-1 : prev);
  }; //deleteStage



  return (
    <Root>
      <EscapeRoomStageSlidesContainer
        stages={activityDefinition.stages}
        stageMappings={stageSlidesMappings}
        selectedStageIndex={selectedStage}
        onAddStage={handleAddStage}
        onSelectStage={(index) => setSelectedStage(index)}
        handleDuplicateStage = {duplicateStage}
        handleDeleteStage = {deleteStage}
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