import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FindArtwork from '../FindArtwork/FindArtwork';
import Fader from '../components/Fader';
import { useParams } from 'react-router-dom';
import { api } from '../services';
import { useAsyncRequest } from '../services/useAsyncRequest';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayTreasureHuntScreen: React.FC = () => {

  let { id } = useParams<{ id: string }>();
  console.log(id);

  const fetchTreasureHuntDefinition = async () => {
    return await api.getTreasureHuntDefinitionById(id);
  };

  const fetchActivityArtworks = async () => {
    if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
      return Promise.reject();
    }
    return api.fetchArtworks({ filter: { ids: fetchActivityDefinitionStatus.result.data[0].artworks } });
  };

  const fetchActivityDefinition = async () => {
    if (!(fetchTreasureHuntDefinitionStatus.kind === 'success' && fetchTreasureHuntDefinitionStatus.result.kind === 'ok')) {
      return Promise.reject();
    }
    return await api.getFindArtworkActivityDefinitionById(fetchTreasureHuntDefinitionStatus.result.data[0].activityId);
  };


  const [fetchTreasureHuntDefinitionStatus] = useAsyncRequest(fetchTreasureHuntDefinition, []);
  const [fetchActivityDefinitionStatus] = useAsyncRequest(fetchActivityDefinition, [fetchTreasureHuntDefinitionStatus]);
  const [fetchActivityArtworksStatus] = useAsyncRequest(fetchActivityArtworks, [fetchActivityDefinitionStatus]);

  useEffect(() => {
    console.log(fetchTreasureHuntDefinitionStatus);
  }, [fetchTreasureHuntDefinitionStatus]);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [currentScore, setCurrentScore] = useState<number>(100);

  const handleStageCompleted = () => {
    setShowPanel(false);
  };

  const updateActiveStage = () => {
    if (fetchTreasureHuntDefinitionStatus.kind === 'success' && fetchTreasureHuntDefinitionStatus.result.kind === 'ok') {
      setActiveStage((activeStage + 1) % fetchTreasureHuntDefinitionStatus.result.data[0].stages.length);
      setShowPanel(true);
    }
  };

  if (!(fetchTreasureHuntDefinitionStatus.kind === 'success' && fetchTreasureHuntDefinitionStatus.result.kind === 'ok')) {
    return <p>Fetching treasure hunt definition...</p>;
  }

  if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
    return <p>Fetching associated activity...</p>;
  }

  if (!(fetchActivityArtworksStatus.kind === 'success' && fetchActivityArtworksStatus.result.kind === 'ok')) {
    return <p>Fetching activity artworks...</p>;
  }

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
          stageData={fetchTreasureHuntDefinitionStatus.result.data[0].stages[activeStage]}
          imagesData={fetchActivityArtworksStatus.result.data}
          onStageCompleted={handleStageCompleted}
        />
      </Fader>
    </Root>
  );
}

export default PlayTreasureHuntScreen;