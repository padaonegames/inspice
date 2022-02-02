import { ArtworkData } from "../../../../../services/artwork.model";
import { GamGameStoryPart } from "../../../../../services/gamGameActivity.model";
import { StepRoot } from "../../generalStyles";
import CreateStoryPart from "../CreateStoryPart";

interface CreateStoryPartStepProps {
  /** Artwork about which this story part will be created */
  artworkData: ArtworkData;
  /** callback to parent component with completed story part as a parameter indicating that the user wishes to submit their current part */
  onSubmitStoryPart?: (storyPart: GamGameStoryPart) => void;
  /** Callback to parent specifying that the user wishes to give up on this story */
  onQuit?: () => void;
}

export const CreateStoryPartStep = (props: CreateStoryPartStepProps): JSX.Element => {

  const { artworkData, onSubmitStoryPart, onQuit } = props;

  const handleQuitStoryPart = () => {
    const time = Date.now();
    const res = window.confirm('Are you sure you want to go back to the artwork selection screen? Your progress in this story part will be lost.');
    if ((res || (Date.now() - time < 10)) && onQuit) {
      onQuit();
    }
  }

  return (
    <StepRoot>
      <CreateStoryPart
        artwork={artworkData}
        onSubmitPart={onSubmitStoryPart}
        onQuit={handleQuitStoryPart}
      />
    </StepRoot>
  );
};

export default CreateStoryPartStep;