import styled from "styled-components";
import {
  Root,
  TitleColor,
} from "./cardStyles";


interface CardPanelProps {
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}
export const CardPanel = styled.div<CardPanelProps>`
  background-color: ${props => props.theme.cardBackground};
  ${props => !props.requiredAlert && 'border: 1px solid #dadce0;'}
  ${props => props.requiredAlert && 'border: 1px solid #c44c49;'}
  border-radius: 0 0 8px 8px;
  width: 100%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export interface ContainerCardProps {
  children?: React.ReactNode;
  upperDecorator?: boolean;
  requiredAlert?: boolean;
}

/**
 * Basic Card component to include general content without title or text
 */
export const ContainerCard = (props: ContainerCardProps): JSX.Element => {

  const {
    children,
    upperDecorator = false,
    requiredAlert = false
  } = props;

  return (
    <Root>
      {upperDecorator && <TitleColor />}
      <CardPanel requiredAlert={requiredAlert}>
        {children}
      </CardPanel>
    </Root>
  );
};

export default ContainerCard;