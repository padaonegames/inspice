//------------------------------------------
//       GAM GAME DEFINITIONS
//------------------------------------------

export interface InProgressGamGameStoryDefinition {
  GamGameStoryAuthor: string | undefined;
  GamGameStoryTitle: string | undefined;
  activityId: string | undefined;
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

export type Emoji =
  | '🤩'
  | '🥰'
  | '😱'
  | '😴'
  | '🤢'
  | '😢'
  | '😌'
  | '🧐'
  ;

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