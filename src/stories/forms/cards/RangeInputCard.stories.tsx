import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import RangeInputCard from '../../../components/Forms/Cards/RangeInputCard';

export default {
  title: 'Forms/Cards/Range Input Card',
  component: RangeInputCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof RangeInputCard>;

const Template: ComponentStory<typeof RangeInputCard> = (args) => <RangeInputCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  promptText: 'Specify the required number of artworks to pick:',
  required: false,
  min: 1,
  max: 10,
  initialMin: 1,
  initialMax: 4
};