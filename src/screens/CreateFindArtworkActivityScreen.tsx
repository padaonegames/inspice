import React, { useState } from 'react';
import styled from 'styled-components';
import CreateFindArtworkOverviewPanel from '../CreateFindArtworkActivity/CreateFindArtworkOverviewPanel';
import { AllowedInputs } from '../services/commonDefinitions';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

interface InProgressActivityDefinition {
  activityTitle: string | undefined;
  activityAuthor: string | undefined;
  beginsOn: Date | undefined;
  endsOn: Date | undefined;
  minStages: number | undefined;
  maxStages: number | undefined;
  minCluesPerStage: number | undefined;
  maxCluesPerStage: number | undefined;
  allowedInputs: AllowedInputs[];
  huntPersistenceLocationPost: string | undefined;
  huntPersistenceLocationGet: string | undefined;
  artworks: string[];
};

const isActivityDefinitionCompleted = (definition: InProgressActivityDefinition): boolean => {
  return isStageOneCompleted(definition) &&
    isStageTwoCompleted(definition) &&
    isStageThreeCompleted(definition);
};

const isStageOneCompleted = (definition: InProgressActivityDefinition): boolean => {
  return definition.activityAuthor !== undefined &&
    definition.activityTitle !== undefined &&
    definition.beginsOn !== undefined &&
    definition.endsOn !== undefined;
}

const isStageTwoCompleted = (definition: InProgressActivityDefinition): boolean => {
  return definition.minCluesPerStage !== undefined &&
    definition.maxCluesPerStage !== undefined &&
    definition.minStages !== undefined &&
    definition.maxStages !== undefined;
}

const isStageThreeCompleted = (definition: InProgressActivityDefinition): boolean => {
  return definition.artworks.length > 0;
}

const defaultActivityDefinition: InProgressActivityDefinition = {
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minStages: undefined,
  maxStages: undefined,
  minCluesPerStage: undefined,
  maxCluesPerStage: undefined,
  allowedInputs: [],
  huntPersistenceLocationPost: undefined,
  huntPersistenceLocationGet: undefined,
  artworks: []
};

type ActivityDefinitionStatus = 'set-title-author-dates' | 'configure-stage-params' | 'select-artworks' | 'none';

const CreateFindArtworkActivityScreen: React.FC = () => {

  const [activityDefinition, setActivityDefinition] = useState<InProgressActivityDefinition>(defaultActivityDefinition);
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