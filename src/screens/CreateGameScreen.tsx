import React, { useState } from 'react';
import styled from 'styled-components';
import FindArtwork from '../FindArtwork/FindArtwork';
import { sampleArtworks } from '../artworks/artworkData';
import { stage0, stage1 } from '../artworks/stageData';
import Fader from '../components/Fader';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const stages = [stage0, stage1];

const CreateGameScreen: React.FC = () => {

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
          imagesData={sampleArtworks}
          onStageCompleted={handleStageCompleted}
        />
      </Fader>
    </Root>
  );
}

export default CreateGameScreen;