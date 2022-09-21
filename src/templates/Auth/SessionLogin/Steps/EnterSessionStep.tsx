import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { activityService } from "../../../../services";
import { useAsyncRequest } from "../../../../services/useAsyncRequest";
import {
  ActionsContainer,
  ButtonAction,
  ButtonActionText,
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

export const EnterSessionStep = (
  props: StepComponentProps & { activityId: string }
): JSX.Element => {
  const { activityId } = props;
  const { t } = useTranslation("inspice");

  const sessionName = props.getState<string>("sessionName", "");

  const checkValidSession = async () => {
    return await activityService.checkSessionNameInUse(activityId, sessionName);
  }; // checkValidSession

  const [validSessionRequest, triggerRequest] = useAsyncRequest(
    checkValidSession,
    [],
    false
  );
  const [alertMessage, setAlertMessage] =
    useState<string | undefined>(undefined);

  const handleNextClicked = () => {
    triggerRequest();
  }; // handleNextClicked

  useEffect(() => {
    if (
      validSessionRequest.kind === "success" &&
      validSessionRequest.result.kind === "ok"
    ) {
      if (!validSessionRequest.result.data) {
        setAlertMessage("Session not found");
      } else if (props.hasNext()) {
        props.next();
      }
    }
  }, [validSessionRequest]);

  return (
    <Root>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText={`${t("enterYourSessionName")}:`}
        fieldPayload={{
          placeholder: `${t("sessionName")}...`,
        }}
        response={{ text: sessionName }}
        onResponseChanged={(res) =>
          props.setState<string>("sessionName", res.text, "")
        }
        requiredAlert={!!alertMessage}
        alertMessage={alertMessage}
        onEnterPress={handleNextClicked}
      />
      <VerticalSeparator />
      <VerticalSeparator />
      <ActionsContainer>
        <div />
        <ButtonAction onClick={handleNextClicked}>
          <ButtonActionText>{t("Next")}</ButtonActionText>
        </ButtonAction>
      </ActionsContainer>
    </Root>
  );
}; // EnterSessionStep

export default EnterSessionStep;
