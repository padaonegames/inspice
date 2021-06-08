import React from 'react';
import styled from 'styled-components';

import AddStagePanel from './AddStagePanel';
import RoadLine from './RoadLine';
import SubmitGamePanel from './SubmitGamePanel';

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
  activeStage: number;
  stagesCompleted: boolean[];
  onAddNewStage: () => void;
  onSubmitGame: () => void;
  onStageSelected: (index: number) => void;
};

const GameOverviewPanel: React.FC<GameOverviewPanelProps> = ({
  activeStage,
  stagesCompleted,
  onAddNewStage,
  onSubmitGame,
  onStageSelected
}) => {

  return (
    <Root>
      <UpperRowContainer>
        <RoadLine
          currentStage={activeStage}
          stagesCompleted={stagesCompleted}
          onStageSelected={onStageSelected}
        />
        <AddStagePanel
          onButtonClicked={onAddNewStage}
        />
        <SubmitGamePanel
          enabled={stagesCompleted.every(elem => elem)}
          onButtonClicked={onSubmitGame}
        />
      </UpperRowContainer>
    </Root>
  );
}

export default GameOverviewPanel;