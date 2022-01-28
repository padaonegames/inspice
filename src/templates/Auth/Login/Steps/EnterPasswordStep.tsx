import styled from "styled-components";
import { ShortTextInputCard } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { StepComponentProps } from "../../../../components/Navigation/Steps";
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

  const checkValidUsername = async () => {

  };

  const [validUsernameRequest] = useAsyncRequest(checkValidUsername, []);

  return (
    <Root>
      <StepDescription>
        Welcome, {props.getState<string>('username', 'user')}!
      </StepDescription>
      <VerticalSeparator />
      <ShortTextInputCard
        promptText="Enter your personal password:"
        placeholder="Password..."
        value={props.getState<string>('password', '')}
        onChange={(val) => props.setState<string>('password', val, '')}
        requiredAlert={true}
        alertMessage="Incorrect password. Please try again."
      />
      <VerticalSeparator />
      <VerticalSeparator />
      <ActionsContainer>
        <TextActionSpan>
          Back
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

export default EnterPasswordStep;