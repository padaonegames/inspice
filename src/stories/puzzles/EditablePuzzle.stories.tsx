import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import EditablePuzzleComponent from '../../templates/EscapeRoomAuthoring/components/EditableStage';
import { stageMappings } from '../../templates/EscapeRoomAuthoring/Screen';

export default {
  title: 'Puzzles/Editable Puzzle',
  component: EditablePuzzleComponent,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof EditablePuzzleComponent>;

const Template: ComponentStory<typeof EditablePuzzleComponent> = (args) => <EditablePuzzleComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  stageMappings: stageMappings
};