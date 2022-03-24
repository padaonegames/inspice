import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkFailed from '../../templates/FindArtwork/components/ArtworkFailed';
import * as SampleImage from '../assets/head_of_a_girl.jpg';

export default {
  title: 'Find Artwork/Artwork Failed',
  component: ArtworkFailed,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkFailed>;

const Template: ComponentStory<typeof ArtworkFailed> = (args) => <ArtworkFailed {...args} />;

export const image = Template.bind({});
image.args = {
  flipped: true,
  image: SampleImage.default,
  title: 'Head of a girl'
};

