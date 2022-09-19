import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { SessionAuthContext } from "../../../auth/SessionAuthStore";
import StepTitleCard from "../../../components/Forms/Cards/StepTitleCard";
import Header from "../../../components/Layout/Header";
import { State, Step, Steps } from "../../../components/Navigation/Steps";
import EnterSessionStep from "./Steps/EnterSessionStep";
import EnterUsernameStep from "./Steps/EnterUsernameStep";

export const SessionLoginScreen = (): JSX.Element => {
  const { username, sessionName, activityId } = useContext(SessionAuthContext);
  const location = useLocation();
  const { activityId: originActivityId } = useParams();

  if (!originActivityId) {
    // nowhere to go back to, no activity to login to...
    return <Navigate replace to="/" />;
  }

  // all fields are set and original ID matches current one (ensures that there is no
  // conflict with possible previous data)
  if (
    username &&
    sessionName &&
    activityId &&
    activityId === originActivityId
  ) {
    return <Navigate replace to={location.state ?? "/"} />;
  }

  return <LoginFlow activityId={originActivityId} />;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5em;
  justify-content: center;
  align-items: center;
`;

interface LoginFlowProps {
  activityId: string;
}
const LoginFlow = (props: LoginFlowProps): JSX.Element => {
  const { activityId } = props;
  const [state, setState] = useState<State>({});

  const { t } = useTranslation("inspice");

  return (
    <>
      <Header sideMenuMode="session-user" />
      <Root>
        <StepTitleCard
          stepTitle={t("accessActivity")}
          stepDescription={t("accessActivityDescription")}
        >
          <Steps genState={state} setGenState={setState}>
            <Step component={EnterSessionStep} activityId={activityId} />
            <Step component={EnterUsernameStep} activityId={activityId} />
          </Steps>
        </StepTitleCard>
      </Root>
    </>
  );
};

export default SessionLoginScreen;
