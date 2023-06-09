import React, { useState } from 'react';
import styled from 'styled-components';
import FindArtwork from '../components/FindArtwork';
import Fader from '../../../components/Layout/Fader';
import { useParams } from 'react-router-dom';
import { api, artworksService } from '../../../services';
import { useAsyncRequest } from '../../../services/useAsyncRequest';
import LoadingOverlay from '../../../components/Layout/LoadingOverlay';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * 
 * + Search:
 * 
 * <img src="media://FindArtwork-consumer-play-dark-01.PNG" alt="FindArtwork [consumer-play-dark-01]">
 * 
 * + Reward:
 * 
 * <img src="media://FindArtwork-consumer-play-dark-02.PNG" alt="FindArtwork [consumer-play-dark-02]">
 * 
 */

export const PlayTreasureHuntScreen: React.FC = () => {

  let { id } = useParams() as { id: string };

  const fetchTreasureHuntDefinition = async () => {
    return await api.getTreasureHuntDefinitionById(id);
  };

  const fetchActivityArtworks = async () => {
    if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
      return Promise.reject();
    }
    console.log(`Fetch activity artworks from: ${fetchActivityDefinitionStatus.result.data[0].artworks}`);
    return artworksService.fetchArtworks({ filter: { ids: fetchActivityDefinitionStatus.result.data[0].artworks } });
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
    return <LoadingOverlay message='Fetching treasure hunt definition' />;
  }

  if (!(fetchActivityDefinitionStatus.kind === 'success' && fetchActivityDefinitionStatus.result.kind === 'ok')) {
    return <LoadingOverlay message='Fetching associated activity' />;
  }

  if (!(fetchActivityArtworksStatus.kind === 'success' && fetchActivityArtworksStatus.result.kind === 'ok')) {
    return <LoadingOverlay message='Fetching activity artworks' />;
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
          imagesData={fetchActivityArtworksStatus.result.data.artworks}
          onStageCompleted={handleStageCompleted}
        />
      </Fader>
    </Root>
  );
}

export default PlayTreasureHuntScreen;