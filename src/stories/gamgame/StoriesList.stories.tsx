import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import StoriesList from '../../templates/GamGame/components/ArtworkStoriesPanel/StoriesList';
import { ArtworkData } from '../../services/artwork.model';
import * as SampleImage from '../assets/head_of_a_girl.jpg';
import {GamGameStoryDefinitionData, GamGameStoryPart, GamGameStoryPartMutimediaData} from '../../services/gamGameActivity.model'
import {StoryPartEmoji, StoryPartTag} from "../../services/gamGameActivity.model";


export default {
  title: 'GAM Game/Stories List',
  component: StoriesList,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof StoriesList>;

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

const storyPartMult: GamGameStoryPartMutimediaData = {
  textTemplate: 'plantilla',
  text: 'texto',
  emojis: emojis,
  tags: tags
}


const storyPart: GamGameStoryPart={
  artworkId: '1942',
  multimediaData: storyPartMult
}
const storyParts: GamGameStoryPart[] = [ storyPart,  storyPart];

const storyDef : GamGameStoryDefinitionData = {
  _id: '12A',
  title: 'Prueba',
  activityId: '24.2',
  parts: storyParts
}

const storyDefs : GamGameStoryDefinitionData[] = [storyDef, storyDef];


const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const samples: ArtworkData[] = [sample, sample];


const Template: ComponentStory<typeof StoriesList> = (args) => <StoriesList {...args} />;

export const list = Template.bind({});
list.args = {
  stories: storyDefs,
  artworks: samples
};
