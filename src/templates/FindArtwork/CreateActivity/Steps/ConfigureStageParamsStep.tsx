import styled from "styled-components";
import CheckBoxGroupInputCard from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";
import RangeInputCard from "../../../../components/Forms/Cards/RangeInputCard";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { AllowedInputs } from "../../../../services/findArtworkActivity.model";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.5vh;
`;

/**
 * <img src="media://ConfigureStageParamsStage.PNG" alt="ConfigureStageParamsStage">
 */
export const ConfigureStageParamsStep = (props: StepComponentProps) => {
  return (
    <Root>
      <StepTitleCard
        stepTitle="Find Artwork - Stage Settings"
        stepDescription={`Below, enter the neccesary restrictions on the users' treasure hunts, including
          the range of artworks that they will be allowed to choose, the number of hints that they should
          write for future players of their treasure hunts, and the types of media inputs that they will be 
          allowed to submit as rewards for completing the different stages of the hunt.`}
      />
      <RangeInputCard
        promptText="Specify the required number of artworks to pick:"
        onMinValueChange={(val) => props.setState<number>("minStages", val, 1)}
        onMaxValueChange={(val) => props.setState<number>("maxStages", val, 1)}
        required
        min={1}
        max={10}
        initialMin={props.getState<number | undefined>("minStages", 1)}
        initialMax={props.getState<number | undefined>("maxStages", 4)}
      />
      <RangeInputCard
        promptText="Specify the required number of hints per artwork:"
        onMinValueChange={(val) =>
          props.setState<number>("minCluesPerStage", val, 1)
        }
        onMaxValueChange={(val) =>
          props.setState<number>("maxCluesPerStage", val, 1)
        }
        required
        min={1}
        max={10}
        initialMin={props.getState<number | undefined>("minCluesPerStage", 1)}
        initialMax={props.getState<number | undefined>("maxCluesPerStage", 4)}
      />
      <CheckBoxGroupInputCard
        promptText="Specify allowed media input types:"
        fieldPayload={{
          fields: ["Text", "Audio", "Image"],
        }}
        onResponseChanged={(res) =>
          props.setState<AllowedInputs[]>(
            "allowedInputs",
            (res.selectedFields as AllowedInputs[]) ?? [],
            []
          )
        }
        response={{
          selectedFields: props.getState<AllowedInputs[]>("allowedInputs", []),
        }}
        required
      />
    </Root>
  );
}; // ConfigureStageParamsStep

export default ConfigureStageParamsStep;
