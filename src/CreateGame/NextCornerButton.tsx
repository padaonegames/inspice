import React from 'react';
import styled from 'styled-components';

import { NextPlan } from '@styled-icons/material-outlined/NextPlan';
import { useTranslation } from 'react-i18next';

interface IconProps {
  size: 'small' | 'medium';
};

const NextCornerIcon = styled(NextPlan) <IconProps>`
  color: ${props => props.theme.textColor};
  height: ${props => props.size === 'medium' ? 60 : 50}px;
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
  color: ${props => props.theme.textColor};
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
    ${props => !props.active && `color: #a9a9a9;`}
  }

  ${NextCornerIcon} {
    ${props => !props.active && `color: #a9a9a9;`}
  }

  &:hover {
    cursor: ${props => props.active ? 'pointer' : 'default'};
    transform: ${props => props.active ? 'scale(1)' : 'scale(0.9)'};
    transition: transform linear 0.3s;

    ${NextCornerText} {
      ${props => !props.active && `color: #a9a9a9;`}
    }
  
    ${NextCornerIcon} {
      ${props => !props.active && `color: #a9a9a9;`}
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
};

const NextCornerButton: React.FC<NextCornerButtonProps> = ({
  onNextClicked,
  type = 'next',
  size = 'medium',
  fontSize = '0.8em',
  alignSelf = 'center',
  margin = 'auto',
  active = true,
}) => {

  const { t } = useTranslation('app');

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
        { type === 'next' ? t('goForward') : t('goBack') }
      </NextCornerText>
    </NextCorner>
  );
}

export default NextCornerButton;