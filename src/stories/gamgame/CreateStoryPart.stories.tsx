import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkStoriesList, { CreateStoryPart } from '../../templates/GamGame/components/ArtworkStoriesPanel/CreateStoryPart';
import { ArtworkData } from '../../services/artwork.model';
import * as SampleImage from '../assets/head_of_a_girl.jpg';

export default {
  title: 'GAM Game/Create Story Part',
  component: CreateStoryPart,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof CreateStoryPart>;

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};


const Template: ComponentStory<typeof CreateStoryPart> = (args) => <CreateStoryPart {...args} />;

export const storyPart = Template.bind({});
storyPart.args = {
  artwork: sample
};

