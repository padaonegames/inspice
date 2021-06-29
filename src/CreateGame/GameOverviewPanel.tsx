import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ProgressLine from '../CreateFindArtworkActivity/ProgressLine';

import AddStagePanel from './AddStagePanel';

const Root = styled.div`
  padding-top: 1vh;
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

interface GameOverviewPanelProps {
  minStages: number;
  maxStages: number;
  activeStage: number;
  stagesCompleted: boolean[];
  onAddNewStage: () => void;
  onSubmitGame: () => void;
  onStageSelected: (index: number) => void;
};

const GameOverviewPanel: React.FC<GameOverviewPanelProps> = ({
  minStages,
  maxStages,
  activeStage,
  stagesCompleted,
  onAddNewStage,
  onSubmitGame,
  onStageSelected
}) => {

  const { t } = useTranslation('app');
  
  return (
    <Root>
      <UpperRowContainer>
        <ProgressLine
          currentItem={activeStage + 1}
          items={stagesCompleted.map((elem, index) => ({ name: index === 0 ? 'BASIC INFORMATION' : `PHASE ${index}`, completed: elem }))}
          onItemSelected={(index) => onStageSelected(index - 1)}
          onSubmit={onSubmitGame}
          finalItemCaption={t('submitGame')}
        />
        <AddStagePanel
          enabled={stagesCompleted.length < maxStages}
          onButtonClicked={onAddNewStage}
        />
      </UpperRowContainer>
    </Root>
  );
}

export default GameOverviewPanel;