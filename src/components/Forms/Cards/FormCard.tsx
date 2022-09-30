import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
} from "./cardStyles";

export interface FormCardProps {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must type into the field */
  promptText: string;
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** alert message to be displayed when required alert is set to true */
  alertMessage?: string;
  /** what to render within this card */
  children?: React.ReactNode;
}

export const FormCard = (props: FormCardProps): JSX.Element => {
  const { promptText, requiredAlert, required, alertMessage, children } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}
          {required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        {children}
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> {alertMessage ?? "This item is required."}
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default FormCard;
