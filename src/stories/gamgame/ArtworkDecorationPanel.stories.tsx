import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkStoriesList, { ArtworkDecorationPanel } from '../../templates/GamGame/components/ArtworkStoriesPanel/ArtworkDecorationPanel';
import { ArtworkData } from '../../services/artwork.model';
import * as SampleImage from '../assets/head_of_a_girl.jpg';
import {StoryPartEmoji, StoryPartTag} from "../../services/gamGameActivity.model";

export default {
  title: 'GAM Game/Artwork Decoration Panel',
  component: ArtworkDecorationPanel,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkDecorationPanel>;

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const emoji1: StoryPartEmoji={
  emoji: '🤩',
  locationX: 0,
  locationY: 0
};

const emoji2: StoryPartEmoji={
  emoji: '🧐'  ,
  locationX: 10,
  locationY: 0
};

const emojis: StoryPartEmoji[] = [emoji1, emoji2];

const tag1: StoryPartTag={
  tag: 'chachipistachi',
  locationX: 5,
  locationY: 5
}

const tag2: StoryPartTag={
  tag: 'Olee',
  locationX: 30,
  locationY: 0
}

const tags: StoryPartTag[] = [tag1, tag2];


const Template: ComponentStory<typeof ArtworkDecorationPanel> = (args) => <ArtworkDecorationPanel {...args} />;

export const panel = Template.bind({});
panel.args = {
  artworkSrc: SampleImage.default,
  emojis: emojis,
  tags: tags
};

