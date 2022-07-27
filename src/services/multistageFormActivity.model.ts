//------------------------------------------
//          ACTIVITY DEFINITIONS
//------------------------------------------
import { ActivityInstance } from "./activity.model";

export type ItemDefinition =
  | { type: "short-text"; payload: ShortTextFieldDefinition }
  | { type: "long-text"; payload: LongTextFieldDefinition }
  | { type: "multiple-choice"; payload: MultipleChoiceFieldDefinition }
  | { type: "likert-scale"; payload: LikertScaleFieldDefinition }
  | { type: "checkbox"; payload: CheckboxGroupFieldDefinition }
  | { type: "range"; payload: RangeFieldDefinition }
  | { type: "calendar"; payload: {} }
  | { type: "tags"; payload: TagsFieldDefinition }
  | { type: "display-image"; payload: DisplayImageFieldDefinition }
  | { type: "display-video"; payload: DisplayVideoFieldDefinition }
  | { type: "display-text"; payload: DisplayTextFieldDefinition }; // ItemDefinition

export const availableMultistageFormItemTypes = [
  "short-text",
  "long-text",
  "multiple-choice",
  "checkbox",
  "calendar",
  "display-image",
  "display-video",
  "display-text",
  "likert-scale",
] as const; // multistageFormItemTypes

export type AvailableMultistageFormFieldType =
  typeof availableMultistageFormItemTypes[number];

export type SupportedFormField = Extract<
  ItemDefinition,
  {
    type: AvailableMultistageFormFieldType;
  }
>; // SupportedFormField

export interface MultistageFormFieldDefinition {
  /** object describing the type and payload of the form field definition */
  fieldData: SupportedFormField;
  /** Prompt for the user to fill in this field */
  promptText: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** unique id of the form*/
  _id: string;
} // MultistageFormFieldDefinition

export interface MultistageFormActivityDefinition extends ActivityInstance {
  activityType: "Multistage Form";
  stages: MultistageFormStage[];
  formResponsesDatasetUuid: string;
} // MultistageFormActivityDefinition

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
} // MultistageFormStage

export interface EditableFieldProps<T> {
  /** Definition to be used to render the stateless editable field component (only the exclusive part of the definition, prompt text and type are edited elsewhere) */
  fieldPayload: T;
  /** Callback to notify parent component of a change whithin the current definition */
  onPayloadChanged?: (definition: T) => void;
} // EditableFieldProps<T>

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

export interface DisplayImageFieldDefinition {
  /** source of the image to display */
  src: string;
}

export interface DisplayVideoFieldDefinition {
  /** source of the video to display */
  src: string;
}

export interface DisplayTextFieldDefinition {
  /** Content of the item */
  text: string;
}
