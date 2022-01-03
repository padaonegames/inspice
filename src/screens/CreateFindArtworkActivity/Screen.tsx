import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// navigation
import ActivityCreationOverviewPanel, { ActivityCreationOverviewPanelProps } from '../../components/Navigation/ActivityCreationOverviewPanel copy';

// services
import { api } from '../../services';
import { useAsyncRequest } from '../../services/useAsyncRequest';
import { CompletedFindArtworkActivityDefinition, AllowedInputs } from '../../services/findArtworkActivity.model';

// steps
import { State, Step, Steps, StepsConfig } from '../../components/Navigation/Steps';
import BasicInformationStep from './Steps/BasicInformationStep';
import ConfigureStageParamsStep from './Steps/ConfigureStageParamsStep';
import SelectArtworksStep from './Steps/SelectArtworksStep';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------
//                 State Definition
//-------------------------------------------------------
const sample: State = {
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minStages: 1,
  maxStages: 5,
  minCluesPerStage: 1,
  maxCluesPerStage: 5,
  allowedInputs: [],
  huntDefinitionsDatasetUuid: process.env.REACT_APP_HUNT_DEFINITIONS_DATASET_UUID || '',
  activityDefinitionsDatasetUuid: process.env.REACT_APP_ACTIVITY_DEFINITIONS_DATASET_UUID || '',
  artworksDatasetUuid: process.env.REACT_APP_DATASET_UUID || '',
  artworks: []
};

const isStageOneCompleted = (definition: State): boolean => {
  return definition['activityAuthor'] as string !== undefined && (definition['activityAuthor'] as string).length > 0 &&
    definition['activityTitle'] as string !== undefined && (definition['activityTitle'] as string).length > 0 &&
    definition['beginsOn'] as Date !== undefined &&
    definition['endsOn'] as Date !== undefined;
}

const isStageTwoCompleted = (definition: State): boolean => {
  return definition['minCluesPerStage'] as number !== undefined &&
    definition['maxCluesPerStage'] as number !== undefined &&
    definition['minStages'] as number !== undefined &&
    definition['maxStages'] as number !== undefined &&
    (definition['allowedInputs'] as AllowedInputs).length > 0;
}

const isStageThreeCompleted = (definition: State): boolean => {
  return (definition['artworks'] as string[]).length > 0;
}

/**
 * Screen to encapsulate the creation flow of a treasure hunt creation activity.
 * 
 * + Input basic information:
 * 
 * <img src="media://FindArtwork-curator-create-dark-01.PNG" alt="FindArtwork [curator-create-dark-01]">
 * 
 * + Date range:
 * 
 * <img src="media://FindArtwork-curator-create-dark-02.PNG" alt="FindArtwork [curator-create-dark-02]">
 * 
 * + Stage Settings:
 * 
 * <img src="media://FindArtwork-curator-create-dark-03.PNG" alt="FindArtwork [curator-create-dark-03]">
 * 
 * + Select Artworks:
 * 
 * <img src="media://FindArtwork-curator-create-dark-04.PNG" alt="FindArtwork [curator-create-dark-04]">
 * 
 * + Search Results:
 * 
 * <img src="media://FindArtwork-curator-create-dark-05.PNG" alt="FindArtwork [curator-create-dark-05]">
 * 
 * + Activity Uploaded:
 * 
 * <img src="media://FindArtwork-curator-create-dark-06.PNG" alt="FindArtwork [curator-create-dark-06]">
 * 
 */
export const CreateFindArtworkActivityScreen = () => {

  const [activityDefinition, setActivityDefinition] =
    useState<State>(sample);
  const [submitGame, setSubmitGame] = useState<boolean>(false);

  const submitDefinition = () => {
    if (!submitGame) return Promise.reject();
    setSubmitGame(false);
    return api.submitFindArtworkActivityDefinition({ ...(activityDefinition as CompletedFindArtworkActivityDefinition) });
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

export default CreateFindArtworkActivityScreen;