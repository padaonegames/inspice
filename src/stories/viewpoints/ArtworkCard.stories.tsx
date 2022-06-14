import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkCard from '../../templates/Viewpoints/ArtworkCard';
import { Artwork } from '../../services/viewpointsArtwork.model';
import { Response } from '../../services/viewpointsResponse.model';

import * as SampleImage from '../assets/head_of_a_girl.jpg';
import { ArtworkData } from '../../services/artwork.model';
import { Card } from 'styled-icons/ionicons-solid';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Viewpoints/Artwork Card',
  component: ArtworkCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkCard>;


const sample: Artwork = {
  _id: '1',
  name: 'Head of a girl',
  artist: 'Lucian Freud',
  description: 'Oil on canvas',
  date: new Date("11-3-1976"),
  imageLoc: 'IMMA Collection: On Loan',
  image: SampleImage.default,
  audio: '',
  notes: '',
  URL: ''
};


const Template: ComponentStory<typeof ArtworkCard> = (args) => <ArtworkCard {...args} />;

export const card = Template.bind({});
card.args = {
  artworkData: sample
};

