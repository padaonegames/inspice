//------------------------------------------
//          ACTIVITY DEFINITIONS
//------------------------------------------
import { ActivityInstance, InProgressActivityInstance } from "./activity.model";

export interface InProgressMultistageFormActivityDefinition extends InProgressActivityInstance {
  activityType: 'Multistage Form';
  stages: MultistageFormStage[];
  formResponsesDatasetUuid: string;
}

export type CompletedMultistageFormActivityDefinition = Omit<
  MultistageFormActivityDefinition,
  "_id"
>;

export const defaultMultistageFormActivityDefinition: InProgressMultistageFormActivityDefinition =
{
  activityType: 'Multistage Form',
  activityTitle: undefined,
  activityAuthor: undefined,
  beginsOn: undefined,
  endsOn: undefined,
  stages: [],
  formResponsesDatasetUuid: ''
};

export interface FieldDefinition {

  /** Type of the field ('short-text', 'calendar-input' and so on) */
  type: string;
  /** payload or data needed to render the field */
  payload: any;
}

export type ItemDefinition = (
  | { type: 'short-text', payload: ShortTextFieldDefinition }
  | { type: 'long-text', payload: LongTextFieldDefinition }
  | { type: 'multiple-choice', payload: MultipleChoiceFieldDefinition }
  | { type: 'likert-scale', payload: LikertScaleFieldDefinition }
  | { type: 'checkbox', payload: CheckboxGroupFieldDefinition }
  | { type: 'range', payload: RangeFieldDefinition }
  | { type: 'calendar', payload: {} }
  | { type: 'tags', payload: TagsFieldDefinition }
); // ItemDefinition

export const availableMultistageFormItemTypes = [
  'short-text',
  'long-text',
  'multiple-choice',
  'checkbox',
  'calendar',
] as const; // multistageFormItemTypes

export type AvailableMultistageFormFieldType = typeof availableMultistageFormItemTypes[number];

export type SupportedFormField =
  Extract<ItemDefinition, {
    type: AvailableMultistageFormFieldType
  }>; // SupportedFormField

export interface MultistageFormFieldDefinition {
  /** object describing the type and payload of the form field definition */
  fieldData: SupportedFormField;
  /** Prompt for the user to fill in this field */
  promptText: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
} // MultistageFormFieldDefinition

export interface MultistageFormActivityDefinition extends ActivityInstance {
  activityType: 'Multistage Form',
  stages: MultistageFormStage[];
  formResponsesDatasetUuid: string;
}

/**
 * Description of a general stage for a Multistage Form activity,
 * including all the different parameters needed to render a form step.
 */
export interface MultistageFormStage {
  /** title that will appear on top of the form page */
  title?: string;
  /** General text that will appear on top of the stage to contetxualize the page */
  description?: string;
  /** 
   * Forms defined within this particular stage
   */
  forms: MultistageFormFieldDefinition[];
}

export interface EditableFieldProps<T> {
  /** Definition to be used to render the stateless editable field component (only the exclusive part of the definition, prompt text and type are edited elsewhere) */
  fieldPayload: T;
  /** Callback to notify parent component of a change whithin the current definition */
  onPayloadChanged?: (definition: T) => void;
}

export interface ShortTextFieldDefinition {
  placeholder?: string;
  maxLength?: number;
  isPassword?: boolean;
}

export interface LongTextFieldDefinition {
  placeholder?: string;
  maxLength?: number;
}

export interface CheckboxGroupFieldDefinition {
  fields: string[];
}

export interface LikertScaleFieldDefinition {
  questions: string[];
  scale: string[];
  showQuestionsIndex?: boolean;
}

export interface MultipleChoiceFieldDefinition {
  /** answers to choose from */
  answers: string[];
  /** maximum number of answers to allow */
  maxAnswers?: number;
}

export interface RangeFieldDefinition {
  min: number;
  max: number;
}

export interface TagsFieldDefinition {
  minTags: number;
  maxTags: number;
}