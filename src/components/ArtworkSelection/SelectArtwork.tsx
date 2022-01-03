import React from 'react';
import styled from 'styled-components';
import { RadioCircleMarked } from '@styled-icons/boxicons-regular/RadioCircleMarked';
import { useTranslation } from 'react-i18next';
import { ArtworkData } from '../../services/artwork.model';
import NextCornerButton from '../../screens/CreateTreasureHunt/Steps/NextCornerButton';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.artworkDisplayBackground};

  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  width: 98%;
  align-items: left;
  margin: auto;
  margin-top: 12px;
  padding: 0;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
  height: 76.2vh;
  margin: 0;
  padding: 1.5%;
  padding-top: 3%;
  background-color: ${props => props.theme.selectArtworkChoicesBackground};
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
  color: ${props => props.active ? props.theme.textColor : 'darkgray'};
  transition: color 0.5s ease;
  margin: auto 0 auto 0;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.textColor};
    transition: color 0.5s ease;
  }
`;

const ArtworkListHeader = styled.p`
  font-size: 0.75em;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: ${props => props.theme.textColor};
  margin-top: 10px;
`;

const ArtworkListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArtworkSelectedIcon = styled(RadioCircleMarked)`
  color: ${props => props.theme.textColor};
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
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 90%;
  background-color: ${props => props.theme.artworkDisplayBackground};
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

export interface SelectArtworkProps {
  /**
   * array of objects adhering to the ArtworkData interface, each of them containing at
   * least an artwork’s id, author, title, and image source. Image source will be used
   * to render the selected artwork’s preview.
   */
  imagesData: ArtworkData[];
  /**
   * id of the currently selected artwork, or undefined if none of them is selected at the time.
   * Must match the id of one of the artworks declared in imagesData (otherwise behaviour will
   * be the same as when passing in undefined in this prop).
   */
  selectedArtwork: string | undefined;
  /**
   * callback that will be used whenever an artwork is selected in the list of available artworks,
   * with the id of the selected artwork as a parameter.
   * @param artworkId unique identifier of selected artwork within imagesData.
   */
  onArtworkSelected: (artworkId: string) => void;
  /**
   * callback that will be triggered when the continue button on the panel is clicked.
   */
  onNextClicked?: () => void;
  /**
   * title to display on top of the list of available artworks.
   */
  titleText: string;
};

/**
 * Panel used to display a list of available artworks to choose from, as well as to provide a full-size
 * display of the selected item’s image. This list is provided to the user in the form of a scrollable
 * sequence of artworks’ titles, which may be clicked on to select the artwork and trigger a callback
 * with its id as parameter to notify the component’s parent of the performed selection. Only one artwork
 * may be selected at any given time, and the image pointed at by its source will be displayed on the
 * right sub-panel of this component. Selecting an artwork will NOT change the currently selected item
 * unless selectedArtwork prop is modified in parent (component is not stateful).
 * 
 * <img src="media://SelectArtwork.PNG" alt="SelectArtwork">
 * 
 * @author Pablo Gutiérrez, 2021
 */
export const SelectArtwork: React.FC<SelectArtworkProps> = ({
  imagesData,
  selectedArtwork,
  onArtworkSelected,
  onNextClicked,
  titleText,
}) => {

  const { t } = useTranslation('app');

  const retrieveArtworkSrc = (artworkId: string): string => {
    return imagesData.find(elem => elem.id === artworkId)!.src;
  };

  return (
    <Root>
      <SelectionPanel>
        <ArtworkListHeader>
          {titleText}
        </ArtworkListHeader>
        <ArtworkListHeader>
          {t('availableArtworks')}
        </ArtworkListHeader>
        <ArtworkListDottedLine />
        <ArtworkContainer>
          {imagesData.map((img) => (
            <div key={img.id + img.author}>
              <ArtworkListItem>
                <ArtworkListText
                  onClick={() => onArtworkSelected(img.id)}
                  active={selectedArtwork !== undefined && img.id === selectedArtwork}
                  key={img.id + img.author + '_alt'}
                >
                  {img.title}
                </ArtworkListText>
                {selectedArtwork !== undefined && img.id === selectedArtwork &&
                  <ArtworkSelectedIcon />
                }
              </ArtworkListItem>
              <ArtworkListDottedLine key={img.id + img.author + '_aldl'} />
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
          {t('selectArtworkMessage')}
        </HelpText>
      }
    </Root>
  );
}

export default SelectArtwork;