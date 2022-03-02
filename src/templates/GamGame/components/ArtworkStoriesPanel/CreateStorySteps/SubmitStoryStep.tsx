import { useEffect, useState } from "react";
import ShortTextInputCard from "../../../../../components/Forms/Cards/ShortTextInputCard";
import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import LoadingOverlay from "../../../../../components/Layout/LoadingOverlay";
import { gamGameApi } from "../../../../../services";
import { GamGameStoryPart } from "../../../../../services/gamGameActivity.model";
import { useAsyncRequest } from "../../../../../services/useAsyncRequest";
import { ArtworkListDottedLine, ProgressButton, StepRoot } from "../../generalStyles";

interface SubmitStoryStepProps {
  /** parts of the story that will be submitted in this step */
  storyParts: GamGameStoryPart[];
  /** id of the activity that this story belongs to */
  activityId: string;
  /** callback to parent informing about story being successfully uploaded to database */
  onStorySubmitted?: () => void;
}

export const SubmitStoryStep = (props: SubmitStoryStepProps): JSX.Element => {

  const {
    storyParts,
    activityId,
    onStorySubmitted
  } = props;

  const [title, setTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleSubmitStory = () => {
    return gamGameApi.submitGamGameStoryDefinition({
      title: title,
      parts: storyParts,
      activityId: activityId
    });
  };
  const [submitStoryRequest, triggerRequest] = useAsyncRequest(handleSubmitStory, [], false);

  const handleSubmitClicked = () => {
    if (title.length === 0) return;
    triggerRequest();
  };

  useEffect(() => {
    if (submitStoryRequest.kind === 'success') {
      // story submitted successfully
      if (submitStoryRequest.result.kind === 'ok') {
        if (onStorySubmitted) onStorySubmitted();
      }
      else {
        // problem while submitting the story
        setErrorMessage('There was an error while submitting the story. Please try again later.');
      }
    }

    if (submitStoryRequest.kind === 'failure') {
      // problem while submitting the story
      setErrorMessage('There was an error while submitting the story. Please try again later.')
    }
  }, [submitStoryRequest])

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle='Submit Story'
        stepDescription={`Before submitting your story, please type a title for it down below.`}
      >
        <ArtworkListDottedLine />
        <ShortTextInputCard
          promptText='Write a title for your story:'
          placeholder={`Your story's title here...`}
          value={title}
          onChange={(val) => setTitle(val)}
          alertMessage={errorMessage}
          required
        />

        <ArtworkListDottedLine />

        <ProgressButton
          enabled={title.length > 0}
          style={{ alignSelf: 'center' }}
          onClick={handleSubmitClicked}
        >
          Submit Story
        </ProgressButton>

        {submitStoryRequest.kind === 'running' && (
          <LoadingOverlay
            message='Submitting story'
          />
        )}
      </StepTitleCard>
    </StepRoot>
  );
};

export default SubmitStoryStep;