import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Root = styled.div`
  position: sticky;
  justify-content: left;
  background-color: white;
  align-content: center;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  min-width: 320px;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 3vh;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: inherit;
  z-index: 9001;
`;

const AppName = styled.p`
  font-size: 1.2em;
  letter-spacing: +2px;
  font-family: 'Anonymous Pro';
`;

/*
const LanguageSwitch = styled.div`
  margin-left: auto;
  font-size: 1.1em;
  letter-spacing: +2px;
  font-family: 'Anonymous Pro';
  cursor: pointer;
`;
*/

interface HeaderProps {
  activityTitle?: string;
};

const Header: React.FC<HeaderProps> = ({ activityTitle = '' }) => {

  const { t } = useTranslation('app');

  return (
    <Root>
      <AppName>{`${t('museumHeader')}${activityTitle && ` - ${activityTitle}`}`}</AppName>
      {/*
      <LanguageSwitch>
        <AppName
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
        >
          {i18n.language === 'en' ? 'ES' : 'EN'}
        </AppName>
      </LanguageSwitch>
      */}
    </Root>
  );
}

export default Header;