import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Artwork } from '../../services/viewpointsArtwork.model';
import { NavigateNext } from '@styled-icons/material/NavigateNext';
import { NavigateBefore } from '@styled-icons/material/NavigateBefore';
import ArtworkCard from './ArtworkCard';

const Root = styled.div`
  width: 100%;
  margin-top: 1vh;
  margin-bottom: 1vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ArtworkGrid = styled.div`
  height: 100%;
  width: 90%;
  padding: 0.5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  height: 100%;
  padding-left: 2%;
`;

const LowerPanelContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface NavIconProps {
  active: boolean;
};

const Icon = css<NavIconProps>`
  color: ${props => props.active ? 'darkgray' : 'lightgray'};
  cursor: ${props => props.active ? 'pointer' : 'default'};
  height: 7.5vh;
  align-self: center;
  margin-bottom: 1vh;
  transform: scale(0.9);
  transition: transform 0.5s ease;
  opacity: ${props => props.active ? '1' : '0.3'};

  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
    transition: transform 0.5s ease;
  }
`;

const NavigateNextIcon = styled(NavigateNext) <NavIconProps>`
  ${Icon}
`;

const NavigateBeforeIcon = styled(NavigateBefore) <NavIconProps>`
  ${Icon}
`;

interface ArtworksComponentProps {
  /** List of artworks, each contain its id, name, artist, description, date, imageLoc, 
   *  image, audio, notes and URL. */
  artworks: Artwork[];
  /** Callback that will be used whenever an artwork is selected in the list 
   *  of available artworks, with the id of the selected artwork as a parameter. */
  onArtworkClicked?: (id: string) => void;
};

const ArtworksComponent: React.FC<ArtworksComponentProps> = ({ artworks, onArtworkClicked }) => {

  const [displayIndex, setDisplayIndex] = useState<number>(0);

  return (
    <Root>
      <LowerPanelContainer>
        <NavigateBeforeIcon
          active={displayIndex > 0}
          onClick={() => {
            if (displayIndex > 0) {
              setDisplayIndex(prev => prev - 2);
            }
          }}
        />
        <ArtworkGrid>
          {[0, 1, 2].map(column =>
            <ArtworksContainer key={column}>
              {artworks.slice((displayIndex + (column * 2)), (displayIndex + 2 + (column * 2))).map((im, i) => (
                <ArtworkCard
                  key={im._id}
                  artworkData={im}
                  onArtworkSelected={() => { if (onArtworkClicked !== undefined) { onArtworkClicked(im._id); } }}
                />
              ))}
            </ArtworksContainer>
          )}
        </ArtworkGrid>
        <NavigateNextIcon
          active={displayIndex + 6 < artworks.length}
          onClick={() => {
            if (displayIndex + 6 < artworks.length) {
              setDisplayIndex(prev => prev + 2);
            }
          }}
        />
      </LowerPanelContainer>
    </Root>
  );
}

export default ArtworksComponent;