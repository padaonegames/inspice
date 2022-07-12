import { useEffect, useState } from 'react';
import styled from 'styled-components';

// navigation
import { ActivityCreationOverviewPanel, ActivityCreationOverviewPanelProps } from '../../../components/Navigation/ActivityCreationOverviewPanel';

// services
import { useAsyncRequest } from '../../../services/useAsyncRequest';

// steps
import { State, Step, Steps, StepsConfig } from '../../../components/Navigation/Steps';
import ActivityInstanceBasicInfoStep from '../../GeneralSteps/ActivityInstanceBasicInfoStep';
import { CompletedMultistageFormActivityDefinition, InProgressMultistageFormActivityDefinition, MultistageFormStage } from '../../../services/multistageFormActivity.model';
import DefineMultistageFormStep from './Steps/DefineMultistageFormStep';
import { multistageFormApi } from '../../../services';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------

const sample_base: InProgressMultistageFormActivityDefinition = {
  activityType: 'Multistage Form',
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  stages: [],
  formResponsesDatasetUuid: ''
}; // sample_base

/**
 * Screen to encapsulate the creation flow of a Multistage Form activity.
 * Component responsible for handling the information fetching and posting logic; actual
 * rendering of this screen is delegated to the *CreateMultistageFormActivityScreenComponent* component.
 */
export const CreateMultistageFormActivityScreen = () => {

  const [completedActivity, setCompletedActivity] = useState<CompletedMultistageFormActivityDefinition | undefined>(undefined);
  const [submitActivity, setSubmitActivity] = useState<boolean>(false);

  const submitDefinition = async () => {
    if (!submitActivity || !completedActivity) return Promise.reject();
    setSubmitActivity(false);
    return multistageFormApi.submitMultistageFormActivityDefinition(completedActivity);
  };

  const [submitDefinitionStatus] = useAsyncRequest(submitDefinition, [submitActivity]);

  useEffect(() => {
    if (submitDefinitionStatus.kind === 'success' /*&& submitDefinitionStatus.result.kind === 'ok'*/) {
      window.alert('Your activity was successfully uploaded to the linked data hub.');
    }
  }, [submitDefinitionStatus]);

  const handleSubmitActivityDefinition = (value: CompletedMultistageFormActivityDefinition) => {
    setCompletedActivity(value);
    setSubmitActivity(true);
  } // handleSubmitActivityDefinition

  return (
    <CreateMultistageFormActivityScreenComponent
      initialActivityDefinition={undefined}
      onSubmitActivityDefinition={handleSubmitActivityDefinition}
    />
  );
}; // CreateMultistageFormActivityScreen

interface CreateMultistageFormActivityScreenComponentProps {
  /** Initial state that this component will take as base */
  initialActivityDefinition?: InProgressMultistageFormActivityDefinition | undefined;
  /** callback to parent notifying of a change within the internal state of this component */
  onActivityDefinitionChanged?: (value: InProgressMultistageFormActivityDefinition) => void;
  /** callback to parent notifying of activity definition being submitted by the user.
   * Submission does NOT take place within this component. Rather, the action is lifted to
   * the parent so that rendering and communication with the services remain isolated.
   */
  onSubmitActivityDefinition?: (value: CompletedMultistageFormActivityDefinition) => void;
} // CreateMultistageFormActivityScreenComponentProps


const isStageOneCompleted = (definition: State): boolean => {
  return definition['activityAuthor'] as string !== undefined && (definition['activityAuthor'] as string).length > 0 &&
    definition['activityTitle'] as string !== undefined && (definition['activityTitle'] as string).length > 0 &&
    definition['beginsOn'] as Date !== undefined &&
    definition['endsOn'] as Date !== undefined;
}; // isStageOneCompleted

export const CreateMultistageFormActivityScreenComponent = (props: CreateMultistageFormActivityScreenComponentProps): JSX.Element => {

  const {
    initialActivityDefinition,
    onActivityDefinitionChanged,
    onSubmitActivityDefinition
  } = props;

  // Initialize internal component state using fields from the provided initialActivityDefinition, if any.
  // Note here that we are adding the minimum necessary fields to have a valid transformation from State into InProgressMultistageFormActivityDefinition
  // by incorporating the base content from sample_base.
  const [activityDefinition, setActivityDefinition] =
    useState<State>(initialActivityDefinition ? { ...sample_base, ...initialActivityDefinition } : { ...sample_base });

  useEffect(() => {
    if (!onActivityDefinitionChanged) return;
    onActivityDefinitionChanged(activityDefinition as unknown as InProgressMultistageFormActivityDefinition);
  }, [activityDefinition]);

  const handleSubmitActivityDefinition = () => {
    if (!onSubmitActivityDefinition) return;
    if (!isStageOneCompleted(activityDefinition)) return;

    const def: CompletedMultistageFormActivityDefinition = {
      activityType: 'Multistage Form',
      activityAuthor: activityDefinition['activityAuthor'] as string,
      activityTitle: activityDefinition['activityTitle'] as string,
      description: activityDefinition['description'] as string,
      beginsOn: activityDefinition['beginsOn'] as Date,
      endsOn: activityDefinition['endsOn'] as Date,
      tags: activityDefinition['tags'] as string[],
      imageSrc: activityDefinition['imageSrc'] as string,
      stages: activityDefinition['stages'] as MultistageFormStage[],
      formResponsesDatasetUuid: activityDefinition['responsesDatasetUuid'] as string
    };

    onSubmitActivityDefinition(def);
  }; // handleSubmitActivityDefinition

  const config: StepsConfig = {
    navigation: {
      location: 'before',
      component: (props: ActivityCreationOverviewPanelProps) =>
        <ActivityCreationOverviewPanel
          {...props}
          stages={[
            { name: 'Basic Information'.toUpperCase(), completed: isStageOneCompleted(activityDefinition) },
            { name: 'Edit Stages'.toUpperCase(), completed: true },
          ]}
          onSubmitActivity={handleSubmitActivityDefinition}
          finaItemCaption={'Submit Activity'.toUpperCase()}
        />
    }
  }; // config

  return (
    <Root>
      <Steps
        config={config}
        genState={activityDefinition}
        setGenState={setActivityDefinition}
      >
        <Step title='Basic Information' component={ActivityInstanceBasicInfoStep} />
        <Step title='Edit Stages' component={DefineMultistageFormStep} />
      </Steps>
    </Root>
  );
}; // CreateMultistageFormActivityScreenComponent

export default CreateMultistageFormActivityScreen;