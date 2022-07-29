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
import {
  MultistageFormActivityDefinition,
  MultistageFormResponses,
} from "../../../services/multistageFormActivity.model";
import { multistageFormService } from "../../../services";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { useParams } from "react-router-dom";
import ConsumeMultistageFormStageStep, {
  ConsumeMultistageFormStageStepProps,
} from "./Steps/ConsumeFormStageStep";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

const stepContext = generateStepsContext<MultistageFormResponses>();

// Fetch initial Multistage Form activity definition by path id from server
export const ConsumeMultistageFormScreen = (): JSX.Element => {
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
  return <ConsumeMultistageForm activityDefinition={activityDefinition} />;
}; // ConsumeMultistageFormActivityScreen

interface ConsumeMultistageFormProps {
  activityDefinition: MultistageFormActivityDefinition;
} // CreateMultistageFormScreenProps
const ConsumeMultistageForm = (
  props: ConsumeMultistageFormProps
): JSX.Element => {
  const { activityDefinition } = props;

  return (
    <ConsumeMultistageFormScreenComponent
      activityDefinition={activityDefinition}
      userResponses={{}}
    />
  );
}; // ConsumeMultistageForm

//-------------------------------------------------------
//              Multistage Form Consumption
//-------------------------------------------------------

export interface ConsumeMultistageFormScreenComponentProps {
  /** Activity Definition that will be used to render the activity */
  activityDefinition: MultistageFormActivityDefinition;
  /** User responses in the form [field _id] -> response */
  userResponses: MultistageFormResponses;
} // ConsumeMultistageFormScreenComponentProps

export const ConsumeMultistageFormScreenComponent = (
  props: ConsumeMultistageFormScreenComponentProps
): JSX.Element => {
  const { activityDefinition, userResponses } = props;

  const [responses, setResponses] =
    useState<MultistageFormResponses>(userResponses);

  // restrict change notifications on first render (no change happening there)
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const config: StepsConfig = {
    navigation: {
      location: "before",
      component: (props: ActivityCreationOverviewPanelProps) => (
        <ActivityCreationOverviewPanel
          {...props}
          stages={activityDefinition.stages.map((_, index) => ({
            name: `Stage ${index + 1}`.toUpperCase(),
            completed: true,
          }))}
        />
      ),
    },
  }; // config

  return (
    <Root>
      <Steps
        config={config}
        state={responses}
        setState={setResponses}
        stepContext={stepContext}
      >
        {activityDefinition.stages.map((stage, index) => (
          <Step<MultistageFormResponses, ConsumeMultistageFormStageStepProps>
            title={`Stage ${index + 1}`}
            stageDefinition={stage}
            component={ConsumeMultistageFormStageStep}
            stepContext={stepContext}
            key={stage._id}
          />
        ))}
      </Steps>
    </Root>
  );
}; // CreateMultistageFormActivityScreenComponent

export default ConsumeMultistageFormScreen;
