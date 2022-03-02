import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import CalendarInputCard from '../../../components/Forms/Cards/CalendarInputCard';

export default {
  title: 'Forms/Cards/Calendar Input Card',
  component: CalendarInputCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof CalendarInputCard>;

const Template: ComponentStory<typeof CalendarInputCard> = (args) => <CalendarInputCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  promptText:'Choose a starting date for this activity:',
  initialDate: new Date(2022, 5, 24),
  required: false
};

export const InvalidDate = Template.bind({});
InvalidDate.args = {
  promptText:'Choose a starting date for this activity:',
  initialDate: new Date('65-59-1667'),
  required: true
};