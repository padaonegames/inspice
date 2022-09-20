import styled from "styled-components";
import { Image } from "@styled-icons/ionicons-solid/Image";
import { PlusCircleFill } from "@styled-icons/bootstrap/PlusCircleFill";
import ContainerCard from "../../../../components/Forms/Cards/ContainerCard";
import {
  ArtworkAuthor,
  ArtworkDate,
  ArtworkListDottedLine,
  ArtworkTitle,
  DetailActionPanel,
  DetailMainInfoPanel,
  DetailUpperPanel,
} from "../generalStyles";
import StoriesList from "./StoriesList";
import { GamGameStoryDefinitionData } from "../../../../services/gamGameActivity.model";
import { ArtworkData } from "../../../../services/artwork.model";

const DetailsIcon = styled(Image)`
  color: ${(props) => props.theme.textColor};
  width: 3em;
  height: 3em;
  margin-bottom: 0.5em;
`;

const AddStoryButton = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 3em;
  right: 3em;
`;

const AddStoryButtonBackground = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 3em;
  width: 3em;
`;

const AddStoryIcon = styled(PlusCircleFill)`
  color: #c44c49;
  position: absolute;
  top: 0;
  left: 0;
  height: 3em;
  width: 3em;
  cursor: pointer;
`;

interface ArtworkStoriesListProps {
  /** stories associated to this artwork */
  stories: GamGameStoryDefinitionData[];
  /** Artwork data to be used when rendering the stories */
  artworks: ArtworkData[];
  /** Specific artwork that all stories within this component will include */
  currentArtwork: ArtworkData;
  /** Callback to parent specifying that a given story (by id) has been selected by the user */
  onStorySelected?: (storyId: string) => void;
  /** Callback to parent specifying that the user wishes to create a new story */
  onCreateStoryClicked?: () => void;
  /** Callback to parent specifying that the user wishes to switch to details mode */
  onShowDetailsClicked?: () => void;
}

/** Component to render a list of stories associated to a given artwork */
export const ArtworkStoriesList = (
  props: ArtworkStoriesListProps
): JSX.Element => {
  const {
    stories,
    artworks,
    currentArtwork,
    onStorySelected,
    onCreateStoryClicked,
    onShowDetailsClicked,
  } = props;

  return (
    <ContainerCard upperDecorator>
      <AddStoryButton title="Add a new story" onClick={onCreateStoryClicked}>
        <AddStoryButtonBackground />
        <AddStoryIcon />
      </AddStoryButton>
      <DetailUpperPanel>
        <DetailMainInfoPanel>
          <ArtworkTitle>{currentArtwork.title}</ArtworkTitle>
          <ArtworkAuthor>{currentArtwork.author}</ArtworkAuthor>
          <ArtworkDate>{currentArtwork.date}</ArtworkDate>
        </DetailMainInfoPanel>
        <DetailActionPanel>
          <DetailsIcon onClick={onShowDetailsClicked} />
          Details
        </DetailActionPanel>
      </DetailUpperPanel>

      <ArtworkListDottedLine />
      <StoriesList
        stories={stories}
        artworks={artworks}
        onStorySelected={onStorySelected}
      />
    </ContainerCard>
  );
};

export default ArtworkStoriesList;
