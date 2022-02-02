import { ArtworkData } from '../../services/artwork.model';
import { GamGameStoryDefinition } from '../../services/gamGameActivity.model';
import { CardAuthor, CardCaption, CardContainer, CardDescriptionList, CardImage, CardImageContainer, CardTitle } from './generalStyles';

export interface StoryListDisplayProps {
  artworkData: ArtworkData;
  storyData: GamGameStoryDefinition;
  /**
   * Callback to the parent of this panel indicating that this card has been clicked.
   */
  onCardClicked?: () => void;
};

export const StoryListDisplay = (props: StoryListDisplayProps): JSX.Element => {

  const {
    artworkData,
    storyData,
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
            {storyData.GamGameStoryTitle}
          </CardTitle>
          <CardAuthor>
            {storyData.GamGameStoryAuthor}
          </CardAuthor>
        </CardDescriptionList>
      </CardCaption>
    </CardContainer>
  );
}

export default StoryListDisplay;