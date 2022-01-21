//------------------------------------------
//       TREASURE HUNT DEFINITIONS
//------------------------------------------

import { ActivityInstance } from "./activity.model";

export interface InProgressTreasureHuntDefinition {
  treasureHuntAuthor: string | undefined;
  treasureHuntTitle: string | undefined;
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
  activityType: 'Treasure Hunt';
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
  artworksDatasetUuid: string | undefined;
  artworks: string[];
}

export type CompletedFindArtworkActivityDefinition = Omit<
  FindArtworkActivityDefinition,
  "_id"
>;

export const defaultFindArtworkActivityDefinition: InProgressFindArtworkActivityDefinition =
{
  activityType: 'Treasure Hunt',
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
  artworksDatasetUuid: undefined,
  artworks: [],
};

export interface FindArtworkActivityDefinition extends ActivityInstance {
  activityType: 'Treasure Hunt';
  minStages: number;
  maxStages: number;
  minCluesPerStage: number;
  maxCluesPerStage: number;
  allowedInputs: AllowedInputs[];
  huntDefinitionsDatasetUuid: string;
  artworksDatasetUuid: string;
  artworks: string[];
}

export type AllowedInputs = 'Text' | 'Audio' | 'Image';

export type SubmitFindArtworkActivityDefinitionResponse = FindArtworkActivityDefinition;

export type GetFindArtworkActivityDefinitionByIdResponse = FindArtworkActivityDefinition[];