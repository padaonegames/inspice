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
  font-size: 1.05em;
  margin-bottom: 12px;
  width: ${props => (props.width || '90%')};
  align-self: center;
  text-align: ${props => props.textAlign || 'justify'};
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
};
const CardPanel = styled.div<CardPanelProps>`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 24px 16px 24px 16px;
  background-color: ${props => props.theme.cardBackground};
  width: ${props => props.width};
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

interface CardProps {
  cardTitle?: string;
  titleAlign?: 'left' | 'right' | 'center' | 'justify';
  width?: string;
};

const ContentCard: React.FC<CardProps> = ({ cardTitle, width = '80%', titleAlign = 'left', children }) => {

  return (
    <CardPanel
      width={width}
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