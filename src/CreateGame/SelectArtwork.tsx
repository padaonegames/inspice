import React from 'react';
import styled from 'styled-components';
import { ArtworkData } from '../artworks/artworkData';
import { RadioCircleMarked } from '@styled-icons/boxicons-regular/RadioCircleMarked';
import NextCornerButton from './NextCornerButton';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(15, 15, 15, 0.75);
  width: 28%;
  height: 76.2vh;
  margin: 0;
  padding: 1.5%;
  padding-top: 3%;
`;

const ArtworkListDottedLine = styled.div`
  height: 0.5vh;
  width: 94%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
`;

interface ArtworkListTextProps {
  active: boolean;
};

const ArtworkListText = styled.p<ArtworkListTextProps>`
  font-size: 0.75em;
  font-weight: 600;
  font-family: Raleway;
  color: ${props => props.active ? 'white' : 'darkgray'};
  transition: color 0.5s ease;
  margin: auto 0 auto 0;

  &:hover {
    cursor: pointer;
    color: white;
    transition: color 0.5s ease;
  }
`;

const ArtworkListHeader = styled.p`
  font-size: 0.75em;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
`;

const ArtworkListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArtworkSelectedIcon = styled(RadioCircleMarked)`
  color: #F8F8F8;
  height: 4vh;
  width: auto;
  margin-right: 2vw;
`;

interface ArtworkDisplayProps {
  backgroundImage: string;
};

const ArtworkDisplay = styled.div<ArtworkDisplayProps>`
  height: 76.2vh;
  width: 72vw;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: 115% auto;
  background-position: 15% 15%;
  overflow: hidden;
`;

const HelpText = styled.div`
  margin: auto;
  font-size: 0.75em;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
  max-width: 30%;
  text-align: center;
  line-height: 3.5vh;
`;

const ArtworkContainer = styled.div`
  overflow-y: scroll;
  height: 37.5vh;
`;

interface SelectArtworkProps {
  imagesData: ArtworkData[];
  selectedArtwork: string | undefined;
  onArtworkSelected: (artworkId: string) => void;
  onNextClicked: () => void;
};

const SelectArtwork: React.FC<SelectArtworkProps> = ({
  imagesData,
  selectedArtwork,
  onArtworkSelected,
  onNextClicked
}) => {

  const retrieveArtworkSrc = (artworkId: string): string => {
    return imagesData.find(elem => elem.id === artworkId)!.src;
  };

  return (
    <Root>
      <SelectionPanel>
        <ArtworkListHeader>
          OBRAS DISPONIBLES
        </ArtworkListHeader>
        <ArtworkListDottedLine />
        <ArtworkContainer>
          {imagesData.map((img) => (
            <div key={img.id + '_c'}>
              <ArtworkListItem>
                <ArtworkListText
                  onClick={() => onArtworkSelected(img.id)}
                  active={selectedArtwork !== undefined && img.id === selectedArtwork}
                  key={img.id}
                >
                  {img.title}
                </ArtworkListText>
                {selectedArtwork !== undefined && img.id === selectedArtwork &&
                  <ArtworkSelectedIcon />
                }
              </ArtworkListItem>
              <ArtworkListDottedLine key={img.id + '_d'} />
            </div>
          ))}
        </ArtworkContainer>
        {selectedArtwork &&
          <NextCornerButton
            onNextClicked={onNextClicked}
          />
        }
      </SelectionPanel>
      {selectedArtwork ?
        <ArtworkDisplay
          backgroundImage={retrieveArtworkSrc(selectedArtwork)}
        /> :
        <HelpText>
          Selecciona una obra de entre las disponibles
          en el panel lateral para empezar a editar la fase.
        </HelpText>
      }
    </Root>
  );
}

export default SelectArtwork;