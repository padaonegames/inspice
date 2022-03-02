import CheckBoxInput from "../CheckBoxInput";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  CheckboxList,
  CheckboxOption
} from "./cardStyles";

export interface CheckBoxGroupInputCardProps {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must check in the field */
  promptText: string;
  onFieldToggle?: (field: string) => void;
  checked?: string[];
  fields: string[];
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
}

export const CheckBoxGroupInputCard = (props: CheckBoxGroupInputCardProps): JSX.Element => {

  const {
    promptText,
    checked,
    fields,
    requiredAlert,
    required,
    onFieldToggle,
  } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <CheckboxList>
          {fields.map(elem => (
            <CheckboxOption key={elem}>
              <CheckBoxInput
                labelText={elem}
                checked={checked?.some(e => e === elem)}
                boxSize='15px'
                onCheckedChange={() => {
                  if (onFieldToggle)
                    onFieldToggle(elem);
                }}
              />
            </CheckboxOption>
          ))}
        </CheckboxList>
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default CheckBoxGroupInputCard;