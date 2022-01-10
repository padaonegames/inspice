import { Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ArtworkStoriesPanel from '../components/ArtworkStoriesPanel';
import { ArtworkData } from '../../../services/artwork.model';
import { GamGameStoryDefinition } from '../../../services/gamGameActivity.model';
import GeneralArtworkDetail from '../components/GeneralArtworkDetail';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

export interface InspectArtworkStepProps {
  artworks: ArtworkData[];
};

const story: GamGameStoryDefinition = {
  _id: '',
  GamGameStoryAuthor: 'Pablo Gutiérrez',
  GamGameStoryTitle: 'Mi nueva historia de prueba',
  activityId: '',
  artworkId: '',
  multimediaData: {
    tags: [
      { tag: '#divertido', locationX: 0.15, locationY: 0.15 },
      { tag: '#guay', locationX: 0.85, locationY: 0.85 },
    ],
    emojis: [
      { emoji: '🤩', locationX: 0.25, locationY: 0.25 },
      { emoji: '🥰', locationX: 0.5, locationY: 0.25 }
    ],
    text: 'Me ha gustado mucho esta obra'
  }
};

export const InspectArtworkStep = (props: InspectArtworkStepProps): JSX.Element => {

  const { artworks } = props;
  const { artworkId } = useParams();
  const navigate = useNavigate();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  if (!artworkData) {
    return (
      <Root>
        No artwork found.
      </Root>
    );
  }

  return (
    <Root>
      <Routes>

      </Routes>
      <Outlet />
    </Root>
  );
}

export default InspectArtworkStep;