import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import IntegerRangeSlider from '../../components/Forms/IntegerRangeSlider';

export default {
  title: 'Forms/Integer Range Slider',
  component: IntegerRangeSlider,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof IntegerRangeSlider>;

const Template: ComponentStory<typeof IntegerRangeSlider> = (args) => <IntegerRangeSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 10,
  step: 2,
  initialMin: 2,
  initialMax: 5
};