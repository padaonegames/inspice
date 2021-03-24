import React, { useState } from 'react';
import styled from 'styled-components';
import FindArtwork from '../FindArtwork/FindArtwork';
import { ArtworkData } from '../artworks/artworkData';
import { StageData } from '../artworks/stageData';
import Fader from '../components/Fader';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

interface FindArtworkScreenProps {
  stages: StageData[];
  artworks: ArtworkData[];
};

const FindArtworkScreen: React.FC<FindArtworkScreenProps> = ({ stages, artworks }) => {

  const [activeStage, setActiveStage] = useState<number>(0);
  const [showPanel, setShowPanel] = useState<boolean>(true);

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
          stageData={stages[activeStage]}
          imagesData={artworks}
          onStageCompleted={handleStageCompleted}
        />
      </Fader>
    </Root>
  );
}

export default FindArtworkScreen;