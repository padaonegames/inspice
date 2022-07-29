import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AuthContext } from "../../../../auth/AuthStore";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { authService } from "../../../../services";
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

export const EnterPasswordStep = (props: StepComponentProps): JSX.Element => {
  const { t } = useTranslation("gamGame");

  const { setUserData, setAccessToken } = useContext(AuthContext);

  const username = props.getState<string>("username", "user");
  const password = props.getState<string>("password", "");

  const performLogin = async () => {
    return await authService.performUserLogin(username, password);
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
    if (performLoginRequest.kind === "success") {
      if (performLoginRequest.result.kind === "http-error") {
        setAlertMessage("Incorrect password. Please try again.");
      } else if (
        performLoginRequest.result.kind === "ok" &&
        performLoginRequest.result.data.accessToken
      ) {
        setAlertMessage(undefined);
        setUserData({ ...performLoginRequest.result.data });
        setAccessToken(performLoginRequest.result.data.accessToken);
        console.log(
          `Your token: ${performLoginRequest.result.data.accessToken}`
        );
      }
    }
  }, [performLoginRequest]);

  return (
    <Root>
      <StepDescription>
        {t("welcome")}, {username}!
      </StepDescription>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText={`${t("enterYourPassword")}:`}
        fieldPayload={{
          placeholder: `${t("password")}...`,
          isPassword: true,
        }}
        response={{ text: password }}
        onResponseChanged={(res) =>
          props.setState<string>("password", res.text, "")
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
}; // EnterPasswordStep

export default EnterPasswordStep;
