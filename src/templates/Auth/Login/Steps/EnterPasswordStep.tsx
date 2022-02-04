import { useContext, useEffect, useState } from "react";
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
  VerticalSeparator
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

  const { setUserData, setAccessToken } = useContext(AuthContext);

  const username = props.getState<string>('username', 'user');
  const password = props.getState<string>('password', '');

  const performLogin = async () => {
    return await authService.performUserLogin(username, password);
  };

  const [performLoginRequest, triggerRequest] = useAsyncRequest(performLogin, [], false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  const handleBackClicked = () => {
    if (props.hasPrev()) {
      props.prev();
    }
  };

  const handleNextClicked = () => {
    triggerRequest();
  };

  useEffect(() => {
    if (performLoginRequest.kind === 'success') {
      if (performLoginRequest.result.kind === 'http-error') {
        setAlertMessage('Incorrect password. Please try again.');
      }
      else if (performLoginRequest.result.kind === 'ok' && performLoginRequest.result.data.accessToken) {
        setAlertMessage(undefined);
        setUserData({ ...performLoginRequest.result.data });
        setAccessToken(performLoginRequest.result.data.accessToken);
        console.log(`Your token: ${performLoginRequest.result.data.accessToken}`);
      }
    }
  }, [performLoginRequest]);

  return (
    <Root>
      <StepDescription>
        Welcome, {username}!
      </StepDescription>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText="Enter your personal password:"
        placeholder="Password..."
        value={password}
        isPassword
        onChange={(val) => props.setState<string>('password', val, '')}
        requiredAlert={!!alertMessage}
        alertMessage={alertMessage}
        onEnterPress={handleNextClicked}
      />
      <VerticalSeparator />
      <VerticalSeparator />
      <ActionsContainer>
        <TextActionSpan onClick={handleBackClicked}>
          Back
        </TextActionSpan>
        <ButtonAction onClick={handleNextClicked}>
          <ButtonActionText>
            Next
          </ButtonActionText>
        </ButtonAction>
      </ActionsContainer>
    </Root>
  );
};

export default EnterPasswordStep;