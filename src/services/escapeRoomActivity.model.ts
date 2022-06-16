//------------------------------------------
//          ACTIVITY DEFINITIONS
//------------------------------------------
import { ActivityInstance, InProgressActivityInstance } from "./activity.model";

export interface InProgressEscapeRoomActivityDefinition extends InProgressActivityInstance {
  activityType: 'Escape Room';
  stages: EscapeRoomStage[];
}

export type EscapeRoomStage = (
  | { type: 'room', payload: RoomDefinition }
  | { type: 'multiple-choice', payload: MultipleChoiceFieldDefinition }
);

export const escapeRoomStageTypes = [
  'room',
  'multiple-choice'
] as const;

export type AvailableEscapeRoomStage = typeof escapeRoomStageTypes[number];

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

export interface RoomDefinition {
  /** Code that the user must input to successfully exit the room */
  exitCode: string;
  /** list of hints and clues that will be shown to the user throughout the puzzles */
  hints: string[];
  /** Set of puzzles contained within the room that may be solved in any order */
  puzzles: EscapeRoomPuzzleDefinition[];
}

export type RoomPuzzleEntryPoint =
  | { type: 'qr-scan', text: string }
  | { type: 'ar-scan', image: string };

export interface RoomPuzzle {
  /** How to access this puzzle within the room (QR code, AR scan, etc) */
  entryPoint: RoomPuzzleEntryPoint;
  /** Prompt for the user to know what to do in this puzzle */
  promptText?: string;
  /** Type of the field ('multiple-choice', 'find-differences' and so on) */
  type: string;
  /** payload or data needed to render the puzzle */
  payload: any;
}

export type EscapeRoomPuzzleDefinition = RoomPuzzle &
  (
    | { type: 'multiple-choice', payload: MultipleChoiceFieldDefinition }
  );

export interface EscapeRoomActivityDefinition extends ActivityInstance {
  activityType: 'Escape Room',
  stages: EscapeRoomStage[];
}

export interface EditableItemProps<T> {
  /** Definition to be used to render the stateless editable item component (only the exclusive part of the definition, prompt text and type are edited elsewhere) */
  payload: T;
  /** Callback to notify parent component of a change whithin the current definition */
  onPayloadChanged?: (definition: T) => void;
}

export interface MultipleChoiceFieldDefinition {
  /** answers to choose from */
  answers: string[];
  /** maximum number of answers to allow */
  maxAnswers?: number;
}