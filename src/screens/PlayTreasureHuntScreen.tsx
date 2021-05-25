import React, { useState } from 'react';
import styled from 'styled-components';
import FindArtwork from '../FindArtwork/FindArtwork';
import Fader from '../components/Fader';
import { ArtworkData, StageData } from '../services/commonDefinitions';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

interface PlayTreasureHuntScreenProps {
  stages: StageData[];
  artworks: ArtworkData[];
};

const PlayTreasureHuntScreen: React.FC<PlayTreasureHuntScreenProps> = ({ stages, artworks }) => {

  const [activeStage, setActiveStage] = useState<number>(0);
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [currentScore, setCurrentScore] = useState<number>(100);

  const handleStageCompleted = () => {
    setShowPanel(false);
  };

  const updateActiveStage = () => {
    setActiveStage((activeStage + 1) % stages.length);
    setShowPanel(true);
  };

  return (
    <Root>
      <Fader
        transitionTime={3}
        show={showPanel}
        onAnimationCompleted={updateActiveStage}
      >
        <FindArtwork
          onPointsUpdate={(value: number) => setCurrentScore(prev => prev + value)}
          score={currentScore}
          stageData={stages[activeStage]}
          imagesData={artworks}
          onStageCompleted={handleStageCompleted}
        />
      </Fader>
    </Root>
  );
}

export default PlayTreasureHuntScreen;