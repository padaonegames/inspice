import { useState } from "react";
import ShortTextInputCard from "../../../../../components/Forms/Cards/ShortTextInputCard";
import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import { GamGameStoryPart } from "../../../../../services/gamGameActivity.model";
import { ArtworkListDottedLine, ProgressButton, StepRoot } from "../../generalStyles";

interface SubmitStoryStepProps {
  /** parts of the story that will be submitted in this step */
  storyParts: GamGameStoryPart[];
}

export const SubmitStoryStep = (props: SubmitStoryStepProps): JSX.Element => {

  const { storyParts } = props;

  const [title, setTitle] = useState<string>('');

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
        />

        <ArtworkListDottedLine />

        <ProgressButton
          enabled={title.length > 0}
          style={{ alignSelf: 'center' }}
        >
          Submit Story
        </ProgressButton>
      </StepTitleCard>
    </StepRoot>
  );
};

export default SubmitStoryStep;