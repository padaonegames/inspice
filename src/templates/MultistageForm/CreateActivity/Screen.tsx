import { useEffect, useState } from 'react';
import styled from 'styled-components';

// navigation
import { ActivityCreationOverviewPanel, ActivityCreationOverviewPanelProps } from '../../../components/Navigation/ActivityCreationOverviewPanel';

// services
import { useAsyncRequest } from '../../../services/useAsyncRequest';

// steps
import { State, Step, Steps, StepsConfig } from '../../../components/Navigation/Steps';
import { useLocation } from 'react-router-dom';
import ActivityInstanceBasicInfoStep from '../../GeneralSteps/ActivityInstanceBasicInfoStep';
import { CompletedMultistageFormActivityDefinition, InProgressMultistageFormActivityDefinition, MultistageFormStage } from '../../../services/multistageFormActivity.model';

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
};

const sample: State = {
  ...sample_base
};

const isStageOneCompleted = (definition: State): boolean => {
  return definition['activityAuthor'] as string !== undefined && (definition['activityAuthor'] as string).length > 0 &&
    definition['activityTitle'] as string !== undefined && (definition['activityTitle'] as string).length > 0 &&
    definition['beginsOn'] as Date !== undefined &&
    definition['endsOn'] as Date !== undefined;
}

/**
 * Screen to encapsulate the creation flow of a Multistage Form activity.
 */
export const CreateMultistageFormActivityScreen = () => {

  const { state } = useLocation();

  const [activityDefinition, setActivityDefinition] =
    useState<State>(state ? { ...state } : sample);
  const [submitActivity, setSubmitActivity] = useState<boolean>(false);

  const submitDefinition = async () => {
    if (!submitActivity) return Promise.reject();
    setSubmitActivity(false);
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
    return Promise.reject();
  };

  const [submitDefinitionStatus] = useAsyncRequest(submitDefinition, [submitActivity]);

  useEffect(() => {
    if (submitDefinitionStatus.kind === 'success' /*&& submitDefinitionStatus.result.kind === 'ok'*/) {
      window.alert('Your activity was successfully uploaded to the linked data hub.');
    }
  }, [submitDefinitionStatus]);


  const config: StepsConfig = {
    navigation: {
      location: 'before',
      component: (props: ActivityCreationOverviewPanelProps) =>
        <ActivityCreationOverviewPanel
          {...props}
          stages={[
            { name: 'Basic Information'.toUpperCase(), completed: isStageOneCompleted(activityDefinition) },
            { name: 'Edit Stages'.toUpperCase(), completed: false },
          ]}
          onSubmitActivity={() => setSubmitActivity(true)}
          finaItemCaption={'Submit Activity'.toUpperCase()}
        />
    }
  };

  return (
    <Root>
      <Steps
        config={config}
        genState={activityDefinition}
        setGenState={setActivityDefinition}
      >
        <Step title='Basic Information' component={ActivityInstanceBasicInfoStep} />
        <Step title='Edit Stages' component={ActivityInstanceBasicInfoStep} />
      </Steps>
    </Root>
  );
}

export default CreateMultistageFormActivityScreen;