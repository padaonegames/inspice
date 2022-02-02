import { ArtworkData } from '../../services/artwork.model';
import {
  CardAuthor,
  CardCaption,
  CardDescriptionList,
  CardInfo,
  CardTitle,
  CardContainer,
  CardImage,
  CardImageContainer
} from './generalStyles';

export interface CardColumnElementProps {
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
export const CardColumnElement = (props: CardColumnElementProps): JSX.Element => {

  const {
    artworkData,
    onCardClicked,
  } = props;

  return (
    <CardContainer onClick={onCardClicked}>
      <CardImageContainer>
        <CardImage src={artworkData.src} />
      </CardImageContainer>
      <CardCaption>
        <CardDescriptionList>
          <CardTitle>
            {artworkData.title}
          </CardTitle>
          <CardInfo>
            {artworkData.info}
          </CardInfo>
          <CardAuthor>
            {artworkData.author}
          </CardAuthor>
        </CardDescriptionList>
      </CardCaption>
    </CardContainer>
  );
}

export default CardColumnElement;