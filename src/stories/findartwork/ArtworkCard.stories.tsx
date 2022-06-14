import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkCard, { ArtworkCardStatus } from '../../templates/FindArtwork/components/ArtworkCard';
import { ArtworkData } from '../../services/artwork.model';
import * as SampleImage from '../assets/head_of_a_girl.jpg';

export default {
  title: 'Find Artwork/Artwork Card',
  component: ArtworkCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkCard>;

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const awstatus: ArtworkCardStatus = {
  status: 'wrong'
}

const Template: ComponentStory<typeof ArtworkCard> = (args) => <ArtworkCard {...args} />;

export const panel = Template.bind({});
panel.args = {
  artworkData: sample,
  status: awstatus,
  flipped: false
};

