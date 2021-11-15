import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ProgressLine from './ProgressLine';

const Root = styled.div`
  padding-top: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #F3F3F3;
`;

const UpperRowContainer = styled.div`
  width: 100%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  height: max-content;
  display: inline-flex:
  flex-direction: row;
  align-content: center;
  border-style: solid;
  border-color: darkgrey;
  border-width: 0px 0px 1px 0px;
`;

export interface ActivityCreationOverviewPanelProps {
  activeStage: number;
  stages: { name: string, completed: boolean }[];
  onSubmitGame: () => void;
  onStageSelected: (index: number) => void;
};

export const ActivityCreationOverviewPanel: React.FC<ActivityCreationOverviewPanelProps> = ({
  activeStage,
  stages,
  onSubmitGame,
  onStageSelected
}) => {

  const { t } = useTranslation('app');
  
  return (
    <Root>
      <UpperRowContainer>
        <ProgressLine
          currentItem={activeStage}
          items={stages}
          onItemSelected={onStageSelected}
          onSubmit={onSubmitGame}
          finalItemCaption={t('submitActivity')}
        />
      </UpperRowContainer>
    </Root>
  );
}

export default ActivityCreationOverviewPanelProps;