import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import EditableFieldCard, {  } from '../../../components/Forms/Cards/EditableFieldCard';
import { fieldMappings } from '../../../templates/MultistageForm/CreateActivity/Steps/DefineMultistageFormStep';

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
  fieldMappings: fieldMappings
};