import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { viewpointsArtworksService } from '../../services';
import { useAsyncRequest } from '../../services/useAsyncRequest';
import LoadingOverlay from '../../components/Layout/LoadingOverlay';
import ArtworkDetail from '../../components/ArtworkDisplay/ArtworkDetail';
import QuestionComponent from './QuestionComponent';
import { ArrowBackCircle } from '@styled-icons/ionicons-sharp/ArrowBackCircle';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const BackIcon = styled(ArrowBackCircle)`
  color: rgba(15, 15, 15, 0.75);
  height: 45px;
  width: auto;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 50%;
  left: 1%;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 0.85);
  }
`;

const AnswerViewpointComponent: React.FC = () => {

  let { id } = useParams() as { id: string };
  let navigate = useNavigate();

  const fetchArtwork = async () => {
    return await viewpointsArtworksService.fetchArtwork(id);
  };

  const [fetchArtworkStatus] = useAsyncRequest(fetchArtwork, []);

  if (!(fetchArtworkStatus.kind === 'success' && fetchArtworkStatus.result.kind === 'ok')) {
    return <LoadingOverlay message='Fetching artwork data' />;
  }

  return (
    <>
      <BackIcon
        title='Return to list of artworks'
        onClick={() => navigate('/viewpoints/consumer/browse')}
      />
      <Root>
        <ArtworkDetail artworkData={fetchArtworkStatus.result.data} />
        <QuestionComponent artwork={fetchArtworkStatus.result.data} />
      </Root>
    </>

  );
}

export default AnswerViewpointComponent;