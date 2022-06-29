import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkCorrect from '../../templates/FindArtwork/components/ArtworkCorrect';
import * as SampleImage from '../assets/head_of_a_girl.jpg';

export default {
  title: 'Find Artwork/Artwork Correct',
  component: ArtworkCorrect,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkCorrect>;

const Template: ComponentStory<typeof ArtworkCorrect> = (args) => <ArtworkCorrect {...args} />;

export const image = Template.bind({});
image.args = {
  flipped: true,
  image: SampleImage.default,
  title: 'Head of a girl'
};

