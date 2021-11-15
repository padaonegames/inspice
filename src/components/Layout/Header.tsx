import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../theme/ThemeStore';

const Root = styled.div`
  position: sticky;
  background-color: ${props => props.theme.headerBackground};
  color: ${props => props.theme.textColor};
  align-content: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  min-width: 320px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: inherit;
  z-index: 9001;
`;

const AppName = styled.span`
  font-size: ${props => props.theme.titleFontSize};
  letter-spacing: ${props => props.theme.titleLetterSpacing};
  font-family: ${props => props.theme.titleFont};
`;

const ThemeSwitch = styled.span`
  font-size: ${props => props.theme.titleFontSize};
  letter-spacing: ${props => props.theme.titleLetterSpacing};
  font-family: ${props => props.theme.titleFont};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface HeaderProps {
  activityTitle?: string;
};

const Header: React.FC<HeaderProps> = ({ activityTitle = '' }) => {

  const { t } = useTranslation('app');
  const { theme, switchTheme } = useContext(ThemeContext); 

  return (
    <Root>
      <AppName>{`${t('museumHeader')}${activityTitle && ` - ${activityTitle}`}`}</AppName>
      <ThemeSwitch onClick={() => switchTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light' : 'Dark'}
      </ThemeSwitch>
    </Root>
  );
}

export default Header;