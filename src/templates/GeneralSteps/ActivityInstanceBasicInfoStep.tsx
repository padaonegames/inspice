import styled from "styled-components";
import CalendarInputCard from "../../components/Forms/Cards/CalendarInputCard";
import EmbedImageLinkCard from "../../components/Forms/Cards/EmbedImageLinkCard";
import LongTextInputCard from "../../components/Forms/Cards/LongTextInputCard";
import ShortTextInputCard from "../../components/Forms/Cards/ShortTextInputCard";
import StepTitleCard from "../../components/Forms/Cards/StepTitleCard";
import TagsInputCard from "../../components/Forms/Cards/TagsInputCard";
import { StepComponentProps } from "../../components/Navigation/Steps";

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
export const ActivityInstanceBasicInfoStep = (
  props: StepComponentProps
): JSX.Element => {
  const beginsOn = props.getState<Date | undefined>("beginsOn", undefined);
  const endsOn = props.getState<Date | undefined>("endsOn", undefined);

  return (
    <Root>
      <StepTitleCard
        stepTitle="Basic Information"
        stepDescription={`Below, enter the basic information about your activity, such as title, description, author,
        start and end dates, thumbnail image, and possible tags.`}
      />
      <ShortTextInputCard
        promptText="Choose a name for your activity:"
        fieldPayload={{
          placeholder: "Activity Name...",
          maxLength: 60,
        }}
        onResponseChanged={(res) =>
          props.setState<string>("activityTitle", res.text, "")
        }
        response={{ text: props.getState<string>("activityTitle", "") }}
        required
      />
      <ShortTextInputCard
        promptText="Enter the activity's author:"
        fieldPayload={{
          placeholder: "Activity author...",
          maxLength: 30,
        }}
        onResponseChanged={(res) =>
          props.setState<string>("activityAuthor", res.text, "")
        }
        response={{ text: props.getState<string>("activityAuthor", "") }}
        required
      />
      <LongTextInputCard
        promptText="Enter a description for your activity:"
        fieldPayload={{
          placeholder: "Description...",
          maxLength: 500,
        }}
        onResponseChanged={(res) =>
          props.setState<string>("description", res.text, "")
        }
        response={{ text: props.getState<string>("description", "") }}
      />
      <EmbedImageLinkCard
        promptText="Paste the source url of a thumbnail image:"
        src={props.getState<string | undefined>("imageSrc", undefined)}
        onChange={(src) =>
          props.setState<string | undefined>("imageSrc", src, undefined)
        }
        required
      />
      <TagsInputCard
        promptText="Add tags to help other users find this activity:"
        value={props.getState<string[] | undefined>("tags", [])}
        onChange={(tags) =>
          props.setState<string[] | undefined>("tags", tags, [])
        }
      />
      <CalendarInputCard
        promptText="Choose a starting date for this activity:"
        fieldPayload={{}}
        response={{ date: beginsOn }}
        onResponseChanged={(res) =>
          props.setState<Date | undefined>("beginsOn", res.date, undefined)
        }
        required
      />
      <CalendarInputCard
        promptText="Choose a closing date for this activity:"
        fieldPayload={{}}
        response={{ date: endsOn }}
        onResponseChanged={(res) =>
          props.setState<Date | undefined>("endsOn", res.date, undefined)
        }
        required
      />
    </Root>
  );
}; // ActivityInstanceBasicInfoStep

export default ActivityInstanceBasicInfoStep;
