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
  promptText: string;
  min: number;
  max: number;
  initialMin?: number;
  initialMax?: number;
  onMinValueChange?: (value: number) => void;
  onMaxValueChange?: (value: number) => void;
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