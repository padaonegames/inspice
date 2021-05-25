//------------------------------------------
//         GENERAL DEFINITIONS
//------------------------------------------

export interface ArtworkData {
  src: string; // path de la imagen a usar
  id: string; // id único que identifique a la obra
  title: string; // título de la obra
  title_en?: string; // título en inglés
  author: string; // autor de la obra
  date: string; // año o época en la que se creó
  location: string; // museo y sala donde se encuentra la obra
  info: string; // cualquier otro tipo de info adicional
}

export interface GetArtworkByIdResponse {
  artwork?: ArtworkData;
};

//------------------------------------------
//       TREASURE HUNT DEFINITIONS
//------------------------------------------

export interface InProgressTreasureHuntDefinition {
  // TODO: fill in with fields from specification schema
  // except for unique id (which is generated on the backend)
  // and all of them possibly undefined.
};

export interface TreasureHuntDefinition {
  // TODO: fill in with fields from specification schema
};

export interface StageData {
  artworkId: string; // id del artwork seleccionado
  recordingPath: string; // path de la grabación a emplear
  clues: string[]; // pistas a mostrar al jugador
};

export interface InProgressTreasureHuntStage {
  clues: string[];
  artworkId: string | undefined;
  recordingSrc: string | undefined;
};

export const defaultTreasureHuntStage: InProgressTreasureHuntStage = {
  clues: [''],
  artworkId: undefined,
  recordingSrc: undefined
};

export interface SubmitTreasureHuntDefinitionRequest {
  treasureHuntDefinition: InProgressTreasureHuntDefinition;
};

export interface GetFindTreasureHuntDefinitionByIdResponse {
  treasureHuntDefinition: TreasureHuntDefinition;
};

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
  huntPersistenceLocationPost: string | undefined;
  huntPersistenceLocationGet: string | undefined;
  artworks: string[];
};

export const defaultFindArtworkActivityDefinition: InProgressFindArtworkActivityDefinition = {
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minStages: undefined,
  maxStages: undefined,
  minCluesPerStage: undefined,
  maxCluesPerStage: undefined,
  allowedInputs: [],
  huntPersistenceLocationPost: undefined,
  huntPersistenceLocationGet: undefined,
  artworks: []
};

export interface FindArtworkActivityDefinition {
  activityId: string;
  activityTitle: string;
  activityAuthor: string;
  beginsOn: Date;
  endsOn: Date;
  minStages: number;
  maxStages: number;
  minCluesPerStage: number;
  maxCluesPerStage: number;
  allowedInputs: AllowedInputs[];
  huntPersistenceLocationPost: string;
  huntPersistenceLocationGet: string;
  artworks: string[];
};

export type AllowedInputs =
  | 'Text'
  | 'Audio'
  ;

export interface SubmitFindArtworkActivityDefinitionRequest {
  activityDefinition: InProgressFindArtworkActivityDefinition;
};

export interface GetFindArtworkActivityDefinitionByIdResponse {
  activityDefinition: FindArtworkActivityDefinition;
};