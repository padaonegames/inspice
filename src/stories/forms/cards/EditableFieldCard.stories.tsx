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
  fieldDefinition: {
    type: 'calendar',
    promptText: ''
  }
};

export const ShortTextBasic = Template.bind({});
ShortTextBasic.args = {
  fieldDefinition: {
    type: 'short-text',
    promptText: 'Please enter your first and last names below.',
    placeholder: '',
    maxLength: 25
  }
};

export const MultipleChoiceBasic = Template.bind({});
MultipleChoiceBasic.args = {
  fieldDefinition: {
    type: 'multiple-choice',
    promptText: 'Which of the following do you think is more interesting? Please take into account different factors, such as product quality, price or availability, to name a few.',
    answers: ['I think nothing in this list is very interesting', 'I think I have run out of ideas']
  }
};

export const CheckBoxGroupBasic = Template.bind({});
CheckBoxGroupBasic.args = {
  fieldDefinition: {
    type: 'checkbox',
    promptText: 'Which types of input should the user be allowed to choose from?',
    fields: ['Images', 'Tags', 'Long Texts', 'Emojis']
  }
};

export const RequiredAlert = Template.bind({});
RequiredAlert.args = {
  fieldDefinition: {
    type: 'calendar',
    promptText: '',
    required: true,
  },
  requiredAlert: true,
  alertMessage: 'Please input a valid prompt.'
};