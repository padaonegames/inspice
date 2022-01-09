//------------------------------------------
//       GAM GAME DEFINITIONS
//------------------------------------------

export interface InProgressGamGameStoryDefinition {
  GamGameStoryAuthor: string | undefined;
  GamGameStoryTitle: string | undefined;
  activityId: string | undefined;
  stages: InProgressGamGameStoryStage[];
}

export interface GamGameStoryDefinition {
  _id: string;
  GamGameStoryAuthor: string;
  GamGameStoryTitle?: string;
  activityId: string;
  stages: StageData[];
}

export type CompletedGamGameStoryDefinition = Omit<
  GamGameStoryDefinition,
  "_id"
>;

export interface StageData {
  artworkId: string; // id del artwork seleccionado
  //recordingPath: string; // path de la grabación a emplear
  clues: string[]; // pistas a mostrar al jugador
  multimediaData: GamGameStoryMutimediaData[]; //rewards to show after finding the art
}

export type GamGameStoryMutimediaData =
  | { kind: 'Text', text: string }
  | { kind: 'Audio', src: string }
  | { kind: 'Image', src: string }
  ;

export interface InProgressGamGameStoryStage {
  clues: string[];
  multimediaData: GamGameStoryMutimediaData[];
  artworkId: string | undefined;
}

export const defaultGamGameStoryStage: InProgressGamGameStoryStage = {
  clues: [""],
  multimediaData: [],
  artworkId: undefined,
};

export interface SubmitGamGameStoryDefinitionRequest {
  GamGameStoryDefinition: InProgressGamGameStoryDefinition;
}

export type SubmitGamGameStoryDefinitionResponse = GamGameStoryDefinition;

export type GetGamGameStoryDefinitionByIdResponse = GamGameStoryDefinition[];

//------------------------------------------
//         ACTIVITY DEFINITIONS
//------------------------------------------

export interface InProgressGamGameActivityDefinition {
  activityTitle: string | undefined;
  activityAuthor: string | undefined;
  beginsOn: Date | undefined;
  endsOn: Date | undefined;
  minArtworks: number | undefined;
  maxArtworks: number | undefined;
  allowedResponseTypes: AllowedResponseType[];
  storyDefinitionsDatasetUuid: string | undefined;
  activityDefinitionsDatasetUuid: string | undefined;
  artworksDatasetUuid: string | undefined;
  artworks: string[];
}

export type CompletedGamGameActivityDefinition = Omit<
  GamGameActivityDefinition,
  "_id"
>;

export const defaultGamGameActivityDefinition: InProgressGamGameActivityDefinition =
{
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minArtworks: undefined,
  maxArtworks: undefined,
  allowedResponseTypes: [],
  storyDefinitionsDatasetUuid: undefined,
  activityDefinitionsDatasetUuid: undefined,
  artworksDatasetUuid: undefined,
  artworks: [],
};

export interface GamGameActivityDefinition {
  _id: string;
  activityTitle: string;
  activityAuthor: string;
  beginsOn: Date;
  endsOn: Date;
  minArtworks: number;
  maxArtworks: number;
  allowedResponseTypes: AllowedResponseType[];
  storyDefinitionsDatasetUuid: string;
  activityDefinitionsDatasetUuid: string;
  artworksDatasetUuid: string;
  artworks: string[];
}

export type AllowedResponseType = 'Tags' | 'Emojis' | 'Image' | 'Text';

export type SubmitGamGameActivityDefinitionResponse = GamGameActivityDefinition;

export type GetGamGameActivityDefinitionByIdResponse = GamGameActivityDefinition[];