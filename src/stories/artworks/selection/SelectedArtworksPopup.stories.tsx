import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import SelectedArtworksPopup from '../../../components/ArtworkSelection/SelectedArtworksPopup';
import { ArtworkData } from '../../../services/artwork.model';
import * as SampleImage from './../../assets/head_of_a_girl.jpg';

export default {
  title: 'Artworks/Selection/Selected Artworks Popup',
  component: SelectedArtworksPopup,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof SelectedArtworksPopup>;

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const samples: ArtworkData[] = [sample, sample, sample];

const Template: ComponentStory<typeof SelectedArtworksPopup> = (args) => <SelectedArtworksPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  artworks: samples
};