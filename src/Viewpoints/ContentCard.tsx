import React from 'react';
import styled from 'styled-components';

interface CardPanelProps {
  width: string;
};
const CardPanel = styled.div<CardPanelProps>`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  background-color: ${props => props.theme.cardBackground};
  width: ${props => props.width};
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-bottom: 15px;
`;

interface CardTitleTextProps {
  width?: string;
};
const CardTitleText = styled.h2<CardTitleTextProps>`
  letter-spacing: +0.5px;
  font-family: Raleway;
  text-transform: uppercase;
  margin-left: calc((100% - ${props => props.width || '90%'})/2);
  line-height: 3;
  font-size: 1.1em;
`;

interface CardExplanatoryTextProps {
  width?: string;
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
  b {
    font-weight: 700;
  }
`;

interface CardProps {
  cardTitle?: string;
  width?: string;
};

const ContentCard: React.FC<CardProps> = ({ cardTitle, width = '80%', children }) => {

  return (
    <CardPanel width={width}>
      {cardTitle &&
        <CardTitleText>
          {cardTitle}
        </CardTitleText>
      }
      {children}
    </CardPanel>
  );
}

export default ContentCard;