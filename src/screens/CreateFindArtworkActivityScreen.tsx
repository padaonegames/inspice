import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ActivityCreationOverviewPanel } from '../components/Navigation/ActivityCreationOverviewPanel';
import ConfigureStageParamsStage from '../CreateFindArtworkActivity/ConfigureStageParamsStage';
import SelectArtworksStage from '../CreateFindArtworkActivity/SelectArtworksStage';
import SetTitleAuthorDatesStage from '../CreateFindArtworkActivity/SetTitleAuthorDatesStage';
import { api } from '../services';
import { ArtworkData } from '../services/artwork.model';
import { InProgressFindArtworkActivityDefinition, CompletedFindArtworkActivityDefinition, AllowedInputs } from '../services/findArtworkActivity.model';
import { useAsyncRequest } from '../services/useAsyncRequest';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const isStageOneCompleted = (definition: InProgressFindArtworkActivityDefinition): boolean => {
  return definition.activityAuthor !== undefined && definition.activityAuthor.length > 0 &&
    definition.activityTitle !== undefined && definition.activityTitle.length > 0 &&
    definition.beginsOn !== undefined &&
    definition.endsOn !== undefined;
}

const isStageTwoCompleted = (definition: InProgressFindArtworkActivityDefinition): boolean => {
  return definition.minCluesPerStage !== undefined &&
    definition.maxCluesPerStage !== undefined &&
    definition.minStages !== undefined &&
    definition.maxStages !== undefined &&
    definition.allowedInputs.length > 0;
}

const isStageThreeCompleted = (definition: InProgressFindArtworkActivityDefinition): boolean => {
  return definition.artworks.length > 0;
}

const sample: InProgressFindArtworkActivityDefinition = {
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

type ActivityDefinitionStatus = 'set-title-author-dates' | 'configure-stage-params' | 'select-artworks' | 'none';

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
export const CreateFindArtworkActivityScreen: React.FC = () => {

  const { t } = useTranslation('app');

  const [activityDefinition, setActivityDefinition] =
    useState<InProgressFindArtworkActivityDefinition>(sample);
  const [activeActivityDefinitionStatus, setActiveActivityDefinitionStatus] =
    useState<ActivityDefinitionStatus>('set-title-author-dates');
  const [submitGame, setSubmitGame] = useState<boolean>(false);
  const [selectedArtworks, setSelectedArtworks] = useState<ArtworkData[]>([]);

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

  useEffect(() => {
    console.log(submitDefinitionStatus);
  }, [submitDefinitionStatus]);


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
        onSubmitActivity={() => setSubmitGame(true)}
        finaItemCaption={t('submitActivity')}
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

export default CreateFindArtworkActivityScreen;