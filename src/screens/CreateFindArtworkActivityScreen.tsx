import React, { useState } from 'react';
import styled from 'styled-components';
import CreateFindArtworkOverviewPanel from '../CreateFindArtworkActivity/CreateFindArtworkOverviewPanel';
import { defaultFindArtworkActivityDefinition, InProgressFindArtworkActivityDefinition } from '../services/commonDefinitions';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const isStageOneCompleted = (definition: InProgressFindArtworkActivityDefinition): boolean => {
  return definition.activityAuthor !== undefined &&
    definition.activityTitle !== undefined &&
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

type ActivityDefinitionStatus = 'set-title-author-dates' | 'configure-stage-params' | 'select-artworks' | 'none';

const CreateFindArtworkActivityScreen: React.FC = () => {

  const [activityDefinition, setActivityDefinition] = useState<InProgressFindArtworkActivityDefinition>(defaultFindArtworkActivityDefinition);
  const [activeActivityDefinitionStatus, setActiveActivityDefinitionStatus] = useState<ActivityDefinitionStatus>('set-title-author-dates');

  const activeStageToIndex = (): number => {
    switch(activeActivityDefinitionStatus) {
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
    switch(index) {
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
        onSubmitGame={() => {}}
      />
    </Root>
  );
}

export default CreateFindArtworkActivityScreen;