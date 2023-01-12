import { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../theme/ThemeStore";
import { LightMode } from "@styled-icons/material-sharp/LightMode";
import { DarkMode } from "@styled-icons/material-sharp/DarkMode";
import SideMenu, { NavigationWarning, NavMenuElem } from "./SideMenu";
import { Menu } from "styled-icons/ionicons-solid";
import { DotsVerticalRounded } from "@styled-icons/boxicons-regular/DotsVerticalRounded";
import DropdownMenu, { DropdownMenuOption } from "../Forms/DropdownMenu";
import { DropdownSelector } from "../Forms/DropdownSelector";

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
  width: auto;
`;

const modeStyle = css`
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  height: 2.5em;
  width: auto;
  margin: auto 1.25em auto 0;
  border-radius: 50%;
  padding: 0.4em;

  &:hover {
    background-color: ${(props) => props.theme.hoverAreaColor};
  }
`;

const OpenActionsDropdownButton = styled.span`
  cursor: pointer;
  position: relative;
  ${modeStyle}
`;

const ActionsIcon = styled(DotsVerticalRounded)`
  height: 100%;
`;

const LightModeIcon = styled(LightMode)`
  ${modeStyle}
`;

const DarkModeIcon = styled(DarkMode)`
  ${modeStyle}
`;

interface HeaderLogoProps {
  disabled?: boolean;
}
const HeaderLogo = styled.img<HeaderLogoProps>`
  height: 50%;
  margin-left: 1em;
  ${(props) => !props.disabled && `cursor: pointer;`}
`;

export type HeaderAction = DropdownMenuOption;

export interface HeaderProps {
  /** Title to display on this header */
  activityTitle?: string;
  /** Navigation Entries to be rendered within the associated side menu for the current template */
  navigationEntries?: NavMenuElem[];
  /** Guards to warn user about a possible loss of progress when transitioning from a given route */
  navigationWarnings?: NavigationWarning[];
  /** actions that can be performed from the header at all times during the activity */
  headerActions?: HeaderAction[];
  /** languages that can be selected by the user during the activity */
  availableLanguages?: string[];
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
  /** callback to parent specifying what to do when page icon is clicked */
  onHeaderIconClicked?: () => void;
} // HeaderProps

/** Basic Header component with support for theme and localization management, as well as for in-template navigation via side menu */
export const Header = (props: HeaderProps) => {
  const {
    activityTitle = "",
    navigationEntries = [],
    navigationWarnings = [],
    headerActions = [],
    sideMenuMode = "none",
    availableLanguages = [],
    onHeaderIconClicked,
  } = props;

  const { i18n } = useTranslation("app");
  const { theme, switchTheme } = useContext(ThemeContext);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] =
    useState<boolean>(false);

  return (
    <>
      <Root>
        {navigationEntries.length > 0 ||
          (sideMenuMode !== "none" && (
            <BurgerIcon
              open={openMenu}
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          ))}

        <HeaderLogo
          src="/spice-logo.png"
          alt="application icon"
          onClick={onHeaderIconClicked}
          disabled={onHeaderIconClicked === undefined}
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
                    options={headerActions}
                    onCloseDropdown={() => setActionsDropdownOpen(false)}
                  />
                )}
              </OpenActionsDropdownButton>
            </>
          )}
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
          {availableLanguages.length > 0 && (
            <>
              <DropdownSelector
                width="3em"
                options={availableLanguages.map((lang) => ({
                  displayName: lang.toLocaleUpperCase(),
                  onOptionSelected: () => i18n.changeLanguage(lang),
                }))}
                selectedOption={i18n.language.toLocaleUpperCase()}
              />
            </>
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
