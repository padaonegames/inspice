import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import { EditableStepTitleCard } from '../../../components/Forms/Cards/StepTitleCard';

export default {
  title: 'Forms/Cards/Editable Step Title Card',
  component: EditableStepTitleCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof EditableStepTitleCard>;

const Template: ComponentStory<typeof EditableStepTitleCard> = (args) => <EditableStepTitleCard {...args} />;

export const FilledIn = Template.bind({});
FilledIn.args = {
  stepTitle: 'Basic Information',
  stepDescription: `Below, enter the basic information about your activity, such as title, description, author, start and end dates, thumbnail image, and possible tags.`
};

export const Default = Template.bind({});
Default.args = {};

export const RequiredAlert = Template.bind({});
RequiredAlert.args = {
  requiredAlert: true,
  alertMessage: 'Please fill in this item'
};