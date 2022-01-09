import { useEffect, useState } from 'react';
import styled from 'styled-components';

// navigation
import ActivityCreationOverviewPanel, { ActivityCreationOverviewPanelProps } from '../../components/Navigation/ActivityCreationOverviewPanel copy';

// services
import { gamGameApi } from '../../services';
import { useAsyncRequest } from '../../services/useAsyncRequest';

// steps
import { State, Step, Steps, StepsConfig } from '../../components/Navigation/Steps';
import BasicInformationStep from './Steps/BasicInformationStep';
import ConfigureStageParamsStep from './Steps/ConfigureStageParamsStep';
import SelectArtworksStep from './Steps/SelectArtworksStep';
import { AllowedResponseType, CompletedGamGameActivityDefinition, InProgressGamGameActivityDefinition } from '../../services/gamGameActivity.model';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------
const sample_base: InProgressGamGameActivityDefinition = {
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minArtworks: 1,
  maxArtworks: 5,
  allowedResponseTypes: [],
  storyDefinitionsDatasetUuid: process.env.REACT_APP_GAM_GAME_STORY_DEFINITIONS_DATASET_UUID || '',
  activityDefinitionsDatasetUuid: process.env.REACT_APP_GAM_GAME_ACTIVITY_DEFINITIONS_DATASET_UUID || '',
  artworksDatasetUuid: process.env.REACT_APP_DATASET_UUID || '',
  artworks: [],
};

const sample: State = {
  ...sample_base,
  page: 1,
  itemsPerPage: 30,
  appliedFilter: {},
  selectedArtworks: [],
};

const isStageOneCompleted = (definition: State): boolean => {
  return definition['activityAuthor'] as string !== undefined && (definition['activityAuthor'] as string).length > 0 &&
    definition['activityTitle'] as string !== undefined && (definition['activityTitle'] as string).length > 0 &&
    definition['beginsOn'] as Date !== undefined &&
    definition['endsOn'] as Date !== undefined;
}

const isStageTwoCompleted = (definition: State): boolean => {
  return definition['minArtworks'] as number !== undefined &&
    definition['maxArtworks'] as number !== undefined &&
    (definition['allowedResponseTypes'] as AllowedResponseType[]).length > 0;
}

const isStageThreeCompleted = (definition: State): boolean => {
  return (definition['artworks'] as string[]).length > 0;
}

/**
 * Screen to encapsulate the creation flow of a GAM Game activity.
 */
export const CreateGamGameActivityScreen = () => {

  const [activityDefinition, setActivityDefinition] =
    useState<State>(sample);
  const [submitGame, setSubmitGame] = useState<boolean>(false);

  const submitDefinition = () => {
    if (!submitGame) return Promise.reject();
    setSubmitGame(false);
    const def: CompletedGamGameActivityDefinition = {
      activityAuthor: activityDefinition['activityAuthor'] as string,
      activityTitle: activityDefinition['activityTitle'] as string,
      allowedResponseTypes: activityDefinition['allowedResponseTypes'] as AllowedResponseType[],
      artworks: activityDefinition['artworks'] as string[],
      beginsOn: activityDefinition['beginsOn'] as Date,
      endsOn: activityDefinition['endsOn'] as Date,
      minArtworks: activityDefinition['minArtworks'] as number,
      maxArtworks: activityDefinition['maxArtworks'] as number,
      storyDefinitionsDatasetUuid: activityDefinition['storyDefinitionsDatasetUuid'] as string,
      activityDefinitionsDatasetUuid: activityDefinition['activityDefinitionsDatasetUuid'] as string,
      artworksDatasetUuid: activityDefinition['artworksDatasetUuid'] as string
    };
    return gamGameApi.submitGamGameActivityDefinition(def);
  };
  const [submitDefinitionStatus] = useAsyncRequest(submitDefinition, [submitGame]);

  useEffect(() => {
    if (submitDefinitionStatus.kind === 'success' && submitDefinitionStatus.result.kind === 'ok') {
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
            { name: 'Stage Settings'.toUpperCase(), completed: isStageTwoCompleted(activityDefinition) },
            { name: 'Artwork Selection'.toUpperCase(), completed: isStageThreeCompleted(activityDefinition) }
          ]}
          onSubmitActivity={() => setSubmitGame(true)}
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
        <Step title='Basic Information' component={BasicInformationStep} />
        <Step title='Stage Settings' component={ConfigureStageParamsStep} />
        <Step title='Select Artworks' component={SelectArtworksStep} />
      </Steps>
    </Root>
  );
}

export default CreateGamGameActivityScreen;