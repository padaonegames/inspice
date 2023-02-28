import { GamGameStoryDefinitionData } from "../../services/gamGameActivity.model";
import {
  CardCaption,
  CardContainer,
  CardDescriptionList,
  CardGridCollage,
  CardImage,
  CardImageContainer,
  CardTitle,
} from "./generalStyles";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

export const fieldTypeIcon = css`
  color: ${(props) => props.theme.textColor};
  height: 1.85em;
  width: 1.85em;
  position: absolute;
  right: 0;
  top: -0.225em;
  padding: 0.125em;
`;

const DeleteIcon = styled(Delete)`
  ${fieldTypeIcon}
  cursor: pointer;
`;

export interface StoryListDisplayProps {
  /** image to be used to represent this story within a story list (miniature) */
  imageSrcs: string[];
  /** Data object with the story's information */
  storyData: GamGameStoryDefinitionData;
  /** whether delete story icon should be available */
  enableStoryDeletion?: boolean;
  /**
   * Callback to the parent of this panel indicating that this card has been clicked.
   */
  onCardClicked?: () => void;
  /** callback to parent component notidying that user wishes to delete this story */
  onDeleteStory?: () => void;
} // StoryListDisplayProps

export const StoryListDisplay = (props: StoryListDisplayProps): JSX.Element => {
  const {
    imageSrcs,
    storyData,
    enableStoryDeletion = false,
    onCardClicked,
    onDeleteStory,
  } = props;

  const { t } = useTranslation("gamGame");

  const handleDeleteClicked = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const shouldDelete = window.confirm(
      t("youAreAboutToDeleteStory", { title: storyData.title })
    );

    if (shouldDelete && onDeleteStory) {
      onDeleteStory();
    }
  }; // handleDeleteClicked

  return (
    <CardContainer onClick={onCardClicked}>
      <CardImageContainer>
        {imageSrcs.length > 1 && <CardGridCollage imageSrcs={imageSrcs} />}
        {imageSrcs.length <= 1 && <CardImage src={imageSrcs[0]} />}
      </CardImageContainer>
      <CardCaption>
        <CardDescriptionList>
          <CardTitle>{storyData.title}</CardTitle>
          {enableStoryDeletion && (
            <DeleteIcon title="Delete story" onClick={handleDeleteClicked} />
          )}
        </CardDescriptionList>
      </CardCaption>
    </CardContainer>
  );
}; // StoryListDisplay

export default StoryListDisplay;
