import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ClueHolder from '../../templates/FindArtwork/components/ClueHolder';

export default {
  title: 'Find Artwork/Clue Holder',
  component: ClueHolder,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ClueHolder>;

const  clues: string[] =['It is a portrait', 'The author was german... But also an englishman', 'MCMLXXV']

const Template: ComponentStory<typeof ClueHolder> = (args) => <ClueHolder {...args} />;

export const panel = Template.bind({});
panel.args = {
  clues: clues
};

