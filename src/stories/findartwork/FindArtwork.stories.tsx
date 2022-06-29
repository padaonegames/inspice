import { ComponentMeta, ComponentStory } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

import FindArtwork from '../../templates/FindArtwork/components/FindArtwork';
import { ArtworkData } from '../../services/artwork.model';
import * as SampleImage from '../assets/head_of_a_girl.jpg';
import { StageData, TreasureHuntMutimediaData } from '../../services/findArtworkActivity.model'

export default {
  title: 'Find Artwork/Find Artwork',
  component: FindArtwork,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof FindArtwork>;

const clues: string[] = ['It is a portrait', 'The author was german... But also an englishman', 'MCMLXXV']

const media: TreasureHuntMutimediaData = {
  kind: 'Image',
  src: SampleImage.default
}

const medias: TreasureHuntMutimediaData[] = [media, media]

const data: StageData = {
  artworkId: '',
  clues: clues,
  multimediaData: medias
}

const sample: ArtworkData = {
  src: SampleImage.default,
  id: '',
  title: 'Head of a girl',
  author: 'Lucian Freud',
  info: 'Oil on canvas',
  date: '1975',
  location: 'IMMA Collection: On Loan'
};

const samples: ArtworkData[] = [sample, sample]

const Template: ComponentStory<typeof FindArtwork> = (args) => <FindArtwork {...args} />;

export const search = Template.bind({});
search.args = {
  stageData: data,
  imagesData: samples,
  score: 20
};

