// ---------------------------------------------------------------
//           ITEM DEFINITIONS (STAGES + PUZZLES)
// ---------------------------------------------------------------

export type ItemDefinition =
  | { type: "room"; payload: RoomDefinition }
  | { type: "multiple-choice"; payload: MultipleChoiceItemDefinition }
  | { type: "qr-scan"; payload: QrScanItemDefinition }
  | { type: "ar-scan"; payload: ArScanItemDefinition }
  | { type: "ar-overlay"; payload: ArOverlayItemDefinition }
  | { type: "waiting-code"; payload: WaitingCodeDefinition }
  | { type: "load-scene"; payload: LoadSceneDefinition }
  | { type: "narrative"; payload: NarrativeItemDefinition }
  | { type: "session-code"; payload: SessionCodeDefinition }
  | { type: "unlock-password"; payload: UnlockPasswordItemDefinition }; // ItemDefinition

export const escapeRoomStageTypes = [
  "room",
  "multiple-choice",
  "waiting-code",
  "qr-scan",
  "ar-scan",
  "ar-overlay",
  "load-scene",
  "narrative",
  "unlock-password",
  "session-code",
] as const; // escapeRoomStageTypes

export type AvailableEscapeRoomStageType = typeof escapeRoomStageTypes[number];

export type SupportedStage = Extract<
  ItemDefinition,
  {
    type: AvailableEscapeRoomStageType;
  }
>; // SupportedStage

export const escapeRoomPuzzleTypes = [
  "multiple-choice",
  "waiting-code",
  "qr-scan",
  "ar-scan",
  "load-scene",
  "narrative",
  "unlock-password",
  "ar-overlay",
] as const; // escapeRoomPuzzleTypes

export type AvailableEscapeRoomPuzzleType =
  typeof escapeRoomPuzzleTypes[number];

export type SupportedPuzzle = Extract<
  ItemDefinition,
  {
    type: AvailableEscapeRoomPuzzleType;
  }
>; // SupportedPuzzle

/** Default puzzle definition */
export const default_puzzle: SupportedPuzzle = {
  type: "multiple-choice",
  payload: {
    prompt: "",
    correctAnswers: [],
    answers: [],
  },
}; // default_puzzle

// ---------------------------------------------------------------
//                    ACTIVITY DEFINITIONS
// ---------------------------------------------------------------

export interface EscapeRoomActivityDefinition {
  stages: SupportedStage[];
  activityTitle: string;
  authorUsername: string;
  authorId: string;
  characters: CharacterDefinition[];
  _id: string;
} // EscapeRoomActivityDefinition

export const defaultEscapeRoomActivityDefinition: EscapeRoomActivityDefinition =
  {
    _id: "",
    activityTitle: "",
    authorUsername: "",
    authorId: "",
    characters: [],
    stages: [],
  }; // defaultEscapeRoomActivityDefinition

export interface CharacterDefinition {
  name: string;
  description: string;
  imageSrc: string;
} // CharacterDefinition

export interface CharacterDefinitionsResponseDefinition {
  characters: CharacterDefinition[];
} // CharacterDefinitionsFieldDefinition

export const default_character: CharacterDefinition = {
  name: "",
  description: "",
  imageSrc: "",
}; // default_character

export interface ImageSelectionResponseDefinition {
  imageSrc: string;
} // ImageSelectionResponseDefinition

// ---------------------------------------------------------------
//                    ROOM  DEFINITIONS
// ---------------------------------------------------------------

export interface RoomDefinition {
  /** list of hints and clues that will be shown to the user throughout the puzzles */
  hints: string[];
  /** Set of blocks of puzzles contained within the room that may be triggered in any order */
  blocks: RoomBlock[];
  /** Block whose completion will lead to an advancement in the adventure */
  exitBlock: RoomBlock;
  /** maximum time (in minutes) that will be allocated to complete the current room's searches and puzzles */
  availableTime: number;
}

export const default_room: RoomDefinition = {
  hints: [],
  blocks: [],
  availableTime: 20,
  exitBlock: {
    blockName: "Solve Room",
    blockDescription: "",
    puzzles: [],
  },
}; // default_room

export interface RoomBlock {
  /**display name for a room block (name that will be rendered when choosing what block to play next by the user) */
  blockName: string;
  /** description that will be shown to the user before actually playing the block itself (with contents of the block and general hints) */
  blockDescription: string;
  /** Sequence of (ordered) puzzles and items to be displayed after selecting this room block */
  puzzles: SupportedPuzzle[];
} // RoomBlock

/** Default definition for a Room Block */
export const default_room_block: RoomBlock = {
  blockName: "Default Name",
  blockDescription: "Default Description",
  puzzles: [default_puzzle],
}; // default_room_block

// ---------------------------------------------------------------
//                            UTILS
// ---------------------------------------------------------------

export interface EditableItemProps<T> {
  /** Definition to be used to render the stateless editable item component (only the exclusive part of the definition, prompt text and type are edited elsewhere) */
  payload: T;
  /** Callback to notify parent component of a change whithin the current definition */
  onPayloadChanged?: (definition: T) => void;
} // EditableItemProps

// ---------------------------------------------------------------
//                    ITEM DEFINITIONS
// ---------------------------------------------------------------

export interface MultipleChoiceItemDefinition {
  /** Prompt that this item displays answers for */
  prompt: string;
  /** answers to choose from */
  answers: string[];
  /** indices of the answers that are considered correct */
  correctAnswers: number[];
  /** minimum number of answers to allow */
  minAnswers?: number;
  /** maximum number of answers to allow */
  maxAnswers?: number;
  /** whether to enable one-click response for this question */
  oneClickResponse?: boolean;
} // MultipleChoiceItemDefinition

export interface QrScanItemDefinition {
  encodedText: string;
} // QrScanItemDefinition

export interface ArScanItemDefinition {
  imageSrc: string;
  trackableSize: number;
} // ArScanItemDefinition

export interface ArOverlayItemDefinition {
  imageSrc: string;
  trackableSize: number;
  overlayImageSrc: string;
} // ArOverlayItemDefinition

export interface WaitingCodeDefinition {
  /** Valid passwords to enter in order to continue in the game */
  codes: string[];
  /** text shown before requesting the password */
  text: string;
  /** maximum number of texts to show */
  maxTexts?: number;
  /** whether the keys from codes are case-sensitive, defaults to false */
  caseSensitive?: boolean;
} // WaitingCodeDefinition

export interface EscapeRoomActivitySession {
  /** Unique identifier for this session within the activity */
  sessionName: string;
  /** available usernames that are able to access the session */
  availableUsernames: string[];
} // EscapeRoomActivitySession

export interface SessionCodeDefinition {
  /** Supported session definitions */
  sessions: EscapeRoomActivitySession[];
  /** text shown before requesting the code */
  text: string;
  /** whether the keys from codes are case-sensitive, defaults to false */
  caseSensitive?: boolean;
} // SessionCodeDefinition

export interface LoadSceneDefinition {
  /** Name of the scene that is going to be loaded */
  sceneName: string;
} // LoadSceneDefinition

export interface UnlockPasswordItemDefinition {
  /** Password that needs to be solved to exit a room */
  password: number[];
  /** Description to help give context to solve the password */
  description: string;
} // UnlockPasswordItemDefinition

export interface Dialogue {
  text: string;
  characterName?: string;
} // Dialogue

export interface NarrativeItemDefinition {
  dialogues: Dialogue[];
} // NarrativeItemDefinition

// ---------------------------------------------------------------
//                         RESOURCES
// ---------------------------------------------------------------

export interface ResourceDefinition {
  name: string;
  src: string;
} // ResourceDefinition
