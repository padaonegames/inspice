import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import AccordionItem from '../../templates/Viewpoints/AccordionItem';
import { Artwork } from '../../services/viewpointsArtwork.model';
import { Response } from '../../services/viewpointsResponse.model';

import * as SampleImage from '../assets/head_of_a_girl.jpg';
import { ArtworkData } from '../../services/artwork.model';

export default {
  title: 'Viewpoints/Accordion Item',
  component: AccordionItem,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof AccordionItem>;


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

const res: Response = {
  questionID: '',
  artworkID: '1',
  questionAsked: "Where did the author born?",
  response: 'In Berlin, Germany.',
  datetimeSubmitted: new Date("9-6-2021"),
  userResponseID: ''
}

const responses: Response[] = [res, res]

const Template: ComponentStory<typeof AccordionItem> = (args) => <AccordionItem {...args} />;

export const item = Template.bind({});
item.args = {
  artwork: sample,
  responses: responses
};

