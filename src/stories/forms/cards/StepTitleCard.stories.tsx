import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import StepTitleCard from '../../../components/Forms/Cards/StepTitleCard';

export default {
  title: 'Forms/Cards/Step Title Card',
  component: StepTitleCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof StepTitleCard>;

const Template: ComponentStory<typeof StepTitleCard> = (args) => <StepTitleCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  stepTitle: 'Basic Information',
  stepDescription: `Below, enter the basic information about your activity, such as title, description, author,
  start and end dates, thumbnail image, and possible tags.`
};