import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import { ArtworksContext } from '../Screen';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

export const InspectArtworkStep = (): JSX.Element => {

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

  return (
    <Root>
      <Outlet />
    </Root>
  );
}

export default InspectArtworkStep;