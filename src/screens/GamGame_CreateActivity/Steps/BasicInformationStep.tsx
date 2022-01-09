import styled from 'styled-components';
import SelectDatePanel from '../../../components/Forms/SelectDatePanel';
import TextInputFieldWithTag from '../../../components/Forms/TextInputFieldWithTag';
import ContentCard from '../../../components/Layout/ContentCard';
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
  width: 100%;
  height: auto;
`;

/**
 * <img src="media://SetTitleAuthorDatesStage.PNG" alt="SetTitleAuthorDatesStage">
 */
export const BasicInformationStep = (props: StepComponentProps): JSX.Element => {
  return (
    <Root>
      <ContentCard
        titleAlign='center'
        cardTitle='Basic Information'
        width='95%'
      >
        <CardContent>
          <TextInputFieldWithTag
            initialValue={props.getState<string>('activityTitle', '')}
            placeholder='Activity name...'
            fieldName={`Choose a name for your activity`.toUpperCase()}
            onChange={(val) => props.setState<string>('activityTitle', val, '')}
          />
          <TextInputFieldWithTag
            initialValue={props.getState<string>('activityAuthor', '')}
            placeholder='Activity author...'
            fieldName={`Specify the activity's author`.toUpperCase()}
            onChange={(val) => props.setState<string>('activityAuthor', val, '')}
          />
          <SelectDatePanel
            onFromSelected={(from) => {
              props.setState<Date | undefined | null>('beginsOn', from, undefined);
            }}
            onToSelected={(to) => {
              props.setState<Date | undefined | null>('endsOn', to, undefined);
            }}
            from={props.getState<Date | undefined | null>('beginsOn', undefined)}
            to={props.getState<Date | undefined | null>('endsOn', undefined)}
          />
        </CardContent>
      </ContentCard>
    </Root>
  );
}

export default BasicInformationStep;