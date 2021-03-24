import React from 'react';
import styled from 'styled-components';

import { NextPlan } from '@styled-icons/material-outlined/NextPlan';

interface IconProps {
  size: 'small' | 'medium';
};

const NextCornerIcon = styled(NextPlan) <IconProps>`
  color: #F8F8F8;
  height: ${props => props.size === 'medium' ? 7.5 : 5}vh;
  align-self: center;
  margin-bottom: 1vh;
`;

const PrevCornerIcon = styled(NextCornerIcon)`
  transform: scale(-1, 1);
`;

interface TextProps {
  fontSize: string;
};

const NextCornerText = styled.p<TextProps>`
  font-size: ${props => props.fontSize};
  font-weight: 400;
  letter-spacing: +1px;
  font-family: Raleway;
  color: #F8F8F8;
`;

interface CornerProps {
  alignSelf: 'flex-start' | 'flex-end' | 'center';
  margin: string;
  active: boolean;
};

const NextCorner = styled.div<CornerProps>`
  align-self: ${props => props.alignSelf};
  width: auto;
  height: auto;
  display: flex;
  margin: ${props => props.margin};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: transform linear 0.3s;

  ${NextCornerText} {
    color: ${props => props.active ? '#F8F8F8' : 'darkgray'}
  }

  ${NextCornerIcon} {
    color: ${props => props.active ? '#F8F8F8' : 'darkgray'}
  }

  &:hover {
    cursor: ${props => props.active ? 'pointer' : 'default'};
    transform: ${props => props.active ? 'scale(1)' : 'scale(0.9)'};
    transition: transform linear 0.3s;

    ${NextCornerText} {
      color: ${props => props.active ? '#F8F8F8' : 'darkgray'}
    }
  
    ${NextCornerIcon} {
      color: ${props => props.active ? '#F8F8F8' : 'darkgray'}
    }
  }
`;

interface NextCornerButtonProps {
  onNextClicked: () => void;
  type?: 'next' | 'previous';
  text?: string;
  size?: 'small' | 'medium';
  fontSize?: string;
  alignSelf?: 'flex-start' | 'flex-end' | 'center';
  margin?: string;
  active?: boolean;
};

const NextCornerButton: React.FC<NextCornerButtonProps> = ({
  onNextClicked,
  type = 'next',
  text = 'CONTINUAR',
  size = 'medium',
  fontSize = '0.8em',
  alignSelf = 'center',
  margin = 'auto',
  active = true
}) => {

  return (
    <NextCorner
      active={active}
      alignSelf={alignSelf}
      onClick={onNextClicked}
      margin={margin}
    >
      { type === 'next' ?
        <NextCornerIcon
          size={size}
        /> :
        <PrevCornerIcon
          size={size}
        />
      }

      <NextCornerText
        fontSize={fontSize}
      >
        {text}
      </NextCornerText>
    </NextCorner>
  );
}

export default NextCornerButton;