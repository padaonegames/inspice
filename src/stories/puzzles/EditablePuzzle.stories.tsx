import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import styled from 'styled-components';
import { RadioCircleMarked } from "styled-icons/boxicons-regular";

import EditablePuzzleComponent, { PuzzleMapping } from '../../templates/EscapeRoomAuthoring/components/EditablePuzzle';
import { multipleChoicePuzzleFactory } from '../../templates/EscapeRoomAuthoring/components/MutipleChoicePuzzle';
import { puzzleTypeIcon } from '../../templates/EscapeRoomAuthoring/components/PuzzleSettingsContainer';

const MultipleChoiceIcon = styled(RadioCircleMarked)`
  ${puzzleTypeIcon}
`;

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

const puzzleMappings: PuzzleMapping[] = [
  {
    puzzleType: 'multiple-choice',
    displayName: 'Multiple Choice',
    iconComponent: <MultipleChoiceIcon />,
    defaultPuzzlePayload: multipleChoicePuzzleFactory.defaultPuzzleDefinition,
    editingComponentProducer: multipleChoicePuzzleFactory.puzzleEditingComponent as any
  }
];

export const Default = Template.bind({});
Default.args = {
  puzzleMappings: puzzleMappings
};