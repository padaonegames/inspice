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
  promptText: string;
  onFieldToggle?: (field: string) => void;
  checked?: string[];
  fields: string[];
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
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
                initialChecked={checked?.some(e => e === elem)}
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