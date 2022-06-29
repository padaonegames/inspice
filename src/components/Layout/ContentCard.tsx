import React from 'react';
import styled from 'styled-components';

interface CardTitleTextProps {
  width?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
};
const CardTitleText = styled.h2<CardTitleTextProps>`
  letter-spacing: +0.5px;
  font-family: Raleway;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 12px;
  width: ${props => (props.width || '90%')};
  align-self: center;
  text-align: ${props => props.textAlign || 'justify'};

  @media (max-width: 768px) {
    font-size: 1.35em;
  }

  @media (min-width: 768px) {
    font-size: 1.75em;
  }
`;

interface CardExplanatoryTextProps {
  width?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
};
export const CardExplanatoryText = styled.p<CardExplanatoryTextProps>`
  max-width: 1200px;
  width: ${props => (props.width || '90%')};
  align-self: center;
  text-align: justify;
  font-size: 1em;
  letter-spacing: +0.2px;
  font-family: Raleway;
  line-height: 25px;
  margin-bottom: 12px;
  text-align: ${props => props.textAlign || 'justify'};
  b {
    font-weight: 700;
  }
`;

interface CardPanelProps {
  width: string;
  maxWidth: string;
  flexDirection: 'row' | 'column';
};
const CardPanel = styled.div<CardPanelProps>`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 24px 16px 24px 16px;
  background-color: ${props => props.theme.cardBackground};
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  display: flex;
  flex-direction: ${props => props.flexDirection};
  margin-bottom: 15px;
`;

export interface CardProps {
  /** Title of the box. */
  cardTitle?: string;
  /** Alignment of the title. */
  titleAlign?: 'left' | 'right' | 'center' | 'justify';
  /** Width of the box. */
  width?: string;
  /** Maximum width possible for the card */
  maxWidth?: string;
  /** Content orientation of the card. */
  flexDirection?: 'row' | 'column';
  /** React node component that can act as a child to the box. */
  children?: React.ReactNode;
};

/**
 * Examples of content cards:
 * 
 * <img src="media://ContentCard.PNG" alt="ContentCard">
 */
export const ContentCard = ({
  cardTitle,
  width = '95%',
  maxWidth = '1024px',
  flexDirection = 'column',
  titleAlign = 'left',
  children
}: CardProps): JSX.Element => {

  return (
    <CardPanel
      width={width}
      maxWidth={maxWidth}
      flexDirection={flexDirection}
    >
      {cardTitle &&
        <CardTitleText textAlign={titleAlign}>
          {cardTitle}
        </CardTitleText>
      }
      {children}
    </CardPanel>
  );
}

export default ContentCard;