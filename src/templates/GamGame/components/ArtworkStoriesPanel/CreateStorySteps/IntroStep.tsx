import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import { ArtworkListDottedLine, ProgressButton, StepRoot } from "../../generalStyles";

interface IntroStepProps {
  /** callback to parent component specifying that the user has clicked on the begin button */
  onBeginClicked?: () => void;
}

export const IntroStep = (props: IntroStepProps): JSX.Element => {

  const { onBeginClicked } = props;

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle='New GAM Game Story'
        stepDescription={`
        So you've decided to create a new GAM Game Story...
        
        In the next few steps, you will be prompted to select different artworks ` +
          `from the GAM collection (between 2 and 3) and share your thoughts and feelings about them. ` +
          `You can even add your own tags and emojis to the artworks!

        Please press BEGIN to start creating your personal story.
        `}
      >
        <ArtworkListDottedLine />
        <ProgressButton
          style={{ alignSelf: 'center' }}
          enabled
          onClick={onBeginClicked}
        >
          BEGIN
        </ProgressButton>
      </StepTitleCard>
    </StepRoot>
  );
};

export default IntroStep;