import styled from "styled-components";
import CalendarInputCard from "../../../../components/Forms/Cards/CalendarInputCard";
import EmbedImageLinkCard from "../../../../components/Forms/Cards/EmbedImageLinkCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import TagsInputCard from "../../../../components/Forms/Cards/TagsInputCard";
import { StepComponentProps } from "../../../../components/Navigation/TypedSteps";
import { MultistageFormActivityDefinition } from "../../../../services/multistageFormActivity.model";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  margin-bottom: 4.5vh;
  justify-content: center;
  align-items: center;
`;

export const ActivityInstanceBasicInfoStep = (
  props: StepComponentProps<MultistageFormActivityDefinition>
): JSX.Element => {
  const { state, setState } = props;
  const { beginsOn, endsOn } = state;

  return (
    <Root>
      <StepTitleCard
        stepTitle="Basic Information"
        stepDescription={`Below, enter the basic information about your activity, such as title, description, author,
        start and end dates, thumbnail image, and possible tags.`}
      />
      <ShortTextInputCard
        promptText="Choose a name for your activity:"
        placeholder="Activity name..."
        onChange={(val) =>
          setState((prev) => ({ ...prev, activityTitle: val }))
        }
        value={state.activityTitle}
        maxLength={60}
        required
      />
      <ShortTextInputCard
        promptText={`Enter the activity's author:`}
        placeholder="Activity author..."
        onChange={(val) =>
          setState((prev) => ({ ...prev, activityAuthor: val }))
        }
        value={state.activityAuthor}
        maxLength={30}
        required
      />
      <LongTextInputCard
        promptText={`Enter a description for your activity:`}
        placeholder="Description..."
        onChange={(val) => setState((prev) => ({ ...prev, description: val }))}
        value={state.description}
        maxLength={500}
      />
      <EmbedImageLinkCard
        promptText="Paste the source url of a thumbnail image:"
        onChange={(val) => setState((prev) => ({ ...prev, imageSrc: val }))}
        src={state.imageSrc}
        required
      />
      <TagsInputCard
        promptText="Add tags to help other users find this activity:"
        onChange={(val) => setState((prev) => ({ ...prev, tags: val }))}
        value={state.tags}
      />
      <CalendarInputCard
        promptText="Choose a starting date for this activity:"
        initialDate={beginsOn}
        onChange={(val) =>
          setState((prev) => ({ ...prev, beginsOn: val ?? new Date() }))
        }
        required
      />
      <CalendarInputCard
        promptText="Choose a closing date for this activity:"
        initialDate={endsOn}
        onChange={(val) =>
          setState((prev) => ({ ...prev, endsOn: val ?? new Date() }))
        }
        required
      />
    </Root>
  );
};

export default ActivityInstanceBasicInfoStep;
