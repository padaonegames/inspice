import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import MultipleChoiceCard from '../../../components/Forms/Cards/MultipleChoiceCard';

export default {
  title: 'Forms/Cards/Multiple Choice Card',
  component: MultipleChoiceCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof MultipleChoiceCard>;

const Template: ComponentStory<typeof MultipleChoiceCard> = (args) => <MultipleChoiceCard {...args} />;

export const NoneChecked = Template.bind({});
NoneChecked.args = {
  promptText: 'How do you usually go to school?:',
  answers: ['On Foot', 'By Bike', 'By Car', 'By Train', 'Other'],
  selectedAnswers: [],
  maxAnswers: 2,
  required: false,
  requiredAlert: false
};

export const MaximumChecked = Template.bind({});
MaximumChecked.args = {
  promptText: 'How do you usually go to school? (choose up to 2):',
  answers: ['On Foot', 'By Bike', 'By Car', 'By Train', 'Other'],
  selectedAnswers: [1, 3],
  maxAnswers: 2,
  required: false,
  requiredAlert: false
};

export const SomeChecked = Template.bind({});
SomeChecked.args = {
  promptText: 'How do you usually go to school? (choose up to 2):',
  answers: ['On Foot', 'By Bike', 'By Car', 'By Train', 'Other'],
  selectedAnswers: [1],
  maxAnswers: 2,
  required: false,
  requiredAlert: false
};