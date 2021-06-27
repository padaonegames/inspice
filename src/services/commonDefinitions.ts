//------------------------------------------
//         GENERAL DEFINITIONS
//------------------------------------------

export interface ArtworkData {
  src: string; // path de la imagen a usar
  id: string; // id único que identifique a la obra
  title: string; // título de la obra
  author: string; // autor de la obra
  date: string; // año o época en la que se creó
  location: string; // museo y sala donde se encuentra la obra
  info: string; // cualquier otro tipo de info adicional
}

export type ArtworkFieldMapping = Record<keyof ArtworkData, string>;

export interface GetArtworkByIdResponse {
  artwork?: ArtworkData;
}

//------------------------------------------
//       TREASURE HUNT DEFINITIONS
//------------------------------------------

export interface InProgressTreasureHuntDefinition {
  treasureHuntAuthor: string | undefined;
  activityId: string | undefined;
  stages: InProgressTreasureHuntStage[];
}

export interface TreasureHuntDefinition {
  _id: string;
  treasureHuntAuthor: string;
  treasureHuntTitle?: string;
  activityId: string;
  stages: StageData[];
}

export type CompletedTreasureHuntDefinition = Omit<
  TreasureHuntDefinition,
  "_id"
>;

export interface StageData {
  artworkId: string; // id del artwork seleccionado
  //recordingPath: string; // path de la grabación a emplear
  clues: string[]; // pistas a mostrar al jugador
  multimediaData: TreasureHuntMutimediaData[]; //rewards to show after finding the art
}

export type TreasureHuntMutimediaData =
  | { kind: 'Text', text: string }
  | { kind: 'Audio', src: string }
  | { kind: 'Image', src: string }
  ;

export interface InProgressTreasureHuntStage {
  clues: string[];
  multimediaData: TreasureHuntMutimediaData[];
  artworkId: string | undefined;
}

export const defaultTreasureHuntStage: InProgressTreasureHuntStage = {
  clues: [""],
  multimediaData: [],
  artworkId: undefined,
};

export interface SubmitTreasureHuntDefinitionRequest {
  treasureHuntDefinition: InProgressTreasureHuntDefinition;
}

export type SubmitTreasureHuntDefinitionResponse = TreasureHuntDefinition;

export type GetTreasureHuntDefinitionByIdResponse = TreasureHuntDefinition[];

//------------------------------------------
//         ACTIVITY DEFINITIONS
//------------------------------------------

export interface InProgressFindArtworkActivityDefinition {
  activityTitle: string | undefined;
  activityAuthor: string | undefined;
  beginsOn: Date | undefined;
  endsOn: Date | undefined;
  minStages: number | undefined;
  maxStages: number | undefined;
  minCluesPerStage: number | undefined;
  maxCluesPerStage: number | undefined;
  allowedInputs: AllowedInputs[];
  huntDefinitionsDatasetUuid: string | undefined;
  activityDefinitionsDatasetUuid: string | undefined;
  artworksDatasetUuid: string | undefined;
  artworks: string[];
}

export type CompletedFindArtworkActivityDefinition = Omit<
  FindArtworkActivityDefinition,
  "_id"
>;

export const defaultFindArtworkActivityDefinition: InProgressFindArtworkActivityDefinition =
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
  huntDefinitionsDatasetUuid: undefined,
  activityDefinitionsDatasetUuid: undefined,
  artworksDatasetUuid: undefined,
  artworks: [],
};

export interface FindArtworkActivityDefinition {
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

export type SubmitFindArtworkActivityDefinitionResponse = FindArtworkActivityDefinition;

export type GetFindArtworkActivityDefinitionByIdResponse = FindArtworkActivityDefinition[];