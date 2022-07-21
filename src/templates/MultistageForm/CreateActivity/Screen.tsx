import { useEffect, useState } from "react";
import styled from "styled-components";

// navigation
import {
  ActivityCreationOverviewPanel,
  ActivityCreationOverviewPanelProps,
} from "../../../components/Navigation/ActivityCreationOverviewPanel";

// services
import { useAsyncRequest } from "../../../services/useAsyncRequest";

// steps
import {
  generateStepsContext,
  Step,
  StepComponentProps,
  Steps,
  StepsConfig,
} from "../../../components/Navigation/TypedSteps";
import ActivityInstanceBasicInfoStep from "./Steps/ActivityInstanceBasicInfoStep";
import { MultistageFormActivityDefinition } from "../../../services/multistageFormActivity.model";
import DefineMultistageFormStep from "./Steps/DefineMultistageFormStep";
import { multistageFormService } from "../../../services";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { Navigate, useParams } from "react-router-dom";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                    Defaults
//-------------------------------------------------------

const sample_base: MultistageFormActivityDefinition = {
  activityType: "Multistage Form",
  activityTitle: "",
  activityAuthor: "undefined",
  beginsOn: new Date(),
  endsOn: new Date(),
  stages: [],
  formResponsesDatasetUuid: "",
  _id: "",
}; // sample_base

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

const stepContext = generateStepsContext<MultistageFormActivityDefinition>();

export const GenerateNewMultistageFormActivityScreen = () => {
  const generateNewMultistageFormActivity = async () => {
    return await multistageFormService.requestNewMultistageFormActivityDefinition();
  }; // generateNewMultistageFormActivity

  const [generateNewMultistageFormActivityStatus] = useAsyncRequest(
    generateNewMultistageFormActivity,
    []
  );

  if (generateNewMultistageFormActivityStatus.kind !== "success") {
    return (
      <LoadingOverlay message="Generating new escape room activity definition" />
    );
  }

  if (generateNewMultistageFormActivityStatus.result.kind !== "ok") {
    return (
      <LoadingOverlay message="There was a problem while generating a new escape room activity definition" />
    );
  }

  const activityDefinition =
    generateNewMultistageFormActivityStatus.result.data;
  return (
    <Navigate to={`/multistage-form/curator/create/${activityDefinition._id}`} />
  );
}; // GenerateNewMultistageFormActivityScreen

// Fetch initial Multistage Form activity definition by path id from server
export const EditMultistageFormActivityScreen = (): JSX.Element => {
  const { id } = useParams();

  const fetchActivityDefinitionById = async () => {
    if (!id) return Promise.reject();
    return await multistageFormService.getMultistageFormActivityDefinitionById(
      id
    );
  }; // fetchActivityDefinitionById

  // request an activity with given id when loading this component
  const [fetchActivityDefinitionByIdStatus] = useAsyncRequest(
    fetchActivityDefinitionById,
    []
  );

  if (fetchActivityDefinitionByIdStatus.kind !== "success") {
    return (
      <LoadingOverlay message="Fetching multistage form activity definition from database" />
    );
  }

  if (fetchActivityDefinitionByIdStatus.result.kind !== "ok") {
    return (
      <LoadingOverlay message="There was a problem while fetching the multistage activity definition with given id" />
    );
  }

  const activityDefinition = fetchActivityDefinitionByIdStatus.result.data;
  return <CreateMultistageFormScreen initialActivity={activityDefinition} />;
}; // EditMultistageFormActivityScreen

interface CreateMultistageFormScreenProps {
  initialActivity: MultistageFormActivityDefinition;
} // CreateMultistageFormScreenProps
const CreateMultistageFormScreen = (
  props: CreateMultistageFormScreenProps
): JSX.Element => {
  const { initialActivity } = props;

  const [newActivityDefinition, setNewActivityDefinition] =
    useState<MultistageFormActivityDefinition | undefined>(undefined);

  const updateDefinition = async () => {
    if (!newActivityDefinition) return Promise.reject();
    return await multistageFormService.updateMultistageFormActivityDefinition(
      newActivityDefinition
    );
  }; // updateDefinition

  const [updateDefinitionStatus] = useAsyncRequest(updateDefinition, [
    newActivityDefinition,
  ]);
  const inSyncWithServer = updateDefinitionStatus.kind === "success";

  return (
    <CreateMultistageFormScreenComponent
      initialActivityDefinition={initialActivity}
      onActivityDefinitionChanged={setNewActivityDefinition}
    />
  );
}; // CreateMultistageFormScreen

//-------------------------------------------------------
//                 Multistage Form Creation
//-------------------------------------------------------

const isStageOneCompleted = (
  definition: MultistageFormActivityDefinition
): boolean => {
  return (
    definition.activityAuthor !== undefined &&
    definition.activityAuthor.length > 0 &&
    definition.activityTitle !== undefined &&
    definition.activityTitle.length > 0 &&
    definition.beginsOn !== undefined &&
    definition.endsOn !== undefined
  );
}; // isStageOneCompleted

export interface CreateMultistageFormScreenComponentProps {
  /** Initial state that this component will take as base */
  initialActivityDefinition?: MultistageFormActivityDefinition | undefined;
  /** callback to parent notifying of a change within the internal state of this component */
  onActivityDefinitionChanged?: (
    value: MultistageFormActivityDefinition
  ) => void;
} // CreateMultistageFormActivityScreenProps

export const CreateMultistageFormScreenComponent = (
  props: CreateMultistageFormScreenComponentProps
): JSX.Element => {
  const { initialActivityDefinition, onActivityDefinitionChanged } = props;

  // Initialize internal component state using fields from the provided initialActivityDefinition, if any.
  // Note here that we are adding the minimum necessary fields to have a valid transformation from State into InProgressMultistageFormActivityDefinition
  // by incorporating the base content from sample_base.
  const [activityDefinition, setActivityDefinition] =
    useState<MultistageFormActivityDefinition>(
      initialActivityDefinition
        ? { ...sample_base, ...initialActivityDefinition }
        : { ...sample_base }
    );

  useEffect(() => {
    if (!onActivityDefinitionChanged) return;
    onActivityDefinitionChanged(activityDefinition);
  }, [activityDefinition]);

  const config: StepsConfig = {
    navigation: {
      location: "before",
      component: (props: ActivityCreationOverviewPanelProps) => (
        <ActivityCreationOverviewPanel
          {...props}
          stages={[
            {
              name: "Basic Information".toUpperCase(),
              completed: isStageOneCompleted(activityDefinition),
            },
            { name: "Edit Stages".toUpperCase(), completed: true },
          ]}
        />
      ),
    },
  }; // config

  return (
    <Root>
      <Steps
        config={config}
        state={activityDefinition}
        setState={setActivityDefinition}
        stepContext={stepContext}
      >
        <Step<
          MultistageFormActivityDefinition,
          StepComponentProps<MultistageFormActivityDefinition>
        >
          title="Basic Information"
          component={ActivityInstanceBasicInfoStep}
          stepContext={stepContext}
        />
        <Step<
          MultistageFormActivityDefinition,
          StepComponentProps<MultistageFormActivityDefinition>
        >
          title="Edit Stages"
          component={DefineMultistageFormStep}
          stepContext={stepContext}
        />
      </Steps>
    </Root>
  );
}; // CreateMultistageFormActivityScreenComponent

export default CreateMultistageFormScreen;
