import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkSelectionCard from '../../../components/ArtworkSelection/ArtworkSelectionCard';
import { ArtworkData } from '../../../services/artwork.model';
import * as SampleImage from './../../assets/head_of_a_girl.jpg';

export default {
  title: 'Artworks/Selection/Artwork Selection Card',
  component: ArtworkSelectionCard,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkSelectionCard>;

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const Template: ComponentStory<typeof ArtworkSelectionCard> = (args) => <ArtworkSelectionCard {...args} />;

export const Unselected = Template.bind({});
Unselected.args = {
  artworkData: sample,
  selected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  artworkData: sample,
  selected: true,
};