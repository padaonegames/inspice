import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  CardChildrenContainer,
} from "./cardStyles";

export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must type into the field */
  promptText?: string;
  /** whether this field is considered required within the overall form (used to display an asterisk) */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
  /** alert message to be displayed when required alert is set to true */
  alertMessage?: string;
  /** True if field response is invalid*/
  invalidAlert?: boolean;
  /** Message to display if invalidAlert is set to true */
  invalidMessage?: string;
  /** whether to add padding to this card */
  addPadding?: boolean;
  /** whether to add a focus effect to the side of the card when being interacted with */
  addFocusEffect?: boolean;
  /** whether this card should be a visible container or just provide layout */
  showCardBackground?: boolean;
  /** layout for the card children */
  childrenLayout?: "column" | "row";
  /** what to render within this card */
  children?: React.ReactNode;
}

export const FormCard = (props: FormCardProps): JSX.Element => {
  const {
    promptText,
    requiredAlert,
    required,
    alertMessage,
    invalidAlert,
    invalidMessage,
    addPadding,
    addFocusEffect,
    showCardBackground = true,
    childrenLayout = "column",
    children,
  } = props;

  return (
    <Root {...props}>
      <CardPanel
        showCardBackground={showCardBackground}
        requiredAlert={requiredAlert || invalidAlert}
        addFocusEffect={addFocusEffect}
        addPadding={addPadding}
      >
        {promptText !== undefined && (
          <PromptText>
            {promptText}
            {required && <RequiredAsterisk> *</RequiredAsterisk>}
          </PromptText>
        )}
        <CardChildrenContainer layout={childrenLayout}>
          {children}
        </CardChildrenContainer>
        {requiredAlert ||
          (invalidAlert && (
            <RequiredQuestionSpan>
              <RequiredAlertIcon />{" "}
              {requiredAlert
                ? alertMessage ?? "This item is required."
                : invalidMessage ?? "Please provide a valid response."}
            </RequiredQuestionSpan>
          ))}
      </CardPanel>
    </Root>
  );
};

export default FormCard;
