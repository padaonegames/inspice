import { sampleArtworks } from "../artworks/artworkData";
import { FindArtworkActivityDefinition } from "../services/commonDefinitions";

const activityOne: FindArtworkActivityDefinition = {
  activityId: '1',
  activityAuthor: 'sampleAuthor',
  activityTitle: 'activity one',
  beginsOn: new Date('2021-05-31'),
  endsOn: new Date('2021-06-31'),
  minStages: 1,
  maxStages: 2,
  minCluesPerStage: 2,
  maxCluesPerStage: 4,
  allowedInputs: ['Text'],
  huntPersistenceLocation: 'fakeApi/treasure-hunt',
  artworks: sampleArtworks.slice(0, 10).map(elem => elem.id)
};

export const sampleActivities: FindArtworkActivityDefinition[] = [
  activityOne
];
