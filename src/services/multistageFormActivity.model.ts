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
   * Mapping between fields to be included in the final user response JSON and form types to display
   * For instance, you could write 'name': { 'type': 'short-string', 'prompt' : 'Your name here:' }
   */
  forms: Map<string, string>;
}

export type FieldDefinition =
  | ShortTextFieldDefinition
  | LongTextFieldDefinition
  | CheckboxGroupFieldDefinition
  | CalendarFieldDefinition
  | ImageUploadFieldDefinition
  | LikertScaleFieldDefinition
  | MultipleChoiceFieldDefinition
  | RangeFieldDefinition
  | TagsFieldDefinition
  ;

export interface FieldDefinitionBase {
  promptText: string;
  required?: boolean;
  type: FieldType;
}

export const supportedFieldTypes = [
  'short-text',
  'long-text',
  'multiple-choice',
  'likert-scale',
  'checkbox',
  'range',
  'image-upload',
  'calendar',
  'tags'
] as const;

export type FieldType = typeof supportedFieldTypes[number];

export interface ShortTextFieldDefinition extends FieldDefinitionBase {
  type: 'short-text';
  placeholder?: string;
  maxLength?: number;
  isPassword?: boolean;
}

export interface LongTextFieldDefinition extends FieldDefinitionBase {
  type: 'long-text';
  placeholder?: string;
  maxLength?: number;
}

export interface CalendarFieldDefinition extends FieldDefinitionBase {
  type: 'calendar';
}

export interface CheckboxGroupFieldDefinition extends FieldDefinitionBase {
  type: 'checkbox';
  fields: string[];
}

export interface ImageUploadFieldDefinition extends FieldDefinitionBase {
  type: 'image-upload';
}

export interface LikertScaleFieldDefinition extends FieldDefinitionBase {
  type: 'likert-scale';
  questions: string[];
  scale: string[];
  showQuestionsIndex?: boolean;
}

export interface MultipleChoiceFieldDefinition extends FieldDefinitionBase {
  type: 'multiple-choice';
  answers: string[];
  maxAnswers: number;
}

export interface RangeFieldDefinition extends FieldDefinitionBase {
  type: 'range';
  min: number;
  max: number;
}

export interface TagsFieldDefinition extends FieldDefinitionBase {
  type: 'tags';
  minTags: number;
  maxTags: number;
}