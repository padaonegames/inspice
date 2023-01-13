import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import {
  ActionsContainer,
  ButtonAction,
  ButtonActionText,
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

interface EnterSessionStepProps {
  /** current sessionName as established in parent component. */
  sessionName: string;
  /** alert message to display in case there is a problem during session login. */
  alertMessage?: string;
  /** callback to notify parent of a change in the current sessionName string. */
  onSessionNameChanged?: (value: string) => void;
  /** callback to notify parent of next button being pressed to return to previous screen. */
  onNextPressed?: () => void;
} // EnterUsernameStepProps
export const EnterSessionStep = (props: EnterSessionStepProps): JSX.Element => {
  const { sessionName, alertMessage, onSessionNameChanged, onNextPressed } =
    props;
  const { t } = useTranslation("inspice");

  const handleSessionNameChanged = (value: string) => {
    if (!onSessionNameChanged) return;
    onSessionNameChanged(value);
  }; // handleSessionNameChanged

  return (
    <Root>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText={`${t("enterYourSessionName")}:`}
        fieldPayload={{
          placeholder: `${t("sessionName")}...`,
        }}
        response={{ text: sessionName }}
        onResponseChanged={(res) => handleSessionNameChanged(res.text)}
        requiredAlert={!!alertMessage}
        alertMessage={alertMessage}
        onEnterPress={onNextPressed}
      />
      <VerticalSeparator />
      <VerticalSeparator />
      <ActionsContainer>
        <div />
        <ButtonAction onClick={onNextPressed}>
          <ButtonActionText>{t("Next")}</ButtonActionText>
        </ButtonAction>
      </ActionsContainer>
    </Root>
  );
}; // EnterSessionStep

export default EnterSessionStep;
