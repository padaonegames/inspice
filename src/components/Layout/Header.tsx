import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../theme/ThemeStore';
import { LightMode } from '@styled-icons/material-sharp/LightMode';
import { DarkMode } from '@styled-icons/material-sharp/DarkMode';
import SideMenu, { NavMenuElem } from './SideMenu';
import { Menu } from "styled-icons/ionicons-solid";

interface BurgerIconProps {
  open?: boolean;
}
const BurgerIcon = styled(Menu) <BurgerIconProps>`
  height: 1.5em;
  width: 1.5em;
  color: ${props => props.theme.textColor};
  cursor: pointer;

  ${props => props.open && `
  transform: rotate(90deg);
  `}
`;

const Root = styled.div`
  position: sticky;
  background-color: ${props => props.theme.headerBackground};
  color: ${props => props.theme.textColor};
  align-items: center;
  justify-content: left;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.75em;
  min-width: 320px;
  padding: 0 1em;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: inherit;
  z-index: 999999;
`;

const AppName = styled.span`
  font-size: ${props => props.theme.titleFontSize};
  letter-spacing: ${props => props.theme.titleLetterSpacing};
  font-family: ${props => props.theme.titleFont};
  margin-left: 1em;
`;

const ThemeSwitch = styled.span`
  cursor: pointer;
  margin-left: auto;
`;

const modeStyle = css`
  color: ${props => props.theme.textColor};
  cursor: pointer;
  height: 1.5em;
  width: 1.5em;

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
  /** Title to display on this header */
  activityTitle?: string;
  /** Navigation Entries to be rendered within the associated side menu for the current template */
  navigationEntries?: NavMenuElem[];
};

/** Basic Header component with support for theme and localization management, as well as for in-template navigation via side menu */
export const Header = (props: HeaderProps) => {

  const {
    activityTitle = '',
    navigationEntries = []
  } = props;

  // const { t } = useTranslation('app');
  const { theme, switchTheme } = useContext(ThemeContext);
  // ${t('museumHeader')} - 

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      <Root>
        <BurgerIcon
          open={openMenu}
          onClick={() => setOpenMenu(prev => !prev)}
        />
        <AppName>{`${activityTitle && `${activityTitle}`}`}</AppName>
        <ThemeSwitch onClick={() => switchTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </ThemeSwitch>
      </Root>
      <SideMenu
        open={openMenu}
        entries={navigationEntries}
        onClose={() => setOpenMenu(false)}
      />
    </>
  );
}

export default Header;