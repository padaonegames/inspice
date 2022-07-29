import styled from "styled-components";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;
`;

/**
 * <img src="media://InputBasicInformation.PNG" alt="InputBasicInformation">
 */
export const BasicInformationStep = (
  props: StepComponentProps
): JSX.Element => {
  return (
    <Root>
      <StepTitleCard
        stepTitle="Basic Information"
        stepDescription={`Below, enter the basic information about your treasure hunt, such as its title and author.`}
      />
      <ShortTextInputCard
        promptText="Choose a name for your treasure hunt:"
        fieldPayload={{
          placeholder: "Treasure Hunt Name...",
          maxLength: 30,
        }}
        onResponseChanged={(res) =>
          props.setState<string>("treasureHuntTitle", res.text, "")
        }
        response={{ text: props.getState<string>("treasureHuntTitle", "") }}
        required
      />
      <ShortTextInputCard
        promptText={`Specify the treasure hunt's author:`}
        fieldPayload={{
          placeholder: "Treasure Hunt author...",
          maxLength: 30,
        }}
        onResponseChanged={(res) =>
          props.setState<string>("treasureHuntAuthor", res.text, "")
        }
        response={{ text: props.getState<string>("treasureHuntAuthor", "") }}
        required
      />
    </Root>
  );
}; // BasicInformationStep

export default BasicInformationStep;
