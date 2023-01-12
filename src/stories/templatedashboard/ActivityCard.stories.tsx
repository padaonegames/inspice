import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";

import ActivityCard from "../../templates/TemplateDashboard/components/ActivityCard";
import {
  ActivityInstance,
  SupportedActivity,
} from "../../services/activity.model";

export default {
  title: "Template Dashboard/Activity Card",
  component: ActivityCard,
  decorators: [(Story) => <div style={{ margin: "3em" }}>{Story()}</div>],
} as ComponentMeta<typeof ActivityCard>;

const supAct: SupportedActivity = "Treasure Hunt";

const activity: ActivityInstance = {
  activityType: supAct,
  activityTitle: "Finding treasure",
  activityAuthor: "Me, myself and I",
  beginsOn: new Date("09-19-1997"),
  endsOn: new Date(),
  _id: "",
};

const Template: ComponentStory<typeof ActivityCard> = (args) => (
  <ActivityCard {...args} />
);

export const card = Template.bind({});
card.args = {
  title: activity.activityTitle,
  author: activity.activityAuthor,
  thumbnailSrc: activity.imageSrc,
};
