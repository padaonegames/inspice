import React from 'react';
import styled from 'styled-components';

import { NextPlan } from '@styled-icons/material-outlined/NextPlan';
import { useTranslation } from 'react-i18next';

const NextCornerIcon = styled(NextPlan)`
  color: black;
  height: 10vh;
  align-self: center;
  margin-bottom: 4vh;
`;

const NextCornerText = styled.p`
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

const NextCorner = styled.div`
  width: 25vw;
  height: 100%;
  display: flex;
  margin-left: 0;
  margin-right: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: transform linear 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

interface NextPanelProps {
  onNextClicked: () => void;
};

const NextPanel: React.FC<NextPanelProps> = ({ onNextClicked }) => {

  const { t, i18n } = useTranslation('app');
  
  return (
    <NextCorner
      onClick={onNextClicked}
    >
      <NextCornerIcon />
      <NextCornerText>
        {t('goForward')}
      </NextCornerText>
    </NextCorner>
  );
}

export default NextPanel;