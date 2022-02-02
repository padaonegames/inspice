//------------------------------------------
//       GAM GAME DEFINITIONS
//------------------------------------------

import { ActivityInstance } from "./activity.model";

export interface InProgressGamGameStoryDefinition {
  author: string | undefined;
  title: string | undefined;
  activityId: string | undefined;
  parts: GamGameStoryPart[];
  imageSrc: string | undefined;
}

export interface GamGameStoryPart {
  artworkId: string;
  multimediaData: GamGameStoryPartMutimediaData;
}

export interface InProgressGamGameStoryPart {
  artworkId: string;
  multimediaData: InProgressGamGameStoryPartMutimediaData;
};

export interface GamGameStoryDefinition {
  _id: string;
  imageSrc?: string;
  author: string;
  title: string;
  activityId: string;
  parts: GamGameStoryPart[];
}

export type CompletedGamGameStoryDefinition = Omit<
  GamGameStoryDefinition,
  "_id"
>;

export interface GamGameStoryPartMutimediaData {
  textTemplate: string;
  text: string;
  emojis: StoryPartEmoji[];
  tags: StoryPartTag[];
}

export type InProgressGamGameStoryPartMutimediaData = Partial<GamGameStoryPartMutimediaData>;

export interface StoryPartOverlayElement {
  locationX: number; // in [0, 1]
  locationY: number; // in [0, 1]
}

export interface StoryPartTag extends StoryPartOverlayElement {
  tag: string;
}

export interface StoryPartEmoji extends StoryPartOverlayElement {
  emoji: Emoji;
}

export const availableEmoji = [
  '🤩',
  '🥰',
  '😱',
  '😴',
  '🤢',
  '😢',
  '😌',
  '🧐'
] as const;

export type Emoji = typeof availableEmoji[number];

export interface SubmitGamGameStoryDefinitionRequest {
  GamGameStoryDefinition: InProgressGamGameStoryDefinition;
}

export type SubmitGamGameStoryDefinitionResponse = GamGameStoryDefinition;

export type GetGamGameStoryDefinitionByIdResponse = GamGameStoryDefinition[];

//------------------------------------------
//         ACTIVITY DEFINITIONS
//------------------------------------------

export interface InProgressGamGameActivityDefinition {
  activityType: 'GAM Game';
  activityTitle: string | undefined;
  activityAuthor: string | undefined;
  beginsOn: Date | undefined;
  endsOn: Date | undefined;
  minArtworks: number | undefined;
  maxArtworks: number | undefined;
  allowedResponseTypes: AllowedResponseType[];
  storyDefinitionsDatasetUuid: string | undefined;
  artworksDatasetUuid: string | undefined;
  artworks: string[];
}

export type CompletedGamGameActivityDefinition = Omit<
  GamGameActivityDefinition,
  "_id"
>;

export const defaultGamGameActivityDefinition: InProgressGamGameActivityDefinition =
{
  activityType: 'GAM Game',
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  minArtworks: undefined,
  maxArtworks: undefined,
  allowedResponseTypes: [],
  storyDefinitionsDatasetUuid: undefined,
  artworksDatasetUuid: undefined,
  artworks: [],
};

export interface GamGameActivityDefinition extends ActivityInstance {
  activityType: 'GAM Game',
  minArtworks: number;
  maxArtworks: number;
  allowedResponseTypes: AllowedResponseType[];
  storyDefinitionsDatasetUuid: string;
  artworksDatasetUuid: string;
  artworks: string[];
}

export type AllowedResponseType = 'Tags' | 'Emojis' | 'Image' | 'Text';

export type SubmitGamGameActivityDefinitionResponse = GamGameActivityDefinition;

export type GetGamGameActivityDefinitionByIdResponse = GamGameActivityDefinition[];