//------------------------------------------
//          ACTIVITY DEFINITIONS
//------------------------------------------
export interface MultistageFormField {
  /** object describing the type and payload of the form field definition */
  fieldData: SupportedFormField;
  /** Prompt for the user to fill in this field */
  promptText: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** unique id of the form*/
  _id: string;
} // MultistageFormFieldDefinition

export interface MultistageFormActivity {
  /** Unique id of this definition */
  _id: string;
  /** short title for this activity that will be rendered on the title card */
  title: string;
  /** Id of the author of this activity within the system */
  author: string;
  /** src of the thumbnail to be used to preview this activity */
  thumbnailSrc?: string;
  /** short description of this activity that will be rendered on the title card */
  description?: string;
  /** list of stages comprising this activity */
  stages: MultistageFormStage[];
  /** whether this activity is valid and can be deployed (no errors in the definition) */
  isValid: boolean;
} // MultistageFormActivityDefinition

/**
 * Description of a general stage for a Multistage Form activity,
 * including all the different parameters needed to render a form step.
 */
export interface MultistageFormStage {
  /** id of the stage within the persistence layer */
  _id: string;
  /** title that will appear on top of the form page */
  title?: string;
  /** General text that will appear on top of the stage to contetxualize the page */
  description?: string;
  /** whether this field must always be filled in by the user */
  required?: boolean;
  /**
   * Forms defined within this particular stage
   */
  forms: MultistageFormField[];
} // MultistageFormStage

//---------------------------------------------------------------------------------
//          GENERIC REACT COMPONENT PROPS FOR EDITING/CONSUMPTION ITEMS
//---------------------------------------------------------------------------------

export interface ConsumableFieldProps<FieldPayload, FieldResponse>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
  /** Message to display if requiredAlert is set to true */
  alertMessage?: string;
  /** True if field response is invalid*/
  invalidAlert?: boolean;
  /** Message to display if invalidAlert is set to true */
  invalidMessage?: string;
  /** Definition to be used to render the stateless consumable field component */
  fieldPayload: FieldPayload;
  /** Current response to be rendered by the component */
  response: FieldResponse;
  /** Callback to notify parent component of a change whithin the current answer to field */
  onResponseChanged?: (response: FieldResponse) => void;
  /** set to true to prevent user from inputting a response (form disabled or not) */
  disabled?: boolean;
} // ConsumableFieldProps<FieldPayload, FieldResponse>

//------------------------------------------
//            FIELD DEFINITIONS
//------------------------------------------

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
  | { type: "display-text"; payload: DisplayTextFieldDefinition }
  | { type: "highlight-text"; payload: HighlightTextFieldDefinition }; // ItemDefinition

export type ResponseDefinition =
  | { type: "short-text"; response: ShortTextResponseDefinition }
  | { type: "long-text"; response: LongTextResponseDefinition }
  | { type: "multiple-choice"; response: MultipleChoiceResponseDefinition }
  | { type: "likert-scale"; response: LikertScaleResponseDefinition }
  | { type: "checkbox"; response: CheckboxGroupResponseDefinition }
  | { type: "range"; response: RangeResponseDefinition }
  | { type: "calendar"; response: CalendarResponseDefinition }
  | { type: "tags"; response: TagsResponseDefinition }
  | { type: "display-image"; response: {} }
  | { type: "display-video"; response: {} }
  | { type: "display-text"; response: {} }
  | { type: "highlight-text"; response: HighlightTextResponseDefinition }; // ResponseDefinition

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
  "highlight-text",
] as const; // multistageFormItemTypes

export type AvailableMultistageFormFieldType =
  typeof availableMultistageFormItemTypes[number];

export type SupportedFormField = Extract<
  ItemDefinition,
  {
    type: AvailableMultistageFormFieldType;
  }
>; // SupportedFormField

export type SupportedFormResponse = Extract<
  ResponseDefinition,
  {
    type: AvailableMultistageFormFieldType;
  }
>; // SupportedFormResponse

//------------------------
//  MULTIPLE CHOICE FIELD
//------------------------
export interface MultipleChoiceFieldDefinition {
  /** answers to choose from */
  answers: string[];
  /** maximum number of answers to allow */
  maxAnswers?: number;
} // MultipleChoiceFieldDefinition

export interface MultipleChoiceResponseDefinition {
  /**
   * Responses to the multiple choice question.
   * This is an array representing the indices of all
   * selected answers within the list of possible responses.
   */
  selectedResponses: number[];
} // MultipleChoiceResponseDefinition

//-------------------
//  SHORT TEXT FIELD
//-------------------
export interface ShortTextFieldDefinition {
  placeholder?: string;
  maxLength?: number;
  isPassword?: boolean;
} // ShortTextFieldDefinition

export interface ShortTextResponseDefinition {
  text: string;
} // ShortTextResponseDefinition

//-------------------
//  NUMBER FIELD
//-------------------
export interface NumberFieldDefinition {
  placeholder?: number;
  maxLength?: number;
  isFloat?: boolean;
  units?: string;
  minValue?: number;
  maxValue?: number;
} // NumberFieldDefinition

export interface NumberResponseDefinition {
  number: number;
} // NumberResponseDefinition

//-------------------
//  LONG TEXT FIELD
//-------------------
export interface LongTextFieldDefinition {
  placeholder?: string;
  maxLength?: number;
} // LongTextFieldDefinition

export interface LongTextResponseDefinition {
  text: string;
} // LongTextResponseDefinition

//-------------------
//  DROPDOWN FIELD
//-------------------
export interface DropdownFieldDefinition {
  options: string[];
} // DropdownFieldDefinition

export interface DropdownResponseDefinition {
  selectedOption?: string;
} // DropdownResponseDefinition

//------------------------
//  CALENDAR INPUT FIELD
//------------------------
export interface CalendarResponseDefinition {
  date: Date | undefined;
} // CalendarResponseDefinition

//-----------------------
//  CHECKBOX GROUP FIELD
//-----------------------
export interface CheckboxGroupFieldDefinition {
  fields: string[];
} // CheckboxGroupFieldDefinition

export interface CheckboxGroupResponseDefinition {
  selectedFields: string[];
} // CheckboxGroupResponseDefinition

//---------------------
//  LIKERT SCALE FIELD
//---------------------
export interface LikertScaleFieldDefinition {
  questions: string[];
  scale: string[];
  showQuestionsIndex?: boolean;
} // LikertScaleFieldDefinition

export interface LikertScaleResponseDefinition {
  /**
   * Responses to the likert scale questionaire.
   * Each item in the array represents the index of the selected
   * option within the common scale of the questionaire.
   */
  responses: { [questionIndex: number]: number };
} // LikertScaleResponseDefinition

//-------------------
//    RANGE FIELD
//-------------------
export interface RangeFieldDefinition {
  min: number;
  max: number;
} // RangeFieldDefinition

export interface RangeResponseDefinition {
  /**
   * left extreme of the range as selected by the user.
   * Must be greater or equal to the min field of the
   * corresponding field definition, and lower than its max.
   */
  min: number;
  /**
   * right extreme of the range as selected by the user.
   * Must be lower or equal to the min field of the
   * corresponding field definition, and greater than its min.
   */
  max: number;
} // RangeResponseDefinition

//-------------------
//    TAGS FIELD
//-------------------
export interface TagsFieldDefinition {
  /** minimum number of tags that users will be allowed to enter */
  minTags?: number;
  /** maximum number of tags that users will be allowed to enter */
  maxTags?: number;
} // TagsFieldDefinition

export interface TagsResponseDefinition {
  /** List of tags introduced by the user (length must be within min and max Tags in field definition) */
  tags: string[];
} // TagsResponseDefinition

//-------------------------
//    DISPLAY IMAGE FIELD
//-------------------------

export const availableImageSizings = ["small", "medium", "large"] as const; // availableImageSizings

export type DisplayImageSizing = typeof availableImageSizings[number];
export interface DisplayImageFieldDefinition {
  /** source of the image to display */
  src: string;
  /** sizing of the image */
  sizing?: DisplayImageSizing;
} // DisplayImageFieldDefinition

//-------------------------
//    DISPLAY VIDEO FIELD
//-------------------------
export interface DisplayVideoFieldDefinition {
  /** source of the video to display */
  src: string;
} // DisplayVideoFieldDefinition

//-------------------------
//    DISPLAY TEXT FIELD
//-------------------------
export interface DisplayTextFieldDefinition {
  /** Content of the item */
  text: string;
} // DisplayTextFieldDefinition

//-------------------------
//    HIGHLIGHT TEXT FIELD
//-------------------------
export interface Highlighter {
  color: string;
  tag: string;
} // Highlighter

export interface HighlightTextFieldDefinition {
  highlighters: Highlighter[];
  /** Text that the user is going to highlight with the different tags avaliable */
  text: string;
} // HighlightTextFieldDefinition

export interface HighlightTextResponseDefinition {
  highlightedTexts: string[][];
} // HighlightTextResponseDefinition
