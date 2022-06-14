import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworksComponent from '../../templates/Viewpoints/ArtworksComponent';
import { Artwork } from '../../services/viewpointsArtwork.model';
import { Response } from '../../services/viewpointsResponse.model';

import * as SampleImage from '../assets/head_of_a_girl.jpg';
import { ArtworkData } from '../../services/artwork.model';
import { Card } from 'styled-icons/ionicons-solid';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Viewpoints/Artworks Component',
  component: ArtworksComponent,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <MemoryRouter initialEntries={['/']}>
          {Story()}
        </MemoryRouter>
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworksComponent>;


const sample: Artwork = {
  _id: '1',
  name: 'Head of a girl',
  artist: 'Lucian Freud',
  description: 'Oil on canvas',
  date: new Date(),
  imageLoc: 'IMMA Collection: On Loan',
  image: SampleImage.default,
  audio: '',
  notes: '',
  URL: ''
};

const samples: Artwork[] = [sample, sample]


const Template: ComponentStory<typeof ArtworksComponent> = (args) => <ArtworksComponent {...args} />;

export const card = Template.bind({});
card.args = {
  artworks: samples
};

