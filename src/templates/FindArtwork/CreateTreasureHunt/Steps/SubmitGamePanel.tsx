import React from 'react';
import styled from 'styled-components';

import { CloudUpload } from '@styled-icons/boxicons-regular/CloudUpload';
import { useTranslation } from 'react-i18next';

const SubmitGameIcon = styled(CloudUpload)`
  color: black;
  height: 5vh;
  weight: 5vh;
  align-self: center;
  margin-bottom: 4.5%;
`;

const SubmitGameText = styled.p`
  font-size: 0.7em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

interface SubmitGameCornerProps {
  active: boolean;
};

const SubmitGameCorner = styled.div<SubmitGameCornerProps>`
  width: 12.5%;
  height: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: transform ease 0.5s;

  ${SubmitGameIcon} {
    color: ${props => props.active ? 'black' : 'darkgray'}
  }

  ${SubmitGameText} {
    color: ${props => props.active ? 'black' : 'darkgray'}
  }

  &:hover {
    cursor: ${props => props.active ? 'pointer' : 'default'};
    transform: ${props => props.active ? 'scale(1)' : 'scale(0.9)'};
    transition: transform ease 0.5s;
  }
`;

interface SubmitGamePanelProps {
  onButtonClicked: () => void;
  enabled: boolean;
};

const SubmitGamePanel: React.FC<SubmitGamePanelProps> = ({ onButtonClicked, enabled }) => {

  const { t } = useTranslation('app');
  
  return (
    <SubmitGameCorner
      active={enabled}
      onClick={onButtonClicked}
    >
      <SubmitGameIcon/>
      <SubmitGameText>
        {t('submitGame')}
      </SubmitGameText>      
    </SubmitGameCorner>
  );
}

export default SubmitGamePanel;