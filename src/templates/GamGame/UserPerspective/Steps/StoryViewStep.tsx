import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "../../../../components/Layout/LoadingOverlay";
import { gamGameApi } from "../../../../services";
import { ArtworkData } from "../../../../services/artwork.model";
import { GamGameStoryDefinitionData } from "../../../../services/gamGameActivity.model";
import { useAsyncRequest } from "../../../../services/useAsyncRequest";
import StoryPartView from "../../components/ArtworkStoriesPanel/StoryPartView";
import { StepRoot } from "../../components/generalStyles";
import { GamGameActivityContext } from "../Screen";

//------------------------------------------------------------------
//             FIRST STAGE: Fetch story definition
//------------------------------------------------------------------
export const StoryViewStep = (): JSX.Element => {
  //-----------------------------------------------
  //          Fetch Story Definition
  //-----------------------------------------------

  // fetch id from url
  const { storyId } = useParams() as { storyId: string };
  const { artworks } = useContext(GamGameActivityContext);

  // Fetch story definition from server by url params' id
  const fetchStory = () => {
    if (!storyId) return Promise.reject();
    return gamGameApi.getGamGameStoryDefinitionById(storyId);
  };

  // Make request on first render
  const [fetchStoryRequestStatus] = useAsyncRequest(fetchStory, []);

  if (
    !(
      fetchStoryRequestStatus.kind === "success" &&
      fetchStoryRequestStatus.result.kind === "ok"
    )
  ) {
    return <LoadingOverlay message="Fetching story definition" />;
  }

  // cache the value of our activityDefinition after it is found.
  const storyDefinition = fetchStoryRequestStatus.result.data[0];
  return <StoryViewFlow story={storyDefinition} artworks={artworks} />;
}; // StoryViewStep

//------------------------------------------------------------------
//               SECOND STAGE: User Flow
//------------------------------------------------------------------
interface StoryViewFlowProps {
  /** defintion of the gam game story */
  story: GamGameStoryDefinitionData;
  /** Artwork data that will be needed to render the story parts */
  artworks: ArtworkData[];
} // StoryViewFlowProps

const StoryViewFlow = (props: StoryViewFlowProps): JSX.Element => {
  const { story, artworks } = props;
  const navigate = useNavigate();

  const [currentPart, setCurrentPart] = useState<number>(0);

  const part = story.parts[currentPart];
  const artwork = artworks.find((elem) => elem.id === part.artworkId);

  const handleNextClicked = () => {
    if (currentPart + 1 < story.parts.length) {
      // there are more parts left
      setCurrentPart((prev) => prev + 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <StepRoot>
      <StoryPartView
        storyPart={part}
        artworkData={artwork}
        onNextClicked={handleNextClicked}
        onQuit={() => navigate(-1)}
      />
    </StepRoot>
  );
}; // StoryViewFlow

export default StoryViewStep;
