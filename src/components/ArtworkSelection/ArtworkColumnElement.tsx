import styled from 'styled-components';
import { ArtworkData } from '../../services/artwork.model';

const CardContainer = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 95%;
    align-self: center;
    margin: 3%;
  }

  @media (min-width: 768px) {
    width: 32%;
    min-width: 290px;
    max-width: 18rem;
    margin: 0.5%;
  }
`;

const CardImage = styled.img`
  background-color: ${props => props.theme.artworkDisplayBackground};
  cursor: pointer;
  max-height: 18rem;
  min-height: 290px;
  width: 100%;
  min-width: 290px;
  max-width: 18rem;
  object-fit: contain;
`;

const CardImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    align-self: center;
    margin: 10px auto;
  }

  @media (min-width: 768px) {
    width: 32%;
    max-width: 240px;
    margin: 0.5%;
  }
`;

const ArtworkCaption = styled.figcaption`
  margin-top: 10px;
  text-align: center;
`;

const ArtworkDescriptionList = styled.dl`
`;

const ArtworkTitle = styled.dt`
  font-style: italic;
  overflow-wrap: break-word;
  font-size: 1.25em;
  color: ${props => props.theme.textColor};
  font-weight: normal;
  line-height: 120%;
`;

const ArtworkInfo = styled.dd`
  font-size: 1.15em;
  color: #9d9d9d;
  font-weight: normal;
  overflow-wrap: break-word;
  margin-top: 0.3em;
`;

const ArtworkAuthor = styled.dd`
  font-size: 1.1em;
  font-family: 'Gotham SSm A', 'Gotham SSm B';
  color: #9d9d9d;
  font-weight: normal;
  text-transform: uppercase;
  overflow-wrap: break-word;
  margin-top: 0.3em;
`;

export interface ArtworkColumnElementProps {
  /** Object containing relevant artwork information */
  artworkData: ArtworkData;
  /**
   * Callback to the parent of this panel indicating that this card has been clicked.
   */
  onCardClicked?: () => void;
};

/** 
 * Basic component to display a thumbnail of a given artwork as well as some basic summary information,
 * usually within the context of a list display.
 */
export const ArtworkColumnElement = (props: ArtworkColumnElementProps): JSX.Element => {

  const {
    artworkData,
    onCardClicked,
  } = props;
  
  return (
    <CardContainer onClick={onCardClicked}>
      <CardImageContainer>
        <CardImage src={artworkData.src} />
      </CardImageContainer>
      <ArtworkCaption>
        <ArtworkDescriptionList>
          <ArtworkTitle>
            {artworkData.title}
          </ArtworkTitle>
          <ArtworkInfo>
            {artworkData.info}
          </ArtworkInfo>
          <ArtworkAuthor>
            {artworkData.author}
          </ArtworkAuthor>
        </ArtworkDescriptionList>
      </ArtworkCaption>
    </CardContainer>
  );
}

export default ArtworkColumnElement;