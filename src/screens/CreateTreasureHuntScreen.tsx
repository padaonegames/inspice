import React, { useState } from 'react';
import styled from 'styled-components';
import { sampleArtworks } from '../artworks/artworkData';
import Fader from '../components/Fader';
import GameOverviewPanel from '../CreateGame/GameOverviewPanel';
import RecordAudio from '../CreateGame/RecordAudio';
import SelectArtwork from '../CreateGame/SelectArtwork';
import WriteHints from '../CreateGame/WriteHints';
import { ArtworkData, defaultTreasureHuntStage, InProgressTreasureHuntStage } from '../services/commonDefinitions';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const isStageCompleted = (stage: InProgressTreasureHuntStage): boolean => {
  return stage.artworkId !== undefined &&
    stage.clues !== undefined && stage.clues.length > 0 &&
    stage.recordingSrc !== undefined;
};

type StageStatus = 'select-artwork' | 'write-hints' | 'record-audio' | 'none';

const CreateTreasureHuntScreen: React.FC = () => {

  // TODO: change data types to match the ones from commonDefinitions.ts
  // that is, TreasureHuntDefinition/ InProgressTreasureHuntDefinition
  const [activeStage, setActiveStage] = useState<number>(0);
  const [stageList, setStageList] = useState<InProgressTreasureHuntStage[]>([defaultTreasureHuntStage]);

  const [activeStageStatus, setActiveStageStatus] = useState<StageStatus>('select-artwork');
  const [displayedState, setDisplayedState] = useState<StageStatus>('select-artwork');

  const handleAddStage = () => {
    setStageList(prev => [...prev, defaultTreasureHuntStage]);
  };

  const handleSelectArtwork = (artworkId: string) => {
    setStageList(prev => {
      let aux = prev.slice();
      aux[activeStage].artworkId = artworkId;
      return aux;
    });
  };

  const handleRemoveHint = (index: number) => {
    setStageList(prev => {
      let aux = prev.slice();
      const filtClues = aux[activeStage].clues.filter((_, ind) => ind !== index);
      aux[activeStage].clues = filtClues;
      return aux;
    });
  };

  const handleAddHint = () => {
    setStageList(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev));
      aux[activeStage].clues.push('');
      return aux;
    });
  };

  const handleUpdateHint = (text: string, index: number) => {
    setStageList(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev));
      aux[activeStage].clues[index] = text;
      return aux;
    });
  };

  const handleRecordingReady = (audioURL: string) => {
    setStageList(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev));
      aux[activeStage].recordingSrc = audioURL;
      return aux;
    });
  };

  const handleSelectStage = (index: number) => {
    setActiveStage(index);
    setActiveStageStatus('select-artwork');
    setDisplayedState('select-artwork');
  };

  const retrieveArtworkById = (artworkId: string): ArtworkData | undefined => {
    return sampleArtworks.find(artw => artw.id === artworkId);
  };

  return (
    <Root>
      <GameOverviewPanel
        activeStage={activeStage}
        stagesCompleted={stageList.map(isStageCompleted)}
        onAddNewStage={handleAddStage}
        onStageSelected={handleSelectStage}
        onSubmitGame={() => { }}
      />
      {activeStageStatus === 'select-artwork' &&
        <Fader
          show={displayedState === 'select-artwork'}
          transitionTime={1.25}
          onAnimationCompleted={() => setActiveStageStatus(displayedState)}
        >
          <SelectArtwork
            imagesData={sampleArtworks}
            selectedArtwork={stageList[activeStage].artworkId}
            onArtworkSelected={handleSelectArtwork}
            onNextClicked={() => setDisplayedState('write-hints')}
          />
        </Fader>
      }

      {activeStageStatus === 'write-hints' &&
        <Fader
          show={displayedState === 'write-hints'}
          transitionTime={1.25}
          onAnimationCompleted={() => setActiveStageStatus(displayedState)}
        >
          <WriteHints
            hints={stageList[activeStage].clues}
            imageSrc={retrieveArtworkById(stageList[activeStage].artworkId!)!.src}
            onAddNewHint={handleAddHint}
            onRemoveHint={(ind: number) => handleRemoveHint(ind)}
            onUpdateHint={handleUpdateHint}
            onNextClicked={() => setDisplayedState('record-audio')}
            onBackClicked={() => setDisplayedState('select-artwork')}
          />
        </Fader>
      }

      {activeStageStatus === 'record-audio' &&
        <Fader
          show={displayedState === 'record-audio'}
          transitionTime={1.25}
          onAnimationCompleted={() => {
            if (displayedState === 'select-artwork') {
              setActiveStage(prev => prev + 1);
            }
            setActiveStageStatus(displayedState);
          }}
        >
          <RecordAudio
            imageSrc={retrieveArtworkById(stageList[activeStage].artworkId!)!.src}
            onRecordingReady={handleRecordingReady}
            canClickNext={activeStage + 1 < stageList.length}
            onNextClicked={() => setDisplayedState('select-artwork')}
            onBackClicked={() => setDisplayedState('write-hints')}
          />
        </Fader>
      }
    </Root>
  );
}

export default CreateTreasureHuntScreen;