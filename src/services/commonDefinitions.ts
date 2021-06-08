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
  stages: StageData[];
}

export interface TreasureHuntDefinition {
  treasureHuntId: string;
  treasureHuntAuthor: string;
  activityId: string;
  stages: StageData[];
}

export interface StageData {
  artworkId: string; // id del artwork seleccionado
  recordingPath: string; // path de la grabación a emplear
  clues: string[]; // pistas a mostrar al jugador
}

export interface InProgressTreasureHuntStage {
  clues: string[];
  gifts: string[];
  artworkId: string | undefined;
  recordingSrc: string | undefined;
}

export const defaultTreasureHuntStage: InProgressTreasureHuntStage = {
  clues: [""],
  gifts: [""],
  artworkId: undefined,
  recordingSrc: undefined,
};

export interface SubmitTreasureHuntDefinitionRequest {
  treasureHuntDefinition: InProgressTreasureHuntDefinition;
}

export interface GetFindTreasureHuntDefinitionByIdResponse {
  treasureHuntDefinition: TreasureHuntDefinition;
}

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
}

export type CompletedFindArtworkActivityDefinition = Omit<
  FindArtworkActivityDefinition,
  "activityId"
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
    huntPersistenceLocationPost: undefined,
    huntPersistenceLocationGet: undefined,
    artworks: [],
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
}

export type AllowedInputs = "Text" | "Audio";

export interface SubmitFindArtworkActivityDefinitionRequest {
  activityDefinition: CompletedFindArtworkActivityDefinition;
}

export interface SubmitFindArtworkActivityDefinitionResponse {
  activityDefinition: FindArtworkActivityDefinition | undefined;
}

export interface GetFindArtworkActivityDefinitionByIdResponse {
  activityDefinition: FindArtworkActivityDefinition;
}
