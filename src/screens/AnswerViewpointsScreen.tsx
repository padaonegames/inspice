import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { viewpointsArtworksService } from '../services';
import { useAsyncRequest } from '../services/useAsyncRequest';
import LoadingOverlay from '../components/LoadingOverlay';
import ArtworkDetail from '../Viewpoints/ArtworkDetail';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const AnswerViewpointScreen: React.FC = () => {

  let { id } = useParams<{ id: string }>();

  const fetchArtwork = async () => {
    return await viewpointsArtworksService.fetchArtwork(id);
  };

  const [fetchArtworkStatus] = useAsyncRequest(fetchArtwork, []);

  if (!(fetchArtworkStatus.kind === 'success' && fetchArtworkStatus.result.kind === 'ok')) {
    return <LoadingOverlay message='Fetching artwork data...' />;
  }

  return (
    <Root>
      <ArtworkDetail artworkData={fetchArtworkStatus.result.data} />
    </Root>
  );
}

export default AnswerViewpointScreen;