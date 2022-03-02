import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import EditableFieldCard from '../../../components/Forms/Cards/EditableFieldCard';

export default {
  title: 'Forms/Cards/Editable Field Card',
  component: EditableFieldCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof EditableFieldCard>;

const Template: ComponentStory<typeof EditableFieldCard> = (args) => <EditableFieldCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  promptText: '',
  fieldType: 'checkbox'
};

export const LongText = Template.bind({});
LongText.args = {
  fieldType: 'multiple-choice',
  promptText: 'Which of the following do you think is more interesting? Please take into account different factors, such as product quality, price or availability, to name a few.'
};

export const RequiredAlert = Template.bind({});
RequiredAlert.args = {
  fieldType: 'likert-scale',
  promptText: '',
  required: true,
  requiredAlert: true,
  alertMessage: 'Please input a valid prompt.'
};