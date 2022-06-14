import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkPopup from '../../templates/FindArtwork/components/ArtworkPopup';
import { ArtworkData } from '../../services/artwork.model';
import * as SampleImage from '../assets/head_of_a_girl.jpg';

export default {
  title: 'Find Artwork/Artwork Popup',
  component: ArtworkPopup,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkPopup>;

const  prizes: string[] =['Gold', 'Competitor']

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const Template: ComponentStory<typeof ArtworkPopup> = (args) => <ArtworkPopup {...args} />;

export const prop = Template.bind({});
prop.args = {
  flipped: true,
  prize: prizes,
  artworkData: sample
};

