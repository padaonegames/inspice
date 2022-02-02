import { GamGameStoryDefinition } from '../../services/gamGameActivity.model';
import { CardAuthor, CardCaption, CardContainer, CardDescriptionList, CardImage, CardImageContainer, CardTitle } from './generalStyles';

export interface StoryListDisplayProps {
  /** image to be used to represent this story within a story list (miniature) */
  imageSrc: string;
  /** Data object with the story's information */
  storyData: GamGameStoryDefinition;
  /**
   * Callback to the parent of this panel indicating that this card has been clicked.
   */
  onCardClicked?: () => void;
};

export const StoryListDisplay = (props: StoryListDisplayProps): JSX.Element => {

  const {
    imageSrc,
    storyData,
    onCardClicked,
  } = props;

  return (
    <CardContainer onClick={onCardClicked}>
      <CardImageContainer>
        <CardImage src={imageSrc} />
      </CardImageContainer>
      <CardCaption>
        <CardDescriptionList>
          <CardTitle>
            {storyData.title}
          </CardTitle>
          <CardAuthor>
            {storyData.author}
          </CardAuthor>
        </CardDescriptionList>
      </CardCaption>
    </CardContainer>
  );
}

export default StoryListDisplay;