import { useEffect, useState } from "react";

// services
import { useAsyncRequest } from "../../services/useAsyncRequest";

// steps
import {
  CharacterDefinition,
  default_room,
  EscapeRoomActivityDefinition,
  SupportedStage,
} from "../../services/escapeRoomActivity.model";
import {
  EscapeRoomStageSlidesContainer,
  StageToSlideProducerMapping,
} from "./components/EscapeRoomStageSlidesContainer";
import EditableStage, { StageMappings } from "./components/EditableStage";
import {
  multipleChoiceItemFactory,
  MultipleChoiceItemStageSlide,
} from "./components/items/MutipleChoiceItem";
import {
  waitingCodeItemFactory,
  WaitingCodeItemStageSlide,
} from "./components/items/WaitingCodeItem";
import {
  qrScanItemFactory,
  QRScanItemStageSlide,
} from "./components/items/QRScanItem";
import {
  arScanItemFactory,
  ARScanItemStageSlide,
} from "./components/items/ARScanItem";
import {
  loadSceneItemFactory,
  LoadSceneItemStageSlide,
} from "./components/items/LoadSceneItem";
import {
  narrativeItemFactory,
  NarrativeItemStageSlide,
} from "./components/items/NarrativeItem";
import EscapeRoomSettings from "./components/items/EscapeRoomSettings";

import { stageTypeIcon } from "./components/StageSettingsContainer";

import { cloneDeep } from "lodash";
import {
  roomItemFactory,
  RoomItemStageSlide,
} from "./components/items/RoomItem";
import {
  unlockPasswordItemFactory,
  UnlockPasswordItemStageSlide,
} from "./components/items/UnlockPasswordtem";

import styled from "styled-components";
import { QrCode } from "@styled-icons/material/QrCode";
import { Quiz } from "@styled-icons/material/Quiz";
import { ClockHistory } from "@styled-icons/bootstrap/ClockHistory";
import { Exit } from "@styled-icons/icomoon/Exit";
import { ScanObject } from "@styled-icons/fluentui-system-filled/ScanObject";
import { Unity } from "@styled-icons/fa-brands/Unity";
import { HistoryEdu } from "@styled-icons/material-rounded/HistoryEdu";
import { Password } from "@styled-icons/fluentui-system-filled/Password";
import { EscapeRoomContextProvider } from "./EscapeRoomContext";
import { Navigate, useParams } from "react-router-dom";
import { escapeRoomService } from "../../services";
import { LoadingOverlay } from "../../components/Layout/LoadingOverlay";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 Stage Mappings
//-------------------------------------------------------

const MultipleChoiceIcon = styled(Quiz)`
  ${stageTypeIcon}
`;

const RoomIcon = styled(Exit)`
  ${stageTypeIcon}
`;

const WaitingCodeIcon = styled(ClockHistory)`
  ${stageTypeIcon}
`;

const QRCodeIcon = styled(QrCode)`
  ${stageTypeIcon}
`;

const ScanObjectIcon = styled(ScanObject)`
  ${stageTypeIcon}
`;

const UnityIcon = styled(Unity)`
  ${stageTypeIcon}
`;

const NarrativeIcon = styled(HistoryEdu)`
  ${stageTypeIcon}
`;

const UnlockPasswordIcon = styled(Password)`
  ${stageTypeIcon}
`;

export const stageMappings: StageMappings<SupportedStage> = {
  room: {
    displayName: "Room",
    iconComponent: <RoomIcon />,
    editingComponentProducer: roomItemFactory.editingComponent,
    defaultStagePayload: roomItemFactory.defaultDefinition,
  },
  "multiple-choice": {
    displayName: "Multiple Choice",
    iconComponent: <MultipleChoiceIcon />,
    editingComponentProducer: multipleChoiceItemFactory.editingComponent,
    defaultStagePayload: multipleChoiceItemFactory.defaultDefinition,
  },
  "waiting-code": {
    displayName: "Waiting Code",
    iconComponent: <WaitingCodeIcon />,
    editingComponentProducer: waitingCodeItemFactory.editingComponent,
    defaultStagePayload: waitingCodeItemFactory.defaultDefinition,
  },
  "qr-scan": {
    displayName: "QR Scan",
    iconComponent: <QRCodeIcon />,
    editingComponentProducer: qrScanItemFactory.editingComponent,
    defaultStagePayload: qrScanItemFactory.defaultDefinition,
  },
  "ar-scan": {
    displayName: "AR Scan",
    iconComponent: <ScanObjectIcon />,
    editingComponentProducer: arScanItemFactory.editingComponent,
    defaultStagePayload: arScanItemFactory.defaultDefinition,
  },
  "load-scene": {
    displayName: "Load Scene ",
    iconComponent: <UnityIcon />,
    editingComponentProducer: loadSceneItemFactory.editingComponent,
    defaultStagePayload: loadSceneItemFactory.defaultDefinition,
  },
  narrative: {
    displayName: "Narrative",
    iconComponent: <NarrativeIcon />,
    editingComponentProducer: narrativeItemFactory.editingComponent,
    defaultStagePayload: narrativeItemFactory.defaultDefinition,
  },
  "unlock-password": {
    displayName: "Unlock Password",
    iconComponent: <UnlockPasswordIcon />,
    editingComponentProducer: unlockPasswordItemFactory.editingComponent,
    defaultStagePayload: unlockPasswordItemFactory.defaultDefinition,
  },
}; // stageMappings

export const stageSlidesMappings: StageToSlideProducerMapping<SupportedStage> =
  {
    room: RoomItemStageSlide,
    "multiple-choice": MultipleChoiceItemStageSlide,
    "waiting-code": WaitingCodeItemStageSlide,
    "qr-scan": QRScanItemStageSlide,
    "ar-scan": ARScanItemStageSlide,
    "load-scene": LoadSceneItemStageSlide,
    narrative: NarrativeItemStageSlide,
    "unlock-password": UnlockPasswordItemStageSlide,
  }; // stageSlidesMappings

//-------------------------------------------------------
//                    Defaults
//-------------------------------------------------------

const sample_stage: SupportedStage = {
  type: "room",
  payload: default_room,
}; // sample_stage

const sample_base: EscapeRoomActivityDefinition = {
  activityTitle: "",
  authorId: "",
  authorUsername: "",
  stages: [sample_stage],
  characters: [],
  _id: "",
}; // sample_base

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

export const GenerateNewEscapeRoomActivityScreen = () => {
  const generateNewEscapeRoomActivity = async () => {
    return await escapeRoomService.requestNewEscapeRoomActivityDefinition();
  }; // generateNewEscapeRoomActivity

  const [generateNewEscapeRoomActivityStatus] = useAsyncRequest(
    generateNewEscapeRoomActivity,
    []
  );

  if (generateNewEscapeRoomActivityStatus.kind !== "success") {
    return (
      <LoadingOverlay message="Generating new escape room activity definition" />
    );
  }

  if (generateNewEscapeRoomActivityStatus.result.kind !== "ok") {
    return (
      <LoadingOverlay message="There was a problem while generating a new escape room activity definition" />
    );
  }

  const activityDefinition = generateNewEscapeRoomActivityStatus.result.data;
  return (
    <Navigate to={`/escape-room/curator/create/${activityDefinition._id}`} />
  );
}; // GenerateNewEscapeRoomActivityScreen

// Fetch initial escape Room activity definition by path id from server
export const EditEscapeRoomScreen = (): JSX.Element => {
  const { id } = useParams();

  const fetchActivityDefinitionById = async () => {
    if (!id) return Promise.reject();
    return await escapeRoomService.getEscapeRoomActivityDefinitionById(id);
  }; // fetchActivityDefinitionById

  // request an activity with given id when loading this component
  const [fetchActivityDefinitionByIdStatus] = useAsyncRequest(
    fetchActivityDefinitionById,
    []
  );

  if (fetchActivityDefinitionByIdStatus.kind !== "success") {
    return (
      <LoadingOverlay message="Fetching escape room activity definition from database" />
    );
  }

  if (fetchActivityDefinitionByIdStatus.result.kind !== "ok") {
    return (
      <LoadingOverlay message="There was a problem while fetching the escape room activity definition with given id" />
    );
  }

  const activityDefinition = fetchActivityDefinitionByIdStatus.result.data;
  return <CreateEscapeRoomScreen initialActivity={activityDefinition} />;
}; // EditEscapeRoomScreen

interface CreateEscapeRoomScreenProps {
  initialActivity: EscapeRoomActivityDefinition;
} // CreateEscapeRoomScreenProps
const CreateEscapeRoomScreen = (
  props: CreateEscapeRoomScreenProps
): JSX.Element => {
  const { initialActivity } = props;

  const [newActivityDefinition, setNewActivityDefinition] =
    useState<EscapeRoomActivityDefinition | undefined>(undefined);

  const updateDefinition = async () => {
    if (!newActivityDefinition) return Promise.reject();
    return await escapeRoomService.updateEscapeRoomActivityDefinition(
      newActivityDefinition
    );
  }; // updateDefinition

  const [updateDefinitionStatus] = useAsyncRequest(updateDefinition, [
    newActivityDefinition,
  ]);
  const inSyncWithServer = updateDefinitionStatus.kind === "success";

  return (
    <CreateEscapeRoomScreenComponent
      initialActivityDefinition={initialActivity}
      onActivityDefinitionChanged={setNewActivityDefinition}
    />
  );
}; // CreateEscapeRoomScreen

//-------------------------------------------------------
//                 Escape Room Creation
//-------------------------------------------------------

interface CreateEscapeRoomScreenComponentProps {
  /** Initial state that this component will take as base */
  initialActivityDefinition?: EscapeRoomActivityDefinition | undefined;
  /** callback to parent notifying of a change within the internal state of this component */
  onActivityDefinitionChanged?: (value: EscapeRoomActivityDefinition) => void;
} // CreateEscapeRoomScreenComponentProps

export const CreateEscapeRoomScreenComponent = (
  props: CreateEscapeRoomScreenComponentProps
): JSX.Element => {
  const { initialActivityDefinition, onActivityDefinitionChanged } = props;

  // Initialize internal component state using fields from the provided initialActivityDefinition, if any.
  // Note here that we are adding the minimum necessary fields to have a valid transformation from State into InProgressEscapeRoomActivityDefinition
  // by incorporating the base content from sample_base.
  const [activityDefinition, setActivityDefinition] =
    useState<EscapeRoomActivityDefinition>(
      initialActivityDefinition
        ? { ...sample_base, ...initialActivityDefinition }
        : { ...sample_base }
    );

  // currently selected stage from activityDefinition.stages
  const [selectedStage, setSelectedStage] = useState<number>(0);

  // State that specifies what should be displayer on the screen (Escape room general settings or one of its editors)
  const [showSettings, setShowSettings] = useState<boolean>(true);

  useEffect(() => {
    if (!onActivityDefinitionChanged) return;
    onActivityDefinitionChanged(activityDefinition);
  }, [activityDefinition]);

  const handleEscapeRoomTitleChanged = (title: string) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.activityTitle = title;
      return next;
    });
  }; // handleEscapeRoomTitleChanged

  const handleEscapeRoomDescriptionChanged = (description: string) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      // next. = description;
      return next;
    });
  }; // handleEscapeRoomDescriptionChanged

  const handleAddStage = () => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages = [...next.stages, sample_stage];
      return next;
    });
  }; // handleAddStage

  const handleStageDefinitionChanged = (stageDefinition: SupportedStage) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages[selectedStage] = stageDefinition;
      return next;
    });
  }; // handleStageDefinitionChanged

  const handleDeleteStage = () => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, selectedStage),
        ...next.stages.slice(selectedStage + 1, next.stages.length),
      ];
      return next;
    });
  }; // handleDeleteStage

  const handleDuplicateStage = () => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, selectedStage),
        next.stages[selectedStage],
        ...next.stages.slice(selectedStage, next.stages.length),
      ];
      return next;
    });
  }; // handleDuplicateStage

  const currentStage = activityDefinition.stages[selectedStage];

  const duplicateStage = (index: number) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, index),
        next.stages[index],
        ...next.stages.slice(index, next.stages.length),
      ];
      return next;
    });

    // Changes index if necesary to continue displaying the same stage
    setSelectedStage((prev) => (index < prev ? prev + 1 : prev));
  }; // duplicateStage

  const deleteStage = (index: number) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, index),
        ...next.stages.slice(index + 1, next.stages.length),
      ];
      return next;
    });

    // Changes index if necesary to continue displaying the same stage
    setSelectedStage((prev) => (index < prev ? prev - 1 : prev));
  }; // deleteStage

  const handleCharactersChanged = (characters: CharacterDefinition[]) => {
    setActivityDefinition((prev) => ({
      ...prev,
      characters: characters,
    }));
  }; // handleCharactersChanged

  return (
    <Root>
      <EscapeRoomContextProvider
        escapeRoomActivityDefinition={activityDefinition}
        setEscapeRoomActivityDefinition={setActivityDefinition}
      >
        <EscapeRoomStageSlidesContainer
          escapeRoomTitle={activityDefinition.activityTitle}
          stages={activityDefinition.stages}
          stageMappings={stageSlidesMappings}
          selectedStageIndex={selectedStage}
          onAddStage={handleAddStage}
          onSelectStage={(index) => {
            setSelectedStage(index);
            setShowSettings(false);
          }}
          handleDuplicateStage={duplicateStage}
          handleDeleteStage={deleteStage}
          handleGoToSettings={() => setShowSettings(true)}
        />

        {/* Editors for the multiple stages avaliable in an escape room game */}
        {!showSettings && (
          <EditableStage
            stageDefinition={currentStage}
            stageMappings={stageMappings}
            onStageDefinitionChanged={handleStageDefinitionChanged}
            onStageDeleted={handleDeleteStage}
            onStageDuplicated={handleDuplicateStage}
          />
        )}
        {/* Editor for basic configuration of the escape room like name, description or characters */}
        {showSettings && (
          <EscapeRoomSettings
            escapeRoomTitle={activityDefinition.activityTitle}
            escapeRoomDescription=""
            escapeRoomCharacters={activityDefinition.characters}
            onTitleChanged={handleEscapeRoomTitleChanged}
            onDescriptionChanged={handleEscapeRoomDescriptionChanged}
            onCharactersChanged={handleCharactersChanged}
          />
        )}
      </EscapeRoomContextProvider>
    </Root>
  );
};

export default CreateEscapeRoomScreen;
