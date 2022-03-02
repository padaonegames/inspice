//------------------------------------------
//       GAM GAME DEFINITIONS
//------------------------------------------

import { ActivityInstance, InProgressActivityInstance } from "./activity.model";


/** Definition of a GAM Game story part, including selected artwork and user-generated multimedia data */
export interface GamGameStoryPart {
  /** Id of the selected artwork within the database */
  artworkId: string;
  /** Multimedia data associated with a given story (texts, emojis, tags) */
  multimediaData: GamGameStoryPartMutimediaData;
}

/** Definition of a GAM Game story from the perspective of the client.
 * For the time being, author identities will be kept hidden on the client side,
 * though there will still be an endpoint allowing to fetch all stories created
 * by the currently logged in user.
 */
export interface GamGameStoryDefinitionData {
  /** Id of this story within the database (needed for navigation and fetching by id) */
  _id: string;
  /** Link to image that should be displayed when browsing stories */
  imageSrc?: string;
  /** Title of the story */
  title: string;
  /** Id of the activity that this story is assigned to */
  activityId: string;
  /** List of parts containing selected artworks and multimedia data */
  parts: GamGameStoryPart[];
}

/** Data that the user will need to fill in before submitting a definition to the persistance layer.
 * Note that authorId is kept outside of this definition, since it will be added by the server from auth token.
 */
export interface InProgressGamGameStoryDefinitionData {
  /** Title of the story */
  title: string | undefined;
  /** Id of the activity that this story is assigned to */
  activityId: string | undefined;
  /** List of parts containing selected artworks and multimedia data */
  parts: GamGameStoryPart[];
  /** Link to image that should be displayed when browsing stories */
  imageSrc?: string;
}

/** Multimedia data associated with a given story (texts, emojis, tags) */
export interface GamGameStoryPartMutimediaData {
  /** What template is being used for the associated text. This is the part that the user cannot modify directly,
   * instead needing to select a fixed text as a start for their answers */
  textTemplate: string;
  /** Text written by the user about the artwork */
  text: string;
  /** List of emojis that the user has placed on top of the artwork (+ positions) */
  emojis: StoryPartEmoji[];
  /** List of tags that the user has placed on top of the artwork (+ positions) */
  tags: StoryPartTag[];
}

/** Basic interface for any element that can be placed on top on an artwork */
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

//------------------------------------------
//         ACTIVITY DEFINITIONS
//------------------------------------------

export interface InProgressGamGameActivityDefinition extends InProgressActivityInstance {
  activityType: 'GAM Game';
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