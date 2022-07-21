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
import {
  CompletedMultistageFormActivityDefinition,
  InProgressMultistageFormActivityDefinition,
  MultistageFormActivityDefinition,
} from "../../../services/multistageFormActivity.model";
import DefineMultistageFormStep from "./Steps/DefineMultistageFormStep";
import { multistageFormApi } from "../../../services";
import { ActivityInstance } from "../../../services/activity.model";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 State Definition
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

const stepContext = generateStepsContext<MultistageFormActivityDefinition>();

/**
 * Screen to encapsulate the creation flow of a Multistage Form activity.
 * Component responsible for handling the information fetching and posting logic; actual
 * rendering of this screen is delegated to the *CreateMultistageFormActivityScreenComponent* component.
 */
export const CreateMultistageFormActivityScreen = () => {
  const [completedActivity, setCompletedActivity] =
    useState<CompletedMultistageFormActivityDefinition | undefined>(undefined);
  const [submitActivity, setSubmitActivity] = useState<boolean>(false);

  const submitDefinition = async () => {
    if (!submitActivity || !completedActivity) return Promise.reject();
    setSubmitActivity(false);
    return multistageFormApi.submitMultistageFormActivityDefinition(
      completedActivity
    );
  };

  const [submitDefinitionStatus] = useAsyncRequest(submitDefinition, [
    submitActivity,
  ]);

  useEffect(() => {
    if (
      submitDefinitionStatus.kind ===
      "success" /*&& submitDefinitionStatus.result.kind === 'ok'*/
    ) {
      window.alert(
        "Your activity was successfully uploaded to the linked data hub."
      );
    }
  }, [submitDefinitionStatus]);

  const handleSubmitActivityDefinition = (
    value: CompletedMultistageFormActivityDefinition
  ) => {
    setCompletedActivity(value);
    setSubmitActivity(true);
  }; // handleSubmitActivityDefinition

  return (
    <CreateMultistageFormActivityScreenComponent
      initialActivityDefinition={sample_base}
      onSubmitActivityDefinition={handleSubmitActivityDefinition}
    />
  );
}; // CreateMultistageFormActivityScreen

interface CreateMultistageFormActivityScreenComponentProps {
  /** Initial state that this component will take as base */
  initialActivityDefinition: MultistageFormActivityDefinition;
  /** callback to parent notifying of a change within the internal state of this component */
  onActivityDefinitionChanged?: (
    value: InProgressMultistageFormActivityDefinition
  ) => void;
  /** callback to parent notifying of activity definition being submitted by the user.
   * Submission does NOT take place within this component. Rather, the action is lifted to
   * the parent so that rendering and communication with the services remain isolated.
   */
  onSubmitActivityDefinition?: (
    value: CompletedMultistageFormActivityDefinition
  ) => void;
} // CreateMultistageFormActivityScreenComponentProps

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

export const CreateMultistageFormActivityScreenComponent = (
  props: CreateMultistageFormActivityScreenComponentProps
): JSX.Element => {
  const {
    initialActivityDefinition,
    onActivityDefinitionChanged,
    onSubmitActivityDefinition,
  } = props;

  // Initialize internal component state using fields from the provided initialActivityDefinition, if any.
  // Note here that we are adding the minimum necessary fields to have a valid transformation from State into InProgressMultistageFormActivityDefinition
  // by incorporating the base content from sample_base.
  const [activityDefinition, setActivityDefinition] =
    useState<MultistageFormActivityDefinition>(initialActivityDefinition);

  useEffect(() => {
    if (!onActivityDefinitionChanged) return;
    onActivityDefinitionChanged(
      activityDefinition as unknown as InProgressMultistageFormActivityDefinition
    );
  }, [activityDefinition]);

  const handleSubmitActivityDefinition = () => {
    if (!onSubmitActivityDefinition) return;
    if (!isStageOneCompleted(activityDefinition)) return;

    onSubmitActivityDefinition(activityDefinition);
  }; // handleSubmitActivityDefinition

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
          onSubmitActivity={handleSubmitActivityDefinition}
          finaItemCaption={"Submit Activity".toUpperCase()}
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

export default CreateMultistageFormActivityScreen;
