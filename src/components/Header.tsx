import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Root = styled.div`
  justify-content: left;
  background-color: white;
  align-content: center;
  display: flex;
  flex-direction: row;
  top: 0;
  width: 100%;
  height: auto;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 3vh;
  border-style: solid;
  border-color: lightgrey;
  border-width: 0px 0px 1px 0px;
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

const Header: React.FC = () => {

  const { t } = useTranslation('app');

  return (
    <Root>
      <AppName>{t('museumHeader')}</AppName>
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