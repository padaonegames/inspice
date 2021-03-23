import React, { useState } from 'react';
import styled from 'styled-components';
import { sampleArtworks } from '../artworks/artworkData';
import GameOverviewPanel from '../CreateGame/GameOverviewPanel';
import SelectArtwork from '../CreateGame/SelectArtwork';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

interface InProgressStage {
  clues: string[] | undefined;
  artworkId: string | undefined;
  recordingSrc: string | undefined;
};

const isStageCompleted = (stage: InProgressStage): boolean => {
  return stage.artworkId !== undefined &&
  stage.clues !== undefined &&
  stage.recordingSrc !== undefined;
};

const defaultStage: InProgressStage = {
  clues: undefined,
  artworkId: undefined,
  recordingSrc: undefined
};

const CreateGameScreen: React.FC = () => {

  const [activeStage, setActiveStage] = useState<number>(0);
  const [stageList, setStageList] = useState<InProgressStage[]>([defaultStage]);

  const handleAddStage = () => {
    setStageList(prev => [...prev, defaultStage]);
  };

  const handleSelectArtwork = (artworkId: string) => {
    setStageList(prev => {
      let aux = prev.slice();
      aux[activeStage].artworkId = artworkId;
      return aux;
    });
  };

  return (
    <Root>
      <GameOverviewPanel
        activeStage={activeStage}
        stagesCompleted={stageList.map(isStageCompleted)}
        onAddNewStage={handleAddStage}
        onStageSelected={(index: number) => setActiveStage(index)}
        onSubmitGame={() => {}}
      />
      <SelectArtwork
        imagesData={sampleArtworks}
        selectedArtwork={stageList[activeStage].artworkId}
        onArtworkSelected={handleSelectArtwork}
        onNextClicked={() => {}}
      />
    </Root>
  );
}

export default CreateGameScreen;