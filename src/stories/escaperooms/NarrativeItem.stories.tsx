import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { EditableNarrativeItemContent, narrativeItemFactory } from '../../templates/EscapeRoomAuthoring/components/items/NarrativeItem';


export default {
  title: 'Escape Rooms/Narrative Item',
  component: EditableNarrativeItemContent,
  decorators: [
    (Story) => {
      return (
          Story()
      );
    },
  ],
} as ComponentMeta<typeof EditableNarrativeItemContent>;

const Template: ComponentStory<typeof EditableNarrativeItemContent> = (args) => <EditableNarrativeItemContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  payload: narrativeItemFactory.defaultDefinition
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: {dialogs: ['Hola', 'Adios'], characters:['Pepe', 'Manolo']}
};