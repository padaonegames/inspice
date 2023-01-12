import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 19px;
  margin-bottom: 20px;
  width: 152px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 114px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 0.35rem;
  border: 1px solid #dfe1e5;
  background-color: ${(props) => props.theme.cardBackground};

  &:hover {
    border: 1px solid ${(props) => props.theme.secondaryButtonColor};
  }
`;

const TemplateTitle = styled.div`
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  font-size: 0.85em;
  letter-spacing: 1px;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 0.5em;
  margin-left: 0.35em;
`;

interface CreateFromTemplateCardProps {
  /** What should be placed inside this card (an image, an icon, and so on). */
  cardContent?: JSX.Element;
  /** text to be rendered underneath the card. */
  title: string;
  /** callback to parent to notify of the card being clicked on. */
  onCardClicked?: () => void;
} // CreateFromTemplateCardProps
export const CreateFromTemplateCard = (
  props: CreateFromTemplateCardProps
): JSX.Element => {
  const { cardContent, title, onCardClicked } = props;
  return (
    <Root>
      <PreviewContainer onClick={onCardClicked}>{cardContent}</PreviewContainer>
      <TemplateTitle>{title}</TemplateTitle>
    </Root>
  );
}; // CreateFromTemplateCard
