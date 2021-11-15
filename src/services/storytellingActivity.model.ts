//------------------------------------------
//            STORY DEFINITIONS
//------------------------------------------

export interface InProgressStoryDefinition {
  storyAuthor: string | undefined;
  storyTitle: string | undefined;
  activityId: string | undefined;
  stages: InProgressStoryStage[];
}

export interface StoryDefinition {
  _id: string;
  storyAuthor: string;
  storyTitle?: string;
  activityId: string;
  stages: StageData[];
}

export type CompletedStoryDefinition = Omit<
  StoryDefinition,
  "_id"
>;

export interface StageData {
  artworkId: string; // id del artwork seleccionado
  //recordingPath: string; // path de la grabación a emplear
  clues: string[]; // pistas a mostrar al jugador
  multimediaData: StoryMutimediaData[]; //rewards to show after finding the art
}

export type StoryMutimediaData =
  | { kind: 'Text', text: string }
  | { kind: 'Audio', src: string }
  | { kind: 'Image', src: string }
  ;

export interface InProgressStoryStage {
  clues: string[];
  multimediaData: StoryMutimediaData[];
  artworkId: string | undefined;
}

export const defaultStoryStage: InProgressStoryStage = {
  clues: [""],
  multimediaData: [],
  artworkId: undefined,
};

export interface SubmitStoryDefinitionRequest {
  storyDefinition: InProgressStoryDefinition;
}

export type SubmitStoryDefinitionResponse = StoryDefinition;

export type GetStoryDefinitionByIdResponse = StoryDefinition[];

//------------------------------------------
//         ACTIVITY DEFINITIONS
//------------------------------------------

export interface InProgressStorytellingActivityDefinition {
  activityTitle: string | undefined;
  activityAuthor: string | undefined;
  beginsOn: Date | undefined;
  endsOn: Date | undefined;
  minStages: number | undefined;
  maxStages: number | undefined;
  minCluesPerStage: number | undefined;
  maxCluesPerStage: number | undefined;
  allowedInputs: AllowedInputs[];
  storyDefinitionsDatasetUuid: string | undefined;
  activityDefinitionsDatasetUuid: string | undefined;
  artworksDatasetUuid: string | undefined;
  artworks: string[];
}

export type CompletedStorytellingActivityDefinition = Omit<
  StorytellingActivityDefinition,
  "_id"
>;

export const defaultStorytellingActivityDefinition: InProgressStorytellingActivityDefinition =
{
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minStages: undefined,
  maxStages: undefined,
  minCluesPerStage: undefined,
  maxCluesPerStage: undefined,
  allowedInputs: [],
  storyDefinitionsDatasetUuid: undefined,
  activityDefinitionsDatasetUuid: undefined,
  artworksDatasetUuid: undefined,
  artworks: [],
};

export interface StorytellingActivityDefinition {
  _id: string;
  activityTitle: string;
  activityAuthor: string;
  beginsOn: Date;
  endsOn: Date;
  minStages: number;
  maxStages: number;
  minCluesPerStage: number;
  maxCluesPerStage: number;
  allowedInputs: AllowedInputs[];
  huntDefinitionsDatasetUuid: string;
  activityDefinitionsDatasetUuid: string;
  artworksDatasetUuid: string;
  artworks: string[];
}

export type AllowedInputs = 'Text' | 'Audio' | 'Image';

export type SubmitStorytellingActivityDefinitionResponse = StorytellingActivityDefinition;

export type GetStorytellingActivityDefinitionByIdResponse = StorytellingActivityDefinition[];