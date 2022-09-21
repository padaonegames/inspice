import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { EditableUnlockPasswordItemContent, unlockPasswordItemFactory } from '../../templates/EscapeRoomAuthoring/components/items/UnlockPasswordtem';


export default {
  title: 'Escape Rooms/Unlock Password Item',
  component: EditableUnlockPasswordItemContent,
  decorators: [
    (Story) => {
      return (
          Story()
      );
    },
  ],
} as ComponentMeta<typeof EditableUnlockPasswordItemContent>;

const Template: ComponentStory<typeof EditableUnlockPasswordItemContent> = (args) => <EditableUnlockPasswordItemContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  payload: unlockPasswordItemFactory.defaultDefinition
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: {password: [1,2,3,4], description:"This is an alternative description"}
};