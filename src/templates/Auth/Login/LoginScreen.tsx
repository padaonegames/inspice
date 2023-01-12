import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import StepTitleCard from "../../../components/Forms/Cards/StepTitleCard";
import Header from "../../../components/Layout/Header";
import { State, Step, Steps } from "../../../components/Navigation/Steps";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useAppSelector } from "../../../store/hooks";
import EnterPasswordStep from "./Steps/EnterPasswordStep";
import EnterUsernameStep from "./Steps/EnterUsernameStep";

export const LoginScreen = (): JSX.Element => {
  const userData = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (userData) {
    return <Navigate replace to={location.state ?? "/"} />;
  }

  return <LoginFlow />;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5em;
  justify-content: center;
  align-items: center;
`;

const LoginFlow = (): JSX.Element => {
  const [state, setState] = useState<State>({});

  const { t } = useTranslation("gamGame");

  return (
    <>
      <Header
        sideMenuMode="system-user"
        availableLanguages={["en", "it", "es"]}
      />
      <Root>
        <StepTitleCard
          stepTitle={t("logIn")}
          stepDescription={t("logInDescription")}
        >
          <Steps genState={state} setGenState={setState}>
            <Step component={EnterUsernameStep} />
            <Step component={EnterPasswordStep} />
          </Steps>
        </StepTitleCard>
      </Root>
    </>
  );
};

export default LoginScreen;
