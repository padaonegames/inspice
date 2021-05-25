import React from 'react';
import styled from 'styled-components';

import ProgressLine from './ProgressLine';
import SubmitActivityPanel from './SubmitActivityPanel';

const Root = styled.div`
  margin-top: 1vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
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

interface CreateFindArtworkOverviewPanelProps {
  activeStage: number;
  stages: { name: string, completed: boolean }[];
  onSubmitGame: () => void;
  onStageSelected: (index: number) => void;
};

const CreateFindArtworkOverviewPanel: React.FC<CreateFindArtworkOverviewPanelProps> = ({
  activeStage,
  stages,
  onSubmitGame,
  onStageSelected
}) => {

  return (
    <Root>
      <UpperRowContainer>
        <ProgressLine
          currentStage={activeStage}
          stages={stages}
          onStageSelected={onStageSelected}
        />
        <SubmitActivityPanel
          enabled={stages.every(elem => elem.completed)}
          onButtonClicked={onSubmitGame}
        />
      </UpperRowContainer>
    </Root>
  );
}

export default CreateFindArtworkOverviewPanel;