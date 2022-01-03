import styled from 'styled-components';
import ContentCard from '../../../components/Layout/ContentCard';
import TextInputFieldWithTag from '../../../components/Forms/TextInputFieldWithTag';
import { StepComponentProps } from '../../../components/Navigation/Steps';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  align-self: center;
`;

/**
 * <img src="media://InputBasicInformation.PNG" alt="InputBasicInformation">
 */
export const BasicInformationStep = (props: StepComponentProps): JSX.Element => {
  return (
    <Root>
      <ContentCard
        cardTitle='Basic Information'
        titleAlign='center'
        width='900px'
      >
        <CardContent>
          <TextInputFieldWithTag
            initialValue={props.getState<string>('treasureHuntTitle', '')}
            placeholder='Treasure Hunt name...'
            fieldName={`Choose a name for your treasure hunt`.toUpperCase()}
            onChange={(val) => props.setState<string>('treasureHuntTitle', val, '')}
          />
          <TextInputFieldWithTag
            initialValue={props.getState<string>('treasureHuntAuthor', '')}
            placeholder='Treasure Hunt author...'
            fieldName={`Specify the treasure hunt's author`.toUpperCase()}
            onChange={(val) => props.setState<string>('treasureHuntAuthor', val, '')}
          />
        </CardContent>
      </ContentCard>
    </Root>
  );
}

export default BasicInformationStep;