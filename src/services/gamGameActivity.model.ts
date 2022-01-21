//------------------------------------------
//       GAM GAME DEFINITIONS
//------------------------------------------

import { ActivityInstance } from "./activity.model";

export interface InProgressGamGameStoryDefinition {
  GamGameStoryAuthor: string | undefined;
  GamGameStoryTitle: string | undefined;
  activityId: string | undefined;
  artworkId: string | undefined;
  multimediaData: GamGameStoryMutimediaData | undefined;
}

export interface GamGameStoryDefinition {
  _id: string;
  GamGameStoryAuthor: string;
  GamGameStoryTitle: string;
  activityId: string;
  artworkId: string;
  multimediaData: GamGameStoryMutimediaData;
}

export type CompletedGamGameStoryDefinition = Omit<
  GamGameStoryDefinition,
  "_id"
>;

export interface GamGameStoryMutimediaData { 
  text?: string;
  emojis?: StoryEmoji[];
  tags?: StoryTag[];
}

export interface StoryOverlayElement {
  locationX: number; // in [0, 1]
  locationY: number; // in [0, 1]
}

export interface StoryTag extends StoryOverlayElement {
  tag: string;
}

export interface StoryEmoji extends StoryOverlayElement {
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