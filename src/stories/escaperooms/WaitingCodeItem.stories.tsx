import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { EditableWaitingCodeItemContent, waitingCodeItemFactory } from '../../templates/EscapeRoomAuthoring/components/items/WaitingCodeItem';


export default {
  title: 'Escape Rooms/Waiting Code Item',
  component: EditableWaitingCodeItemContent,
  decorators: [
    (Story) => {
      return (
          Story()
      );
    },
  ],
} as ComponentMeta<typeof EditableWaitingCodeItemContent>;

const Template: ComponentStory<typeof EditableWaitingCodeItemContent> = (args) => <EditableWaitingCodeItemContent {...args} />;

export const Default = Template.bind({});
Default.args = {
  payload: waitingCodeItemFactory.defaultDefinition

  //{waitingCodeItemFactory.defaultDefinition } as EditableWaitingCodeItemContentProps

  // waitingCodeItemFactory.defaultDefinition
 
  // code: '',
  //   texts: ['']
};

export const Alternative = Template.bind({});
Alternative.args = {
  payload: {code: "hola", texts:["Uno", "Dos"]}

  //{waitingCodeItemFactory.defaultDefinition } as EditableWaitingCodeItemContentProps

  // waitingCodeItemFactory.defaultDefinition
 
  // code: '',
  //   texts: ['']
};