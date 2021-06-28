import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Fader from '../components/Fader';
import GameOverviewPanel from '../CreateGame/GameOverviewPanel';
import RecordAudio from '../CreateGame/RecordAudio';
import SelectArtwork from '../CreateGame/SelectArtwork';
import WriteHints from '../CreateGame/WriteHints';
import WritePrizes from '../CreateGame/WriteGifts';
import { ArtworkData, CompletedTreasureHuntDefinition, InProgressTreasureHuntDefinition, InProgressTreasureHuntStage } from '../services/commonDefinitions';
import { useParams } from 'react-router';
import { useAsyncRequest } from '../services/useAsyncRequest';
import { api } from '../services';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const isStageCompleted = (stage: InProgressTreasureHuntStage): boolean => {
  return stage.artworkId !== undefined &&
    stage.clues !== undefined && stage.clues.length > 0 && stage.clues.every(elem => elem.length > 0) &&
    stage.multimediaData !== undefined && stage.multimediaData.length > 0 &&
    stage.multimediaData.length > 0 && stage.multimediaData.every(
      elem => elem.kind === 'Text' ?
        (elem.text && elem.text.length > 0) :
        (elem.src && elem.src.length > 0)
    );
};

type StageStatus = 'select-artwork' | 'write-hints' | 'record-audio' | 'write-prizes' | 'none';

const CreateTreasureHuntScreen: React.FC = () => {

  let { id } = useParams<{ id: string }>();

  const fetchActivityDefinition = async () => {
    return await api.getFindArtworkActivityDefinitionById(id);
  };

  const [submitGame, setSubmitGame] = useState<boolean>(false);

  const submitDefinition = () => {
    if (!submitGame) return Promise.reject();
    setSubmitGame(false);
    return api.submitTreasureHuntDefinition({ ...(treasureHuntDefinition as CompletedTreasureHuntDefinition) });
  };

  const fetchActivityArtworks = async () => {
    if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
      return Promise.reject();
    }
    return api.fetchArtworks({ filter: { ids: fetchActivityDefinitionStatus.result.data[0].artworks } });
  };

  const [fetchActivityDefinitionStatus] = useAsyncRequest(fetchActivityDefinition, []);
  const [fetchActivityArtworksStatus] = useAsyncRequest(fetchActivityArtworks, [fetchActivityDefinitionStatus]);
  const [submitGameStatus] = useAsyncRequest(submitDefinition, [submitGame]);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [treasureHuntDefinition, setTreasureHuntDefinition] = useState<InProgressTreasureHuntDefinition>({
    treasureHuntAuthor: '',
    activityId: id,
    stages: [{
      artworkId: undefined,
      clues: [],
      multimediaData: []
    }]
  });

  const [activeStageStatus, setActiveStageStatus] = useState<StageStatus>('select-artwork');
  const [displayedState, setDisplayedState] = useState<StageStatus>('select-artwork');

  const handleAddStage = () => {
    if (fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok') {
      const definition = fetchActivityDefinitionStatus.result.data[0];
      setTreasureHuntDefinition(prev => ({
        ...prev, stages: [...prev.stages, {
          artworkId: undefined,
          clues: Array.from(Array(definition.minCluesPerStage).keys()).map(_ => ''),
          multimediaData: [{ kind: 'Text', text: '' }]
        }]
      }));
    }
  };

  const handleSelectArtwork = (artworkId: string) => {
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev.stages));
      aux[activeStage].artworkId = artworkId;
      return { ...prev, stages: aux };
    });
  };

  const handleRemoveHint = (index: number) => {
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev.stages));
      const filtClues = aux[activeStage].clues.filter((_, ind) => ind !== index);
      aux[activeStage].clues = filtClues;
      return { ...prev, stages: aux };
    });
  };

  const handleAddHint = () => {
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev.stages));
      aux[activeStage].clues.push('');
      return { ...prev, stages: aux };
    });
  };

  const handleUpdateHint = (text: string, index: number) => {
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev.stages));
      aux[activeStage].clues[index] = text;
      return { ...prev, stages: aux };
    });
  };


  const handleRemovePrize = (index: number) => {
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev.stages));
      const filtPrizes = aux[activeStage].multimediaData.filter((_, ind) => ind !== index);
      aux[activeStage].multimediaData = filtPrizes;
      return { ...prev, stages: aux };
    });
  };

  const handleAddPrize = () => {
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev.stages));
      aux[activeStage].multimediaData.push({ kind: 'Text', text: '' });
      return { ...prev, stages: aux };
    });
  };

  const handleUpdatePrize = (index: number, content: string) => {
    setTreasureHuntDefinition(prev => {
      let aux: InProgressTreasureHuntStage[] = JSON.parse(JSON.stringify(prev.stages));
      let multimediaData = aux[activeStage].multimediaData[index];
      if (multimediaData.kind === 'Text') {
        multimediaData.text = content;
      }
      else {
        multimediaData.src = content;
      }
      return { ...prev, stages: aux };
    });
  };

  const handleSelectStage = (index: number) => {
    setActiveStage(index);
    setActiveStageStatus('select-artwork');
    setDisplayedState('select-artwork');
  };

  const retrieveArtworkById = (artworkId?: string): ArtworkData | undefined => {
    if (!artworkId || !(fetchActivityArtworksStatus.kind === 'success' && fetchActivityArtworksStatus.result.kind === 'ok')) {
      return undefined;
    }
    return fetchActivityArtworksStatus.result.data.artworks.find(artw => artw.id === artworkId);
  };

  useEffect(() => {
    if (fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok') {
      const definition = fetchActivityDefinitionStatus.result.data[0];
      setTreasureHuntDefinition(prev => ({
        ...prev,
        stages: Array.from(Array(definition.minStages).keys()).map(_ => ({
          artworkId: undefined,
          clues: Array.from(Array(definition.minCluesPerStage).keys()).map(_ => ''),
          multimediaData: [{ kind: 'Text', text: '' }]
        }))
      }));
    }
  }, [fetchActivityDefinitionStatus]);


  useEffect(() => {
    if (submitGameStatus.kind === 'success' && submitGameStatus.result.kind === 'ok') {
      window.alert('Your treasure hunt was successfully uploaded to the linked data hub.');
    }
  }, [submitGameStatus]);

  if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
    return <p>Fetching activity definition...</p>;
  }

  if (!(fetchActivityArtworksStatus.kind === 'success' && fetchActivityArtworksStatus.result.kind === 'ok')) {
    return <p>Fetching activity artworks...</p>;
  }

  return (
    <Root>
      <GameOverviewPanel
        activeStage={activeStage}
        stagesCompleted={treasureHuntDefinition.stages.map(isStageCompleted)}
        minStages={fetchActivityDefinitionStatus.result.data[0].minStages}
        maxStages={fetchActivityDefinitionStatus.result.data[0].maxStages}
        onAddNewStage={handleAddStage}
        onStageSelected={handleSelectStage}
        onSubmitGame={() => setSubmitGame(true)}
      />
      {activeStageStatus === 'select-artwork' &&
        <Fader
          show={displayedState === 'select-artwork'}
          transitionTime={1.25}
          onAnimationCompleted={() => setActiveStageStatus(displayedState)}
        >
          <SelectArtwork
            key={activeStage || ''}
            titleText={fetchActivityDefinitionStatus.result.data[0].activityTitle}
            imagesData={fetchActivityArtworksStatus.result.data.artworks}
            selectedArtwork={treasureHuntDefinition.stages[activeStage]?.artworkId}
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
            hints={treasureHuntDefinition.stages[activeStage].clues}
            imageSrc={retrieveArtworkById(treasureHuntDefinition.stages[activeStage].artworkId)?.src || ''}
            onAddNewHint={handleAddHint}
            onRemoveHint={handleRemoveHint}
            onUpdateHint={handleUpdateHint}
            onNextClicked={() => setDisplayedState('write-prizes')}
            onBackClicked={() => setDisplayedState('select-artwork')}
            minHints={fetchActivityDefinitionStatus.result.data[0]?.minCluesPerStage || 1}
            maxHints={fetchActivityDefinitionStatus.result.data[0]?.maxCluesPerStage || 10}
          />
        </Fader>
      }


      {activeStageStatus === 'write-prizes' &&
        <Fader
          show={displayedState === 'write-prizes'}
          transitionTime={1.25}
          onAnimationCompleted={() => {
            if (displayedState === 'select-artwork') {
              setActiveStage(prev => prev + 1);
            }
            setActiveStageStatus(displayedState);
          }}
        >
          <WritePrizes
            prizes={treasureHuntDefinition.stages[activeStage]?.multimediaData.map(elem => elem.kind === 'Text' ? elem.text : elem.src) || []}
            imageSrc={retrieveArtworkById(treasureHuntDefinition.stages[activeStage].artworkId!)!.src}
            onAddNewPrize={handleAddPrize}
            onRemovePrize={(ind: number) => handleRemovePrize(ind)}
            onUpdatePrize={handleUpdatePrize}
            onNextClicked={() => setDisplayedState('select-artwork')}
            onBackClicked={() => setDisplayedState('write-hints')}
            canClickNext={activeStage + 1 < treasureHuntDefinition.stages.length}
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
            imageSrc={retrieveArtworkById(treasureHuntDefinition.stages[activeStage].artworkId!)!.src}
            onRecordingReady={() => { }}
            canClickNext={activeStage + 1 < treasureHuntDefinition.stages.length}
            onNextClicked={() => setDisplayedState('select-artwork')}
            onBackClicked={() => setDisplayedState('write-hints')}
          />
        </Fader>
      }
    </Root>
  );
}

export default CreateTreasureHuntScreen;