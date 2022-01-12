import styled from 'styled-components';
import { useParams, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { ArtworksContext } from '../../MenuScreen';
import { sampleStory, StoriesContext } from './StoriesContext';

const Root = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    width: 100%;
    align-self: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 16px;
    width: 85%;
    max-width: 1200px;
    align-items: left;
    margin-bottom: 15px;
    padding: 0;
    flex-direction: row;
  }

  background-color: ${props => props.theme.cardBackground};
`;

export const ArtworkStoriesPanel = (): JSX.Element => {

  const { artworks } = useContext(ArtworksContext);
  const { artworkId } = useParams();

  const artworkData = artworks.find(elem => elem.id === artworkId);

  if (!artworkData) {
    return (
      <Root>
        No artwork found.
      </Root>
    );
  }

  const stories = [sampleStory, sampleStory, sampleStory];

  return (
    <Root>
      <StoriesContext.Provider value={{ stories, artwork: artworkData }}>
        <Outlet />
      </StoriesContext.Provider>
    </Root>

  );
};

export default ArtworkStoriesPanel;