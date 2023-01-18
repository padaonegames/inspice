import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { usePerformUserLoginMutation } from "../../../../services/auth.api";
import { useAppDispatch } from "../../../../store/hooks";
import { setCredentials } from "../../../../store/features/auth/authSlice";
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

  const [performUserLogin, loginResult] = usePerformUserLoginMutation();
  const dispatch = useAppDispatch();

  const username = props.getState<string>("username", "user");
  const password = props.getState<string>("password", "");

  const [alertMessage, setAlertMessage] =
    useState<string | undefined>(undefined);

  const handleBackClicked = () => {
    if (props.hasPrev()) {
      props.prev();
    }
  }; // handleBackClicked

  const handleNextClicked = () => {
    performUserLogin({ username, password });
  }; // handleNextClicked

  useEffect(() => {
    if (loginResult.isError) {
      setAlertMessage("Incorrect credentials. Please try again.");
    } else if (loginResult.isSuccess) {
      if (loginResult.data.accessToken !== null) {
        setAlertMessage(undefined);
        dispatch(setCredentials(loginResult.data));
        console.log(`Your token: ${loginResult.data.accessToken}`);
        console.log(loginResult.data.userData);
      } else {
        // no access token, reset credentials
        setAlertMessage(
          loginResult.data.message ??
            "There was a problem during login. Please try again."
        );
        dispatch(
          setCredentials({ accessToken: undefined, userData: undefined })
        );
      }
    }
  }, [loginResult]);

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
