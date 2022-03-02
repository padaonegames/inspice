import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkSearchResults from '../../../components/ArtworkSelection/ArtworkSearchResults';
import { ArtworkData } from '../../../services/artwork.model';
import * as SampleImage from './../../assets/head_of_a_girl.jpg';

export default {
  title: 'Artworks/Selection/Artwork Search Results',
  component: ArtworkSearchResults,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkSearchResults>;

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const Template: ComponentStory<typeof ArtworkSearchResults> = (args) => <ArtworkSearchResults {...args} />;

export const Default = Template.bind({});
Default.args = {
  artworks: [...Array(15).map((_, i) => i)].map(_ => sample),
  selectedArtworks: [],
  page: 4,
  pageTotal: 15
};