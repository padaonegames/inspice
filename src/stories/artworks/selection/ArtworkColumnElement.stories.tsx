import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkColumnElement from '../../../components/ArtworkSelection/ArtworkColumnElement';
import * as SampleImage from './../../assets/head_of_a_girl.jpg';

export default {
  title: 'Artworks/Selection/Artwork Column Element',
  component: ArtworkColumnElement,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkColumnElement>;

const Template: ComponentStory<typeof ArtworkColumnElement> = (args) => <ArtworkColumnElement {...args} />;

export const Default = Template.bind({});
Default.args = {
  artworkData: {
    src: SampleImage.default,
    id: '',
    title: 'Head of a girl',
    author: 'Lucian Freud',
    info: 'Oil on canvas',
    date: '1975',
    location: 'IMMA Collection: On Loan'
  }
};