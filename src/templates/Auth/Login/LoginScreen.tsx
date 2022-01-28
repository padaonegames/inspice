import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../auth/AuthStore";
import StepTitleCard from "../../../components/Forms/Cards/StepTitleCard";
import { State, Step, Steps } from "../../../components/Navigation/Steps";
import EnterPasswordStep from "./Steps/EnterPasswordStep";
import EnterUsernameStep from "./Steps/EnterUsernameStep";

export const LoginScreen = (): JSX.Element => {

  const { userData, setUserData } = useContext(AuthContext);

  if (userData) {
    return <Navigate replace to='/' />;
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

  return (
    <Root>
      <StepTitleCard
        stepTitle="Log in"
        stepDescription="Log in to your InSpice account to create your own content and interact with the museum's artworks."
      >
        <Steps
          genState={state}
          setGenState={setState}
        >
          <Step component={EnterUsernameStep}/>
          <Step component={EnterPasswordStep}/>
        </Steps>
      </StepTitleCard>
    </Root>
  );
};

export default LoginScreen;