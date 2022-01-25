import styled from 'styled-components';
import ShortTextInputCard from '../../../../components/Forms/Cards/ShortTextInputCard';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import { StepComponentProps } from '../../../../components/Navigation/Steps';

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
export const BasicInformationStep = (props: StepComponentProps): JSX.Element => {
  return (
    <Root>
      <StepTitleCard
        stepTitle='Basic Information'
        stepDescription={`Below, enter the basic information about your treasure hunt, such as its title and author.`}
      />
      <ShortTextInputCard
        promptText='Choose a name for your treasure hunt:'
        placeholder='Treasure Hunt name...'
        onChange={(val) => props.setState<string>('treasureHuntTitle', val, '')}
        value={props.getState<string>('treasureHuntTitle', '')}
        maxLength={30}
        required
      />
      <ShortTextInputCard
        promptText={`Specify the treasure hunt's author:`}
        placeholder='Treasure Hunt author...'
        onChange={(val) => props.setState<string>('treasureHuntAuthor', val, '')}
        value={props.getState<string>('treasureHuntAuthor', '')}
        maxLength={30}
        required
      />
    </Root>
  );
}

export default BasicInformationStep;
