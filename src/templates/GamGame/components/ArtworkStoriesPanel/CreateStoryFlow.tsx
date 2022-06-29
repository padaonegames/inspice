import { useContext, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { GamGameStoryPart } from "../../../../services/gamGameActivity.model";
import { GamGameActivityContext } from "../../UserPerspective/Screen";
import ContinueOrSubmitStep from "./CreateStorySteps/ContinueOrSubmitStep";
import CreateStoryPartStep from "./CreateStorySteps/CreateStoryPartStep";
import IntroStep from "./CreateStorySteps/IntroStep";
import { RecommendationsFromStoryComponent } from "./CreateStorySteps/RecommendationsStep";
import SelectArtworkStep from "./CreateStorySteps/SelectArtworkStep";
import SubmitStoryStep from "./CreateStorySteps/SubmitStoryStep";

type CreateStoryStatus = 'intro' | 'select-artwork' | 'create-story-part' | 'continue-or-submit' | 'recommendation-similar' | 'recommendation-opposite' | 'submit';
/** What sort of status we are selecting the current artwork from */
type ArtworkSelectionStatus = 'select-artwork' | 'recommendation-opposite' | 'recommendation-similar';

export const CreateStoryFlow = (): JSX.Element => {

  const { artworks, activity } = useContext(GamGameActivityContext);

  const navigate = useNavigate();

  const [status, setStatus] = useState<CreateStoryStatus>('intro');
  const [artworkSelectionStatus, setArtworkSelectionStatus] = useState<ArtworkSelectionStatus>('select-artwork');

  const [storyParts, setStoryParts] = useState<GamGameStoryPart[]>([]);
  const [currentArtwork, setCurrentArtwork] = useState<string | undefined>(undefined);


  const handleArtworkSelected = (id: string) => {
    setCurrentArtwork(id);
    setStatus('create-story-part');
  };

  const handleSubmitStoryPart = (storyPart: GamGameStoryPart) => {
    if (!currentArtwork) return;

    setStoryParts(prev => ([...prev, storyPart]));

    if (artworkSelectionStatus === 'recommendation-similar') {
      setStatus('recommendation-opposite');
      setArtworkSelectionStatus('recommendation-opposite');
    }
    else if (artworkSelectionStatus === 'recommendation-opposite') {
      setStatus('submit');
    }
    else if (storyParts.length + 1 >= activity.maxArtworks) {
      // reached maximum number of story parts, move on to submit
      setStatus('submit');
    }
    else if (storyParts.length + 1 >= activity.minArtworks) {
      // enough artworks to submit story, but still room to add more
      setStatus('continue-or-submit');
    }
    else {
      // not enough artworks, force user to add more parts
      setStatus('select-artwork');
    }
    // no need for current artwork anymore
    setCurrentArtwork(undefined);
  };

  const handleQuitStoryPart = () => {
    setCurrentArtwork(undefined);
    setStatus(artworkSelectionStatus);
  };

  const handleContinueStory = () => {
    setStatus('select-artwork');
  };

  const handleSubmitStory = () => {
    setStatus('recommendation-similar');
    setArtworkSelectionStatus('recommendation-similar');
  };

  const handleStorySubmitted = () => {
    console.log("story submitted")
    /*navigate({
      pathname: `/gam-game/consumer/visit/${activity._id}/recommendations`,
      search: `?${createSearchParams([
        ['relation', 'similar'],
        ['artworksIncluded', JSON.stringify(storyParts.map(part => part.artworkId))]
      ])}`
    });*/
    navigate(`/gam-game/consumer/visit/${activity._id}/home`);
  };

  if (status === 'intro') {
    return <IntroStep onBeginClicked={() => setStatus('select-artwork')} />
  }

  if (status === 'select-artwork') {
    return (
      <SelectArtworkStep
        index={storyParts.length + 1}
        artworks={artworks}
        onArtworkSelected={handleArtworkSelected}
      />);
  }

  if (status === 'create-story-part') {
    const artwork = artworks.find(elem => elem.id === currentArtwork);

    if (!artwork) return <>Unexpected error</>;
    return (
      <CreateStoryPartStep
        artworkData={artwork}
        onSubmitStoryPart={handleSubmitStoryPart}
        onQuit={handleQuitStoryPart}
      />
    );
  }

  if (status === 'continue-or-submit') {
    return (
      <ContinueOrSubmitStep
        onContinueClicked={handleContinueStory}
        onSubmitClicked={handleSubmitStory}
      />
    );
  }

  if (status === 'recommendation-similar') {
    return (
      <RecommendationsFromStoryComponent
        artworks={artworks}
        relation='similar'
        artworksIncluded={storyParts.map(part => part.artworkId)}
        onArtworkSelected={handleArtworkSelected}
        onNextClicked={() => setStatus('recommendation-opposite')}
      />
    );
  }

  if (status === 'recommendation-opposite') {
    return (
      <RecommendationsFromStoryComponent
        artworks={artworks}
        relation='opposite'
        artworksIncluded={storyParts.map(part => part.artworkId)}
        onArtworkSelected={handleArtworkSelected}
        onNextClicked={() => setStatus('submit')}
      />
    );
  }

  if (status === 'submit') {
    return (
      <SubmitStoryStep
        activityId={activity._id}
        storyParts={storyParts}
        onStorySubmitted={handleStorySubmitted}
      />
    );
  }

  return <>Invalid State</>;
};

export default CreateStoryFlow;