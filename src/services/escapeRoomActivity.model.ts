import { ActivityInstance, InProgressActivityInstance } from "./activity.model";

// ---------------------------------------------------------------
//           ITEM DEFINITIONS (STAGES + PUZZLES)
// ---------------------------------------------------------------

export type ItemDefinition = (
  | { type: 'room', payload: RoomDefinition }
  | { type: 'multiple-choice', payload: MultipleChoiceItemDefinition }
  | { type: 'qr-scan', payload: QrScanItemDefinition }
  | { type: 'ar-scan', payload: ArScanItemDefinition }
  | { type: 'waiting-code', payload: WaitingCodeDefinition }
); // ItemDefinition

export const escapeRoomStageTypes = [
  'room',
  'multiple-choice',
  'waiting-code',
  'qr-scan',
  'ar-scan'
] as const; // escapeRoomStageTypes

export type AvailableEscapeRoomStageType = typeof escapeRoomStageTypes[number];

export type SupportedStage =
  Extract<ItemDefinition, {
    type: AvailableEscapeRoomStageType
  }>; // SupportedStage

export const escapeRoomPuzzleTypes = [
  'multiple-choice',
  // 'waiting-code'
  // 'qr-scan'
] as const; // escapeRoomPuzzleTypes

export type AvailableEscapeRoomPuzzleType = typeof escapeRoomPuzzleTypes[number];

export type SupportedPuzzle =
  Extract<ItemDefinition, {
    type: AvailableEscapeRoomPuzzleType
  }>; // SupportedPuzzle

/** Default puzzle definition */
export const default_puzzle: SupportedPuzzle = {
  type: 'multiple-choice',
  payload: {
    prompt: '',
    answers: []
  }
}; // default_puzzle

// ---------------------------------------------------------------
//                    ACTIVITY DEFINITIONS
// ---------------------------------------------------------------

export interface EscapeRoomActivityDefinition extends ActivityInstance {
  activityType: 'Escape Room',
  stages: SupportedStage[];
}

export interface InProgressEscapeRoomActivityDefinition extends InProgressActivityInstance {
  activityType: 'Escape Room';
  stages: SupportedStage[];
} // InProgressEscapeRoomActivityDefinition

export type CompletedEscapeRoomActivityDefinition = Omit<
  EscapeRoomActivityDefinition,
  "_id"
>;

export const defaultEscapeRoomActivityDefinition: InProgressEscapeRoomActivityDefinition =
{
  activityType: 'Escape Room',
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  stages: []
};

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
    blockName: 'Solve Room',
    blockDescription: '',
    puzzles: []
  }
}; // default_room

export interface RoomBlock {
  /**display name for a room block (name that will be rendered when choosing what block to play next by the user) */
  blockName: string;
  /** description that will be shown to the user before actually playing the block itself (with contents of the block and general hints) */
  blockDescription: string;
  /** Sequence of (ordered) puzzles and items to be displayed after selecting this room block */
  puzzles: SupportedPuzzle[];
}

/** Default definition for a Room Block */
export const default_room_block: RoomBlock = {
  blockName: '',
  blockDescription: '',
  puzzles: [default_puzzle, default_puzzle]
}; // default_room_block

// ---------------------------------------------------------------
//                            UTILS
// ---------------------------------------------------------------

export interface EditableItemProps<T> {
  /** Definition to be used to render the stateless editable item component (only the exclusive part of the definition, prompt text and type are edited elsewhere) */
  payload: T;
  /** Callback to notify parent component of a change whithin the current definition */
  onPayloadChanged?: (definition: T) => void;
}

// ---------------------------------------------------------------
//                    ITEM DEFINITIONS
// ---------------------------------------------------------------

export interface MultipleChoiceItemDefinition {
  /** Prompt that this item displays answers for */
  prompt: string;
  /** answers to choose from */
  answers: string[];
  /** maximum number of answers to allow */
  maxAnswers?: number;
} // MultipleChoiceItemDefinition

export interface QrScanItemDefinition {
  encodedText: string;
} // QrScanItemDefinition

export interface ArScanItemDefinition {
  imageSrc: string;
} // ArScanItemDefinition

export interface WaitingCodeDefinition  {
  /** Password to enter in order to continue in the game */
  code: string;
  /** hints shown before requesting the password */
  texts: string[];
  /** maximum number of texts to show */
  maxTexts?: number;
}