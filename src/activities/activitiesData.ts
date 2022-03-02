import { sampleArtworks } from "../artworks/artworkData";
import { FindArtworkActivityDefinition } from "../services/findArtworkActivity.model";

const activityOne: FindArtworkActivityDefinition = {
  _id: '1',
  activityAuthor: 'sampleAuthor',
  activityTitle: 'activity one',
  beginsOn: new Date('2021-05-31'),
  endsOn: new Date('2021-06-31'),
  minStages: 1,
  maxStages: 2,
  minCluesPerStage: 2,
  maxCluesPerStage: 4,
  allowedInputs: ['Text'],
  huntDefinitionsDatasetUuid: 'undefined',
  artworksDatasetUuid: 'undefined',
  artworks: sampleArtworks.slice(0, 10).map(elem => elem.id),
  activityType: "Treasure Hunt"
};

export const sampleActivities: FindArtworkActivityDefinition[] = [
  activityOne
];
