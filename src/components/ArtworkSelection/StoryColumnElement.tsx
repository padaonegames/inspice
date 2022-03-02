import { GamGameStoryDefinitionData } from '../../services/gamGameActivity.model';
import { CardCaption, CardContainer, CardDescriptionList, CardGridCollage, CardImage, CardImageContainer, CardTitle } from './generalStyles';

export interface StoryListDisplayProps {
  /** image to be used to represent this story within a story list (miniature) */
  imageSrcs: string[];
  /** Data object with the story's information */
  storyData: GamGameStoryDefinitionData;
  /**
   * Callback to the parent of this panel indicating that this card has been clicked.
   */
  onCardClicked?: () => void;
};

export const StoryListDisplay = (props: StoryListDisplayProps): JSX.Element => {

  const {
    imageSrcs,
    storyData,
    onCardClicked,
  } = props;

  return (
    <CardContainer onClick={onCardClicked}>
      <CardImageContainer>
        {imageSrcs.length > 1 && <CardGridCollage imageSrcs={imageSrcs} />}
        {imageSrcs.length <= 1 && <CardImage src={imageSrcs[0]} />}
      </CardImageContainer>
      <CardCaption>
        <CardDescriptionList>
          <CardTitle>
            {storyData.title}
          </CardTitle>
        </CardDescriptionList>
      </CardCaption>
    </CardContainer>
  );
}

export default StoryListDisplay;