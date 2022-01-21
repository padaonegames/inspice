import styled from "styled-components";
import {
  Root,
  TitleColor,
  TitleText,
  StepDescription
} from "./cardStyles";


interface CardPanelProps {
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}
export const CardPanel = styled.div<CardPanelProps>`
  padding: 16px 16px 24px 16px;
  background-color: ${props => props.theme.cardBackground};
  ${props => !props.requiredAlert && 'border: 1px solid #dadce0;'}
  ${props => props.requiredAlert && 'border: 1px solid #c44c49;'}
  border-radius: 0 0 8px 8px;
  width: 100%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
`;

export interface StepTitleCardProps {
  stepTitle: string;
  stepDescription?: string;
}

export const StepTitleCard = (props: StepTitleCardProps): JSX.Element => {

  const {
    stepTitle,
    stepDescription
  } = props;

  return (
    <Root>
      <TitleColor />
      <CardPanel>
        <TitleText>
          {stepTitle}
        </TitleText>
        <StepDescription>
          {stepDescription}
        </StepDescription>
      </CardPanel>
    </Root>
  );
};

export default StepTitleCard;