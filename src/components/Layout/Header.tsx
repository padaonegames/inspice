import { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/ThemeStore";
import { LightMode } from "@styled-icons/material-sharp/LightMode";
import { DarkMode } from "@styled-icons/material-sharp/DarkMode";
import SideMenu, { NavigationWarning, NavMenuElem } from "./SideMenu";
import { Menu } from "styled-icons/ionicons-solid";
import { Language } from "@styled-icons/fa-solid/Language";
import { DotsVerticalRounded } from "@styled-icons/boxicons-regular/DotsVerticalRounded";
import DropdownMenu from "../Forms/DropdownMenu";

interface BurgerIconProps {
  open?: boolean;
}
const BurgerIcon = styled(Menu)<BurgerIconProps>`
  height: 1.5em;
  width: 1.5em;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;

  ${(props) =>
    props.open &&
    `
  transform: rotate(90deg);
  `}
`;

const Root = styled.div`
  position: sticky;
  background-color: ${(props) => props.theme.headerBackground};
  color: ${(props) => props.theme.textColor};
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
  font-size: ${(props) => props.theme.titleFontSize};
  letter-spacing: ${(props) => props.theme.titleLetterSpacing};
  font-family: ${(props) => props.theme.titleFont};
  margin-left: 1em;
`;

const ThemeSwitch = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  margin-left: auto;
`;

const modeStyle = css`
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  height: 1.5em;
  width: 1.5em;

  &:hover {
    transform: scale(1.2);
  }
`;

const OpenActionsDropdownButton = styled.span`
  cursor: pointer;
  position: relative;
`;

const ActionsIcon = styled(DotsVerticalRounded)`
  margin-right: 1em;
  position: relative;
  ${modeStyle}
`;

const IconsSeparator = styled.div`
  background-color: ${(props) => props.theme.textColor};
  width: 1px;
  height: 1.5em;
  margin-right: 1em;
`;

const LightModeIcon = styled(LightMode)`
  ${modeStyle}
`;

const DarkModeIcon = styled(DarkMode)`
  ${modeStyle}
`;

const LanguageIcon = styled(Language)`
  ${modeStyle}
  margin-right: 1em;
`;

export interface HeaderAction {
  /** How to render this option within a list. Defaults to empty string */
  displayName?: string;
  /** What component to place next to the display name */
  iconComponent?: JSX.Element;
  /** action to perform upon clicking on this action */
  onActionSelected?: () => void;
} // HeaderAction

export interface HeaderProps {
  /** Title to display on this header */
  activityTitle?: string;
  /** Navigation Entries to be rendered within the associated side menu for the current template */
  navigationEntries?: NavMenuElem[];
  /** Guards to warn user about a possible loss of progress when transitioning from a given route */
  navigationWarnings?: NavigationWarning[];
  /** actions that can be performed from the header at all times during the activity */
  headerActions?: HeaderAction[];
  /**
   * What sort of user management should be done from this header's side menu.
   * Three modes are currently supported:
   * + `none`: no user nor user handling methods will be displayed.
   * + `session-user`: assuming we are within the context of a `SessionAuthStore`, current username and session will be displayed
   * as well as the option to log out of the session.
   * + `system-user`: assuming we are within the context of an `AuthStore`, current username will be displayed, as well as the option
   * to perform a logout action.
   */
  sideMenuMode?: "none" | "session-user" | "system-user";
} // HeaderProps

/** Basic Header component with support for theme and localization management, as well as for in-template navigation via side menu */
export const Header = (props: HeaderProps) => {
  const {
    activityTitle = "",
    navigationEntries = [],
    navigationWarnings = [],
    headerActions = [],
    sideMenuMode = "none",
  } = props;

  const { i18n } = useTranslation("app");
  const { theme, switchTheme } = useContext(ThemeContext);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] =
    useState<boolean>(false);

  const handleOptionSelected = (opt: string) => {
    const action = headerActions.find((elem) => elem.displayName === opt);
    if (action && action.onActionSelected) {
      action.onActionSelected();
    }
  }; // handleOptionSelected

  return (
    <>
      <Root>
        <BurgerIcon
          open={openMenu}
          onClick={() => setOpenMenu((prev) => !prev)}
        />
        <AppName>{`${activityTitle && `${activityTitle}`}`}</AppName>
        <ThemeSwitch>
          {headerActions.length > 0 && (
            <>
              <OpenActionsDropdownButton>
                <ActionsIcon
                  title="More Options"
                  onClick={() => setActionsDropdownOpen(true)}
                />
                {actionsDropdownOpen && (
                  <DropdownMenu
                    positioning={{ right: "0.75em", top: "2em" }}
                    options={headerActions.map((action) => ({
                      displayName: action.displayName,
                      iconComponent: action.iconComponent,
                    }))}
                    onOptionSelected={handleOptionSelected}
                    onCloseDropdown={() => setActionsDropdownOpen(false)}
                  />
                )}
              </OpenActionsDropdownButton>
              <IconsSeparator />
            </>
          )}
          {
            <LanguageIcon
              title="Switch language"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "it" : "en")
              }
            />
          }
          {theme === "dark" ? (
            <LightModeIcon
              title="Switch to light mode"
              onClick={() => switchTheme("light")}
            />
          ) : (
            <DarkModeIcon
              title="Switch to dark mode"
              onClick={() => switchTheme("dark")}
            />
          )}
        </ThemeSwitch>
      </Root>
      <SideMenu
        open={openMenu}
        sideMenuMode={sideMenuMode}
        entries={navigationEntries}
        navigationWarnings={navigationWarnings}
        onClose={() => setOpenMenu(false)}
      />
    </>
  );
}; // Header

export default Header;
