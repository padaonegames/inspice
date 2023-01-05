import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import {
  ActionsContainer,
  ButtonAction,
  ButtonActionText,
  StepDescription,
  TextActionSpan,
  VerticalSeparator,
} from "../../components/generalStyles";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
`;

interface EnterUsernameStepProps {
  /** current username as established in parent component. */
  username: string;
  /** alert message to display in case there is a problem during session login. */
  alertMessage?: string;
  /** callback to notify parent of a change in the current username string. */
  onUsernameChanged?: (value: string) => void;
  /** callback to notify parent of back button being pressed to return to previous screen. */
  onBackPressed?: () => void;
  /** callback to notify parent of user wishing to trigger a check username-session pair on the server. */
  onTriggerCheckSessionRequest?: () => void;
} // EnterUsernameStepProps

export const EnterUsernameStep = (
  props: EnterUsernameStepProps
): JSX.Element => {
  const {
    username,
    alertMessage,
    onUsernameChanged,
    onBackPressed,
    onTriggerCheckSessionRequest,
  } = props;
  const { t } = useTranslation("inspice");

  const handleBackClicked = () => {
    if (onBackPressed) {
      onBackPressed();
    }
  }; // handleBackClicked

  const handleNextClicked = () => {
    if (onTriggerCheckSessionRequest) {
      onTriggerCheckSessionRequest();
    }
  }; // handleNextClicked

  const handleUsernameChanged = (value: string) => {
    if (!onUsernameChanged) return;
    onUsernameChanged(value);
  }; // handleUsernameChanged

  return (
    <Root>
      <StepDescription>{t("welcome")}</StepDescription>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText={`${t("enterYourUsername")}:`}
        fieldPayload={{
          placeholder: `${t("username")}...`,
        }}
        response={{ text: username ?? "" }}
        onResponseChanged={(res) => handleUsernameChanged(res.text)}
        requiredAlert={!!alertMessage}
        alertMessage={alertMessage}
        onEnterPress={handleNextClicked}
      />
      <VerticalSeparator />
      <VerticalSeparator />
      <ActionsContainer>
        <TextActionSpan onClick={handleBackClicked}>{t("back")}</TextActionSpan>
        <ButtonAction onClick={handleNextClicked}>
          <ButtonActionText>{t("next")}</ButtonActionText>
        </ButtonAction>
      </ActionsContainer>
    </Root>
  );
}; // EnterUsernameStep

export default EnterUsernameStep;
