import styled from "styled-components";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
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

  const checkValidUsername = async () => {

  };

  const [validUsernameRequest] = useAsyncRequest(checkValidUsername, []);

  return (
    <Root>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText="Enter your InSpice username:"
        placeholder="Username..."
        value={props.getState<string>('username', '')}
        onChange={(val) => props.setState<string>('username', val, '')}
        requiredAlert={true}
        alertMessage="No user with specified username could be found"
      />
      <VerticalSeparator />
      <VerticalSeparator />
      <ActionsContainer>
        <TextActionSpan>
          Create Account
        </TextActionSpan>
        <ButtonAction>
          <ButtonActionText>
            Next
          </ButtonActionText>
        </ButtonAction>
      </ActionsContainer>
    </Root>
  );
};

export default EnterUsernameStep;