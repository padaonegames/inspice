import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConfigureStageParamsStage from '../CreateFindArtworkActivity/ConfigureStageParamsStage';
import CreateFindArtworkOverviewPanel from '../CreateFindArtworkActivity/CreateFindArtworkOverviewPanel';
import SetTitleAuthorDatesStage from '../CreateFindArtworkActivity/SetTitleAuthorDatesStage';
import NextCornerButton from '../CreateGame/NextCornerButton';
import { api } from '../services';
import { CompletedFindArtworkActivityDefinition, InProgressFindArtworkActivityDefinition } from '../services/commonDefinitions';
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
    definition.maxStages !== undefined;
}

const isStageThreeCompleted = (definition: InProgressFindArtworkActivityDefinition): boolean => {
  return definition.artworks.length > 0;
}

const sample: CompletedFindArtworkActivityDefinition = {
  activityTitle: 'demo',
  activityAuthor: 'imma',
  beginsOn: new Date(),
  endsOn: new Date(),
  minStages: 1,
  maxStages: 3,
  minCluesPerStage: 1,
  maxCluesPerStage: 3,
  allowedInputs: ['Text'],
  huntPersistenceLocationPost: 'sample/post',
  huntPersistenceLocationGet: 'sample/get',
  artworks: ['1']
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

  useEffect(() => {
    console.log(submitDefinitionStatus);
  }, [submitDefinitionStatus]);

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
          initialTitle={sample.activityTitle}
          initialAuthor={sample.activityAuthor}
          initialFrom={sample.beginsOn}
          initialTo={sample.endsOn}
        />
      }

      { activeActivityDefinitionStatus === 'configure-stage-params' &&
        <ConfigureStageParamsStage
        onMinStagesChange={(minStages) => setActivityDefinition(prev => ({ ...prev, minStages: minStages }))}
        onMaxStagesChange={(maxStages) => setActivityDefinition(prev => ({ ...prev, maxStages: maxStages }))}
        onMinCluesChange={(minClues) => setActivityDefinition(prev => ({ ...prev, minCluesPerStage: minClues }))}
        onMaxCluesChange={(maxClues) => setActivityDefinition(prev => ({ ...prev, maxCluesPerStage: maxClues }))}
        initialMinStages={1}
        initialMaxStages={4}
        initialMinClues={1}
        initialMaxClues={4}
        />
      }

      { activeActivityDefinitionStatus === 'select-artworks' &&
        <p>Select Artworks</p>
      }

      { activeActivityDefinitionStatus === 'none' &&
        <p>None</p>
      }
      <NextCornerButton
        onNextClicked={() => setActiveActivityDefinitionStatus('configure-stage-params')}
        color='#000000'
      />
    </Root>
  );
}

export default CreateFindArtworkActivityScreen;