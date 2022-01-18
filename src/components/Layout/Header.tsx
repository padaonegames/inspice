import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../theme/ThemeStore';
import { LightMode } from '@styled-icons/material-sharp/LightMode';
import { DarkMode } from '@styled-icons/material-sharp/DarkMode';

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
  z-index: 999999;
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
  padding-right: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const modeStyle = css`
  color: ${props => props.theme.textColor};
  cursor: pointer;
  height: 27px;
  width: 27px;
  margin: auto;

  &:hover {
    transform: scale(1.2);
  }
`;

const LightModeIcon = styled(LightMode)`
  ${modeStyle}
`;

const DarkModeIcon = styled(DarkMode)`
  ${modeStyle}
`;

export interface HeaderProps {
  activityTitle?: string;
};

/**
 * <img src="media://Header.PNG" alt="Header">
 */
export const Header: React.FC<HeaderProps> = ({ activityTitle = '' }) => {

  const { t } = useTranslation('app');
  const { theme, switchTheme } = useContext(ThemeContext);
  // ${t('museumHeader')} - 
  return (
    <Root>
      <AppName>{`${activityTitle && `${activityTitle}`}`}</AppName>
      <ThemeSwitch onClick={() => switchTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </ThemeSwitch>
    </Root>
  );
}

export default Header;