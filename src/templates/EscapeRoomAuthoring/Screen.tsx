import { useEffect, useState } from "react";

// services
import { useAsyncRequest } from "../../services/useAsyncRequest";

// steps
import {
  CharacterDefinition,
  default_room,
  DiaryPageDefinition,
  EscapeRoomActivityDefinition,
  SupportedStage,
} from "../../services/escapeRoomActivity.model";
import {
  EscapeRoomStageSlidesContainer,
  StageToSlideProducerMapping,
} from "./components/EscapeRoomStageSlidesContainer";
import EditableStage, { StageMappings } from "./components/EditableStage";
import {
  multipleChoiceTestItemFactory,
  MultipleChoiceTestItemStageSlide,
} from "./components/items/MutipleChoiceTestItem";
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
import { Layers } from "@styled-icons/entypo/Layers";
import { EscapeRoomContextProvider } from "./EscapeRoomContext";
import { Navigate, useParams } from "react-router-dom";
import { escapeRoomService } from "../../services";
import { LoadingOverlay } from "../../components/Layout/LoadingOverlay";
import { LogInCircle } from "@styled-icons/boxicons-regular/LogInCircle";
import { SelectMultiple } from "@styled-icons/boxicons-solid/SelectMultiple";
import { BookReader } from "@styled-icons/boxicons-regular/BookReader";
import { BurstNew } from "@styled-icons/foundation/BurstNew";
import { PuzzleCube } from "@styled-icons/fluentui-system-regular/PuzzleCube";
import {
  arOverlayItemFactory,
  AROverlayItemStageSlide,
} from "./components/items/AROverlayItem";
import {
  sessionCodeItemFactory,
  SessionCodeItemStageSlide,
} from "./components/items/SessionCodeItem";
import {
  multipleChoiceFreeAnswerItemFactory,
  MultipleChoiceFreeAnswerItemStageSlide,
} from "./components/items/MutipleChoiceFreeAnswerItem";
import {
  diaryPageItemFactory,
  DiaryPageItemStageSlide,
} from "./components/items/DiaryPageItem";
import {
  objectObtainedItemFactory,
  ObjectObtainedItemStageSlide,
} from "./components/items/ObjectObtainedItem";
import {
  packPuzzleItemFactory,
  PackPuzzleItemStageSlide,
} from "./components/items/PackPuzzleItem";

const Root = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

//-------------------------------------------------------
//                 Stage Mappings
//-------------------------------------------------------

const MultipleChoiceTestIcon = styled(SelectMultiple)`
  ${stageTypeIcon}
`;

const MultipleChoiceFreeAnswerIcon = styled(Quiz)`
  ${stageTypeIcon}
`;

const RoomIcon = styled(Exit)`
  ${stageTypeIcon}
`;

const DiaryIcon = styled(BookReader)`
  ${stageTypeIcon}
`;

const PackPuzzleIcon = styled(PuzzleCube)`
  ${stageTypeIcon}
`;

const WaitingCodeIcon = styled(ClockHistory)`
  ${stageTypeIcon}
`;

const QRCodeIcon = styled(QrCode)`
  ${stageTypeIcon}
`;

const ObjectObtainedIcon = styled(BurstNew)`
  ${stageTypeIcon}
`;

const ScanObjectIcon = styled(ScanObject)`
  ${stageTypeIcon}
`;

const ArOverlayIcon = styled(Layers)`
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

const SessionCodeIcon = styled(LogInCircle)`
  ${stageTypeIcon}
`;

export const stageMappings: StageMappings<SupportedStage> = {
  "pack-puzzle": {
    displayName: "Pack Puzzle",
    iconComponent: <PackPuzzleIcon />,
    editingComponentProducer: packPuzzleItemFactory.editingComponent,
    defaultStagePayload: packPuzzleItemFactory.defaultDefinition,
  },
  "object-obtained": {
    displayName: "Object Obtained",
    iconComponent: <ObjectObtainedIcon />,
    editingComponentProducer: objectObtainedItemFactory.editingComponent,
    defaultStagePayload: objectObtainedItemFactory.defaultDefinition,
  },
  "diary-page": {
    displayName: "Diary Page",
    iconComponent: <DiaryIcon />,
    editingComponentProducer: diaryPageItemFactory.editingComponent,
    defaultStagePayload: diaryPageItemFactory.defaultDefinition,
  },
  room: {
    displayName: "Room",
    iconComponent: <RoomIcon />,
    editingComponentProducer: roomItemFactory.editingComponent,
    defaultStagePayload: roomItemFactory.defaultDefinition,
  },
  "multiple-choice-test": {
    displayName: "Test (Multiple-Choice)",
    iconComponent: <MultipleChoiceTestIcon />,
    editingComponentProducer: multipleChoiceTestItemFactory.editingComponent,
    defaultStagePayload: multipleChoiceTestItemFactory.defaultDefinition,
  },
  "multiple-choice-free-answer": {
    displayName: "Free Answer (Multiple-Choice)",
    iconComponent: <MultipleChoiceFreeAnswerIcon />,
    editingComponentProducer:
      multipleChoiceFreeAnswerItemFactory.editingComponent,
    defaultStagePayload: multipleChoiceFreeAnswerItemFactory.defaultDefinition,
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
  "ar-overlay": {
    displayName: "AR Overlay",
    iconComponent: <ArOverlayIcon />,
    editingComponentProducer: arOverlayItemFactory.editingComponent,
    defaultStagePayload: arOverlayItemFactory.defaultDefinition,
  },
  "session-code": {
    displayName: "Session Code",
    iconComponent: <SessionCodeIcon />,
    editingComponentProducer: sessionCodeItemFactory.editingComponent,
    defaultStagePayload: sessionCodeItemFactory.defaultDefinition,
  },
}; // stageMappings

export const stageSlidesMappings: StageToSlideProducerMapping<SupportedStage> =
  {
    "pack-puzzle": PackPuzzleItemStageSlide,
    "object-obtained": ObjectObtainedItemStageSlide,
    "diary-page": DiaryPageItemStageSlide,
    room: RoomItemStageSlide,
    "multiple-choice-free-answer": MultipleChoiceFreeAnswerItemStageSlide,
    "multiple-choice-test": MultipleChoiceTestItemStageSlide,
    "waiting-code": WaitingCodeItemStageSlide,
    "qr-scan": QRScanItemStageSlide,
    "ar-scan": ARScanItemStageSlide,
    "load-scene": LoadSceneItemStageSlide,
    narrative: NarrativeItemStageSlide,
    "unlock-password": UnlockPasswordItemStageSlide,
    "ar-overlay": AROverlayItemStageSlide,
    "session-code": SessionCodeItemStageSlide,
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
  diaryPages: [],
  _id: "",
  applicationIconSrc: "",
  apkId: "",
  versionNumber: "",
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
  const [selectedStage, setSelectedStage] =
    useState<number | undefined>(undefined);

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

  const handleApplicationIconSrcChanged = (iconSrc: string) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.applicationIconSrc = iconSrc;
      return next;
    });
  }; // handleApplicationIconSrcChanged

  const handleApplicationApkIdChanged = (apkId: string) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.apkId = apkId;
      return next;
    });
  }; // handleApplicationApkIdChanged

  const handleApplicationVersionNumberChanged = (versionNumber: string) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.versionNumber = versionNumber;
      return next;
    });
  }; // handleApplicationVersionNumberChanged

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

  const validStageSelected =
    selectedStage !== undefined &&
    selectedStage < activityDefinition.stages.length &&
    selectedStage >= 0;

  const handleStageDefinitionChanged = (stageDefinition: SupportedStage) => {
    if (!validStageSelected || selectedStage === undefined) return;
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages[selectedStage] = stageDefinition;
      return next;
    });
  }; // handleStageDefinitionChanged

  const handleDeleteStage = () => {
    if (!validStageSelected || selectedStage === undefined) return;
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      next.stages = [
        ...next.stages.slice(0, selectedStage),
        ...next.stages.slice(selectedStage + 1, next.stages.length),
      ];
      return next;
    });
  }; // handleDeleteStage

  // currently selected stage
  const handleDuplicateStage = () => {
    if (!validStageSelected || selectedStage === undefined) return;
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      let nextStage = { ...next.stages[selectedStage] };
      delete (nextStage as any)["_id"];
      // ensure that server assigns a new guid to item
      next.stages = [
        ...next.stages.slice(0, selectedStage),
        nextStage,
        ...next.stages.slice(selectedStage, next.stages.length),
      ];
      return next;
    });
  }; // handleDuplicateStage

  const currentStage =
    validStageSelected && selectedStage !== undefined
      ? activityDefinition.stages[selectedStage]
      : undefined;

  // stage by index
  const duplicateStage = (index: number) => {
    setActivityDefinition((prev) => {
      let next = cloneDeep(prev);
      let nextStage = { ...next.stages[index] };
      delete (nextStage as any)["_id"];
      next.stages = [
        ...next.stages.slice(0, index),
        nextStage,
        ...next.stages.slice(index, next.stages.length),
      ];
      return next;
    });
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
    setSelectedStage((prev) => (prev && index < prev ? prev - 1 : prev));
  }; // deleteStage

  const handleCharactersChanged = (characters: CharacterDefinition[]) => {
    setActivityDefinition((prev) => ({
      ...prev,
      characters: characters,
    }));
  }; // handleCharactersChanged

  const handleDiaryPagesChanged = (diaryPages: DiaryPageDefinition[]) => {
    setActivityDefinition((prev) => ({
      ...prev,
      diaryPages: diaryPages,
    }));
  }; // handleDiaryPagesChanged

  const handleGoToSettings = () => {
    setShowSettings(true);
    setSelectedStage(undefined);
  }; // handleGoToSettings

  const handleMoveStageUp = (index: number) => {
    if (index <= 0) return;

    setActivityDefinition((prev) => {
      let aux = cloneDeep(prev);
      aux.stages = [
        ...aux.stages.slice(0, index - 1),
        aux.stages[index],
        aux.stages[index - 1],
        ...aux.stages.slice(index + 1),
      ];
      return aux;
    });

    // ensure that stage is still selected after the change
    if (selectedStage === index) setSelectedStage(index - 1);
  }; // handleMoveStageUp

  const handleMoveStageDown = (index: number) => {
    if (index + 1 >= activityDefinition.stages.length) return;

    setActivityDefinition((prev) => {
      let aux = cloneDeep(prev);
      aux.stages = [
        ...aux.stages.slice(0, index),
        aux.stages[index + 1],
        aux.stages[index],
        ...aux.stages.slice(index + 2),
      ];
      return aux;
    });

    // ensure that stage is still selected after the change
    if (selectedStage === index) setSelectedStage(index + 1);
  }; // handleMoveStageDown

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
          onDuplicateStage={duplicateStage}
          onDeleteStage={deleteStage}
          onStageMoveDown={handleMoveStageDown}
          onStageMoveUp={handleMoveStageUp}
          onGoToSettings={handleGoToSettings}
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
            escapeRoomDescription={""}
            escapeRoomDiaryPages={activityDefinition.diaryPages}
            escapeRoomCharacters={activityDefinition.characters}
            escapeRoomApplicationIconSrc={activityDefinition.applicationIconSrc}
            escapeRoomApplicationApkId={activityDefinition.apkId}
            escapeRoomApplicationVersionNumber={
              activityDefinition.versionNumber
            }
            onTitleChanged={handleEscapeRoomTitleChanged}
            onDescriptionChanged={handleEscapeRoomDescriptionChanged}
            onCharactersChanged={handleCharactersChanged}
            onDiaryPagesChanged={handleDiaryPagesChanged}
            onApplicationIconSrcChanged={handleApplicationIconSrcChanged}
            onApplicationApkIdChanged={handleApplicationApkIdChanged}
            onApplicationVersionNumberChanged={
              handleApplicationVersionNumberChanged
            }
          />
        )}
      </EscapeRoomContextProvider>
    </Root>
  );
};

export default CreateEscapeRoomScreen;
