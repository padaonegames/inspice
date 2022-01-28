import { useEffect, useState } from "react";
import styled from "styled-components";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
import { userService } from "../../../../services";
import { useAsyncRequest } from "../../../../services/useAsyncRequest";
import {
  ActionsContainer,
  ButtonAction,
  ButtonActionText,
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

export const EnterUsernameStep = (props: StepComponentProps): JSX.Element => {

  const username = props.getState<string>('username', '');

  const checkValidUsername = async () => {
    return await userService.checkUsernameInUse(username);
  };

  const [validUsernameRequest, triggerRequest] = useAsyncRequest(checkValidUsername, [], false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  const handleNextClicked = () => {
    triggerRequest();
  };

  useEffect(() => {
    if (validUsernameRequest.kind === 'success'
      && validUsernameRequest.result.kind === 'ok'
    ) {
      if (!validUsernameRequest.result.data) {
        setAlertMessage('No user with specified username could be found');
      }
      else if (props.hasNext()) {
        props.next();
      }
    }
  }, [validUsernameRequest]);

  return (
    <Root>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText="Enter your InSpice username:"
        placeholder="Username..."
        value={username}
        onChange={(val) => props.setState<string>('username', val, '')}
        requiredAlert={!!alertMessage}
        alertMessage={alertMessage}
        onEnterPress={handleNextClicked}
      />
      <VerticalSeparator />
      <VerticalSeparator />
      <ActionsContainer>
        <TextActionSpan>
          Create Account
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

export default EnterUsernameStep;