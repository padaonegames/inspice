import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConfigureStageParamsStage from '../CreateFindArtworkActivity/ConfigureStageParamsStage';
import CreateFindArtworkOverviewPanel from '../CreateFindArtworkActivity/CreateFindArtworkOverviewPanel';
import SelectArtworksStage from '../CreateFindArtworkActivity/SelectArtworksStage';
import SetTitleAuthorDatesStage from '../CreateFindArtworkActivity/SetTitleAuthorDatesStage';
import NextCornerButton from '../CreateGame/NextCornerButton';
import { api } from '../services';
import { AllowedInputs, CompletedFindArtworkActivityDefinition, InProgressFindArtworkActivityDefinition } from '../services/commonDefinitions';
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
  huntPersistenceLocation: process.env.REACT_APP_HUNT_LOCATION || 'sample/post',
  artworks: []
};

type ActivityDefinitionStatus = 'set-title-author-dates' | 'configure-stage-params' | 'select-artworks' | 'none';

const CreateFindArtworkActivityScreen: React.FC = () => {

  const [activityDefinition, setActivityDefinition] =
    useState<InProgressFindArtworkActivityDefinition>(sample);
  const [activeActivityDefinitionStatus, setActiveActivityDefinitionStatus] =
    useState<ActivityDefinitionStatus>('set-title-author-dates');


  // TODO: All of these requests are just for testing/ demonstration purposes and should eventually be removed.
  const submitDefinition = () => {
    return api.submitFindArtworkActivityDefinition({ ...(activityDefinition as CompletedFindArtworkActivityDefinition) });
  };
  const [submitDefinitionStatus, triggerRequest] = useAsyncRequest(submitDefinition, [], false);

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

  const handleArtworkSelected = (artworkId: string) => {
    // add to list
    setActivityDefinition(prev => ({ ...prev, artworks: [...prev.artworks, artworkId] }));
  };

  const handleArtworkDeselected = (artworkId: string) => {
    console.log("deselected");
    // remove from list
    setActivityDefinition(prev => ({ ...prev, artworks: prev.artworks.filter(elem => elem !== artworkId) }));
  };

  useEffect(() => {
    console.log(activityDefinition);
  }, [activityDefinition]);


  return (
    <Root>
      <CreateFindArtworkOverviewPanel
        activeStage={activeStageToIndex()}
        stages={[
          { name: 'Basic Information'.toUpperCase(), completed: isStageOneCompleted(activityDefinition) },
          { name: 'Stage Settings'.toUpperCase(), completed: isStageTwoCompleted(activityDefinition) },
          { name: 'Artwork Selection'.toUpperCase(), completed: isStageThreeCompleted(activityDefinition) }
        ]}
        onStageSelected={(index) => setActiveActivityDefinitionStatus(indexToActiveStage(index))}
        onSubmitGame={triggerRequest}
      />

      { activeActivityDefinitionStatus === 'set-title-author-dates' &&
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

      { activeActivityDefinitionStatus === 'configure-stage-params' &&
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

      { activeActivityDefinitionStatus === 'select-artworks' &&
        <SelectArtworksStage
          onArtworkSelected={handleArtworkSelected}
          onArtworkDeselected={handleArtworkDeselected}
          selectedArtworks={activityDefinition.artworks}
        />
      }

      { activeActivityDefinitionStatus === 'none' &&
        <p>None</p>
      }
    </Root>
  );
}

export default CreateFindArtworkActivityScreen;