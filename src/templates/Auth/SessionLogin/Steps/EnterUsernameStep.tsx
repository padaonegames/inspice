import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SessionAuthContext } from "../../../../auth/SessionAuthStore";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { activityService } from "../../../../services";
import { useAsyncRequest } from "../../../../services/useAsyncRequest";
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

export const EnterUsernameStep = (
  props: StepComponentProps & { activityId: string }
): JSX.Element => {
  const { t } = useTranslation("inspice");

  const { setUsernameSessionActivity } = useContext(SessionAuthContext);

  const { activityId } = props;
  const username = props.getState<string>("username", "");
  const sessionName = props.getState<string>("sessionName", "");

  const performLogin = async () => {
    return await activityService.checkUsernameSessionPairForActivityId(
      activityId,
      username,
      sessionName
    );
  }; // performLogin

  const [performLoginRequest, triggerRequest] = useAsyncRequest(
    performLogin,
    [],
    false
  );
  const [alertMessage, setAlertMessage] =
    useState<string | undefined>(undefined);

  const handleBackClicked = () => {
    if (props.hasPrev()) {
      props.prev();
    }
  }; // handleBackClicked

  const handleNextClicked = () => {
    triggerRequest();
  }; // handleNextClicked

  useEffect(() => {
    console.log(performLoginRequest);
    if (performLoginRequest.kind === "success") {
      if (
        performLoginRequest.result.kind === "http-error" ||
        performLoginRequest.result.kind === "axios-error"
      ) {
        setAlertMessage(
          "Entered username does not exist in this session. Please check your credentials and try again."
        );
      } else if (
        performLoginRequest.result.kind === "ok" &&
        performLoginRequest.result.data
      ) {
        setAlertMessage(undefined);
        setUsernameSessionActivity({ username, sessionName, activityId });
      }
    } else if (performLoginRequest.kind === "failure") {
      setAlertMessage(
        "Entered username does not exist in this session. Please check your credentials and try again."
      );
    }
  }, [performLoginRequest]);

  return (
    <Root>
      <StepDescription>{t("welcome")}</StepDescription>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText={`${t("enterYourUsername")}:`}
        fieldPayload={{
          placeholder: `${t("username")}...`,
        }}
        response={{ text: username }}
        onResponseChanged={(res) =>
          props.setState<string>("username", res.text, "")
        }
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
