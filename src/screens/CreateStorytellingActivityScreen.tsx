import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActivityCreationOverviewPanel } from '../components/Navigation/ActivityCreationOverviewPanel';
import ConfigureStageParamsStage from '../CreateFindArtworkActivity/ConfigureStageParamsStage';
import SelectArtworksStage from '../CreateFindArtworkActivity/SelectArtworksStage';
import SetTitleAuthorDatesStage from '../CreateFindArtworkActivity/SetTitleAuthorDatesStage';
import { api } from '../services';
import { ArtworkData } from '../services/artwork.model';
import { AllowedInputs } from '../services/findArtworkActivity.model';
import { InProgressStorytellingActivityDefinition, CompletedStorytellingActivityDefinition } from '../services/storytellingActivity.model';
import { useAsyncRequest } from '../services/useAsyncRequest';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const isStageOneCompleted = (definition: InProgressStorytellingActivityDefinition): boolean => {
  return definition.activityAuthor !== undefined && definition.activityAuthor.length > 0 &&
    definition.activityTitle !== undefined && definition.activityTitle.length > 0 &&
    definition.beginsOn !== undefined &&
    definition.endsOn !== undefined;
}

const isStageTwoCompleted = (definition: InProgressStorytellingActivityDefinition): boolean => {
  return definition.minCluesPerStage !== undefined &&
    definition.maxCluesPerStage !== undefined &&
    definition.minStages !== undefined &&
    definition.maxStages !== undefined &&
    definition.allowedInputs.length > 0;
}

const isStageThreeCompleted = (definition: InProgressStorytellingActivityDefinition): boolean => {
  return definition.artworks.length > 0;
}

const sample: InProgressStorytellingActivityDefinition = {
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minStages: 1,
  maxStages: 5,
  minCluesPerStage: 1,
  maxCluesPerStage: 5,
  allowedInputs: [],
  storyDefinitionsDatasetUuid: process.env.REACT_APP_HUNT_DEFINITIONS_DATASET_UUID || '',
  activityDefinitionsDatasetUuid: process.env.REACT_APP_ACTIVITY_DEFINITIONS_DATASET_UUID || '',
  artworksDatasetUuid: process.env.REACT_APP_DATASET_UUID || '',
  artworks: []
};

type ActivityDefinitionStatus = 'set-title-author-dates' | 'configure-stage-params' | 'select-artworks' | 'none';

/**
 * Screen to encapsulate the creation flow of a storytelling creation activity.
 */
export const CreateStorytellingActivityScreen: React.FC = () => {

  const [activityDefinition, setActivityDefinition] =
    useState<InProgressStorytellingActivityDefinition>(sample);
  const [activeActivityDefinitionStatus, setActiveActivityDefinitionStatus] =
    useState<ActivityDefinitionStatus>('set-title-author-dates');
  const [submitGame, setSubmitGame] = useState<boolean>(false);
  const [selectedArtworks, setSelectedArtworks] = useState<ArtworkData[]>([]);

  const submitDefinition = () => {
    if (!submitGame) return Promise.reject();
    setSubmitGame(false);
    // return api.submitFindArtworkActivityDefinition({ ...(activityDefinition as CompletedStorytellingActivityDefinition) });
    return Promise.reject();
  };
  const [submitDefinitionStatus] = useAsyncRequest(submitDefinition, [submitGame]);

  useEffect(() => {
    if (submitDefinitionStatus.kind === 'success' /*&& submitDefinitionStatus.result.kind === 'ok'*/) {
      window.alert('Your activity was successfully uploaded to the linked data hub.');
    }
  }, [submitDefinitionStatus]);

  const activeStageToIndex = (): number => {
    switch (activeActivityDefinitionStatus) {
      case 'set-title-author-dates':
        return 0;
      case 'configure-stage-params':
        return 1;
      case 'select-artworks':
        return 2;
      default:
        return -1;
    }
  };

  const indexToActiveStage = (index: number): ActivityDefinitionStatus => {
    switch (index) {
      case 0:
        return 'set-title-author-dates';
      case 1:
        return 'configure-stage-params';
      case 2:
        return 'select-artworks';
      default:
        return 'none';
    }
  };

  const handleRangeSelected = (from: Date | undefined, to: Date | undefined) => {
    setActivityDefinition(prev => ({ ...prev, beginsOn: from, endsOn: to }));
  };

  const onTitleChange = (title: string) => {
    setActivityDefinition(prev => ({ ...prev, activityTitle: title }));
  };

  const onAuthorChange = (author: string) => {
    setActivityDefinition(prev => ({ ...prev, activityAuthor: author }));
  };

  const handleInputTypeToggle = (label: string) => {
    const inputType = label as AllowedInputs;
    if (inputType == null) return;

    let newInputs = [...activityDefinition.allowedInputs];
    if (newInputs.some(elem => elem === inputType)) {
      newInputs = newInputs.filter(elem => elem !== inputType);
    }
    else {
      newInputs.push(inputType);
    }
    setActivityDefinition(prev => ({ ...prev, allowedInputs: newInputs }));
  };

  const handleArtworkSelected = (artwork: ArtworkData) => {
    // add to list
    setActivityDefinition(prev => ({ ...prev, artworks: [...prev.artworks, artwork.id] }));
    setSelectedArtworks(prev => ([...prev, artwork]));
  };

  const handleArtworkDeselected = (artworkId: string) => {
    // remove from list
    setActivityDefinition(prev => ({ ...prev, artworks: prev.artworks.filter(elem => elem !== artworkId) }));
    setSelectedArtworks(prev => prev.filter(elem => elem.id !== artworkId));
  };

  return (
    <Root>
      <ActivityCreationOverviewPanel
        activeStage={activeStageToIndex()}
        stages={[
          { name: 'Basic Information'.toUpperCase(), completed: isStageOneCompleted(activityDefinition) },
          { name: 'Stage Settings'.toUpperCase(), completed: isStageTwoCompleted(activityDefinition) },
          { name: 'Artwork Selection'.toUpperCase(), completed: isStageThreeCompleted(activityDefinition) }
        ]}
        onStageSelected={(index) => setActiveActivityDefinitionStatus(indexToActiveStage(index))}
        onSubmitGame={() => setSubmitGame(true)}
      />

      {activeActivityDefinitionStatus === 'set-title-author-dates' &&
        <SetTitleAuthorDatesStage
          handleDateRangeSelected={handleRangeSelected}
          onAuthorChange={onAuthorChange}
          onTitleChange={onTitleChange}
          initialTitle={activityDefinition.activityTitle}
          initialAuthor={activityDefinition.activityAuthor}
          initialFrom={activityDefinition.beginsOn}
          initialTo={activityDefinition.endsOn}
        />
      }

      {activeActivityDefinitionStatus === 'configure-stage-params' &&
        <ConfigureStageParamsStage
          onMinStagesChange={(minStages) => setActivityDefinition(prev => ({ ...prev, minStages: minStages }))}
          onMaxStagesChange={(maxStages) => setActivityDefinition(prev => ({ ...prev, maxStages: maxStages }))}
          onMinCluesChange={(minClues) => setActivityDefinition(prev => ({ ...prev, minCluesPerStage: minClues }))}
          onMaxCluesChange={(maxClues) => setActivityDefinition(prev => ({ ...prev, maxCluesPerStage: maxClues }))}
          onInputTypeToggle={handleInputTypeToggle}
          initialMinStages={activityDefinition.minStages || 1}
          initialMaxStages={activityDefinition.maxStages || 5}
          initialMinClues={activityDefinition.minCluesPerStage || 1}
          initialMaxClues={activityDefinition.maxCluesPerStage || 5}
          initialAllowedInputTypes={activityDefinition.allowedInputs || []}
        />
      }

      {activeActivityDefinitionStatus === 'select-artworks' &&
        <SelectArtworksStage
          onArtworkSelected={handleArtworkSelected}
          onArtworkDeselected={handleArtworkDeselected}
          selectedArtworks={selectedArtworks}
        />
      }

      {activeActivityDefinitionStatus === 'none' &&
        <p>None</p>
      }
    </Root>
  );
}

export default CreateStorytellingActivityScreen;