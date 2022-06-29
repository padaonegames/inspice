import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import ArtworkStoriesList from '../../templates/GamGame/components/ArtworkStoriesPanel/ArtworkStoriesList';
import { ArtworkData } from '../../services/artwork.model';
import * as SampleImage from '../assets/head_of_a_girl.jpg';
import { GamGameStoryDefinitionData, GamGameStoryPart, GamGameStoryPartMutimediaData } from '../../services/gamGameActivity.model'
import { StoryPartEmoji, StoryPartTag } from "../../services/gamGameActivity.model";


export default {
  title: 'GAM Game/Artwork Stories List',
  component: ArtworkStoriesList,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ArtworkStoriesList>;

const emoji1: StoryPartEmoji = {
  emoji: '🤩',
  locationX: 0,
  locationY: 0
};

const emoji2: StoryPartEmoji = {
  emoji: '🧐',
  locationX: 10,
  locationY: 0
};

const emojis: StoryPartEmoji[] = [emoji1, emoji2];

const tag1: StoryPartTag = {
  tag: 'chachipistachi',
  locationX: 5,
  locationY: 5
}

const tag2: StoryPartTag = {
  tag: 'Olee',
  locationX: 30,
  locationY: 0
}

const tags: StoryPartTag[] = [tag1, tag2];

const storyPartMult: GamGameStoryPartMutimediaData = {
  answersToTemplates: {
    'itMakesMeFeel': 'sad',
    'itMakesMeThinkAbout': 'sadness',
    'itRemindsMeOf': 'agony'
  },
  emojis: emojis,
  tags: tags
}


const storyPart: GamGameStoryPart = {
  artworkId: 'id obra',
  multimediaData: storyPartMult
}
const storyParts: GamGameStoryPart[] = [storyPart, storyPart];

const storyDef: GamGameStoryDefinitionData = {
  _id: 'id',
  title: 'Título',
  activityId: 'id actividad',
  parts: storyParts
}

const storyDefs: GamGameStoryDefinitionData[] = [storyDef, storyDef];


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


const Template: ComponentStory<typeof ArtworkStoriesList> = (args) => <ArtworkStoriesList {...args} />;

export const list = Template.bind({});
list.args = {
  stories: storyDefs,
  artworks: samples,
  currentArtwork: sample
};
