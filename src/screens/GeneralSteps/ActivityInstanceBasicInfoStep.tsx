import styled from 'styled-components';
import CalendarInputCard from '../../components/Forms/Cards/CalendarInputCard';
import ImageUploadCard from '../../components/Forms/Cards/ImageUploadCard';
import LongTextInputCard from '../../components/Forms/Cards/LongTextInputCard';
import ShortTextInputCard from '../../components/Forms/Cards/ShortTextInputCard';
import StepTitleCard from '../../components/Forms/Cards/StepTitleCard';
import TagsInputCard from '../../components/Forms/Cards/TagsInputCard';
import { StepComponentProps } from '../../components/Navigation/Steps';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  margin-bottom: 4.5vh;
  justify-content: center;
  align-items: center;
`;

/**
 * <img src="media://SetTitleAuthorDatesStage.PNG" alt="SetTitleAuthorDatesStage">
 */
export const ActivityInstanceBasicInfoStep = (props: StepComponentProps): JSX.Element => {

  const beginsOn = props.getState<Date | undefined>('beginsOn', undefined);
  const endsOn = props.getState<Date | undefined>('endsOn', undefined);

  return (
    <Root>
      <StepTitleCard
        stepTitle='Basic Information'
        stepDescription={`Below, enter the basic information about your activity, such as title, description, author,
        start and end dates, thumbnail image, and possible tags.`}
      />
      <ShortTextInputCard
        promptText='Choose a name for your activity:'
        placeholder='Activity name...'
        onChange={(val) => props.setState<string>('activityTitle', val, '')}
        value={props.getState<string>('activityTitle', '')}
        maxLength={30}
        required
      />
      <ShortTextInputCard
        promptText={`Enter the activity's author:`}
        placeholder='Activity author...'
        onChange={(val) => props.setState<string>('activityAuthor', val, '')}
        value={props.getState<string>('activityAuthor', '')}
        maxLength={30}
        required
      />
      <LongTextInputCard
        promptText={`Enter a description for your activity:`}
        placeholder='Description...'
        onChange={(val) => props.setState<string>('description', val, '')}
        value={props.getState<string>('description', '')}
        maxLength={500}
      />
      <ImageUploadCard
        promptText='Upload a thumbnail image:'
        onChange={(file) => props.setState<File | undefined>('localFile', file, undefined)}
        initialFile={props.getState<File | undefined>('localFile', undefined)}
        initialSrc={props.getState<string | undefined>('imageSrc', undefined)}
        required
      />
      <TagsInputCard
        promptText='Add tags to help other users find this activity:'
        value={props.getState<string[] | undefined>('tags', [])}
        onChange={(tags) => props.setState<string[] | undefined>('tags', tags, [])}
      />
      <CalendarInputCard
        promptText='Choose a starting date for this activity:'
        initialDate={beginsOn}
        onChange={(date) => props.setState<Date | undefined>('beginsOn', date, undefined)}
        required
      />
      <CalendarInputCard
        promptText='Choose a closing date for this activity:'
        initialDate={endsOn}
        onChange={(date) => props.setState<Date | undefined>('endsOn', date, undefined)}
        required
      />
    </Root>
  );
}

export default ActivityInstanceBasicInfoStep;