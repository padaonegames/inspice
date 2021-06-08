import React from 'react';
import styled from 'styled-components';

import { NextPlan } from '@styled-icons/material-outlined/NextPlan';
import { useTranslation } from 'react-i18next';

interface IconProps {
  size: 'small' | 'medium';
  color: string;
};

const NextCornerIcon = styled(NextPlan) <IconProps>`
  color: ${props => props.color};
  height: ${props => props.size === 'medium' ? 7.5 : 5}vh;
  align-self: center;
  margin-bottom: 1vh;
`;

const PrevCornerIcon = styled(NextCornerIcon)`
  transform: scale(-1, 1);
`;

interface TextProps {
  fontSize: string;
  color: string;
};

const NextCornerText = styled.p<TextProps>`
  font-size: ${props => props.fontSize};
  font-weight: 400;
  letter-spacing: +1px;
  font-family: Raleway;
  color: ${props => props.color};
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
    color: ${props => props.active ? '#F3F3F3' : 'darkgray'}
  }

  ${NextCornerIcon} {
    color: ${props => props.active ? '#F3F3F3' : 'darkgray'}
  }

  &:hover {
    cursor: ${props => props.active ? 'pointer' : 'default'};
    transform: ${props => props.active ? 'scale(1)' : 'scale(0.9)'};
    transition: transform linear 0.3s;

    ${NextCornerText} {
      color: ${props => props.active ? '#F3F3F3' : 'darkgray'}
    }
  
    ${NextCornerIcon} {
      color: ${props => props.active ? '#F3F3F3' : 'darkgray'}
    }
  }
`;

interface NextCornerButtonProps {
  onNextClicked: () => void;
  type?: 'next' | 'previous';
  size?: 'small' | 'medium';
  fontSize?: string;
  alignSelf?: 'flex-start' | 'flex-end' | 'center';
  margin?: string;
  active?: boolean;
  color?: string;
};

const NextCornerButton: React.FC<NextCornerButtonProps> = ({
  onNextClicked,
  type = 'next',
  size = 'medium',
  fontSize = '0.8em',
  alignSelf = 'center',
  margin = 'auto',
  active = true,
  color = '#F3F3F3',
}) => {

  const { t, i18n } = useTranslation('app');

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
          color={color}
        /> :
        <PrevCornerIcon
          size={size}
          color={color}
        />
      }

      <NextCornerText
        fontSize={fontSize}
        color={color}
      >
        { type === 'next' ? t('goForward') : t('goBack') }
      </NextCornerText>
    </NextCorner>
  );
}

export default NextCornerButton;