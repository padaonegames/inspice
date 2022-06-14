import IntegerRangeSlider from "../IntegerRangeSlider";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  InputText,
  RequiredQuestionSpan,
  RequiredAlertIcon
} from "./cardStyles";




export interface RangeInputCardProps {
  /** Main text rendered on top of the component as a prompt for the user, indicating what is the range that they have to choose. */
  promptText: string;
  /** Minimum value, is the start point of the range. */
  min: number;
  /** Maximum value possible, is the end point of the range. */
  max: number;
  /** Initial value for the range. */
  initialMin?: number;
  /** Initial maximum value for the range. */
  initialMax?: number;
  /** Callback to use when the minimum value is changed. */
  onMinValueChange?: (value: number) => void;
  /** Callback to use when the maximum value is changed. */
  onMaxValueChange?: (value: number) => void;
  /** If this field is considered required within the overall form (used to display an asterisk). */
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}

export const RangeInputCard = (props: RangeInputCardProps): JSX.Element => {

  const {
    promptText,
    min,
    max,
    initialMin = 1,
    initialMax = 5,
    onMaxValueChange,
    onMinValueChange,
    requiredAlert,
    required,
  } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <IntegerRangeSlider
          min={min}
          max={max}
          initialMin={initialMin}
          initialMax={initialMax}
          onMinValueChange={onMinValueChange}
          onMaxValueChange={onMaxValueChange} />
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default RangeInputCard;