import { useContext, useState } from "react";
import { GamGameStoryPart } from "../../../../services/gamGameActivity.model";
import { GamGameActivityContext } from "../../UserPerspective/Screen";
import ContinueOrSubmitStep from "./CreateStorySteps/ContinueOrSubmitStep";
import CreateStoryPartStep from "./CreateStorySteps/CreateStoryPartStep";
import IntroStep from "./CreateStorySteps/IntroStep";
import SelectArtworkStep from "./CreateStorySteps/SelectArtworkStep";
import SubmitStoryStep from "./CreateStorySteps/SubmitStoryStep";

type CreateStoryStatus = 'intro' | 'select-artwork' | 'create-story-part' | 'continue-or-submit' | 'recommend-artworks' | 'submit';

export const CreateStoryFlow = (): JSX.Element => {

  const { artworks, activity } = useContext(GamGameActivityContext);

  const [status, setStatus] = useState<CreateStoryStatus>('intro');

  const [storyParts, setStoryParts] = useState<GamGameStoryPart[]>([]);
  const [currentArtwork, setCurrentArtwork] = useState<string | undefined>(undefined);


  const handleArtworkSelected = (id: string) => {
    setCurrentArtwork(id);
    setStatus('create-story-part');
  };

  const handleSubmitStoryPart = (storyPart: GamGameStoryPart) => {
    if (!currentArtwork) return;

    setStoryParts(prev => ([...prev, storyPart]));

    if (storyParts.length + 1 >= activity.maxArtworks) {
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
    setStatus('select-artwork');
  };

  const handleContinueStory = () => {
    setStatus('select-artwork');
  };

  const handleSubmitStory = () => {
    setStatus('submit');
  };

  const handleStorySubmitted = () => {
    // setStatus('recommend-artworks');
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