import styled from "styled-components";
import { StyledIcon } from "styled-icons/types";
import { UserCircle } from "@styled-icons/boxicons-regular/UserCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { PowerOff } from "@styled-icons/boxicons-regular/PowerOff";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCurrentUser,
  setCredentials,
} from "../../store/features/auth/authSlice";
import React from "react";
import {
  selectSessionName,
  selectSessionUsername,
  setSession,
} from "../../store/features/session/sessionSlice";

interface RootProps {
  open: boolean;
}
const Root = styled.div<RootProps>`
  position: fixed;
  width: ${(props) => (props.open ? "min(80vw, 350px)" : 0)};
  height: calc(100vh - 3.75em);
  top: 3.75em;
  background-color: ${(props) => props.theme.headerBackground};
  z-index: 99999;

  display: flex;
  flex-direction: column;

  transition: width 0s;

  box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
`;

const UserWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;

  padding: 0.75em 1em;
  border-bottom: dotted 1px lightgray;
`;

const UserIcon = styled(UserCircle)`
  color: ${(props) => props.theme.textColor};
  height: 2.5em;
  width: 2.5em;
`;

const Username = styled.div`
  font-size: 0.9em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  margin-left: 1em;
  letter-spacing: +1px;
  color: ${(props) => props.theme.textColor};
`;

const NavigationList = styled.li`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: left;

  margin-top: 0.35em;
  padding: 0.75em;

  border-bottom: dotted 1px lightgray;
  border-top: dotted 1px lightgray;
`;

const IconStyle = styled.span<NavigationElemProps>`
  * {
    height: 1.75em;
    width: 1.75em;
    color: ${(props) => (props.selected ? "white" : props.theme.textColor)};
    margin-right: 1em;
  }
`;

interface NavigationElemProps {
  selected?: boolean;
}
const NavigationElem = styled.ul<NavigationElemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => (props.selected ? "white" : props.theme.textColor)};
  background-color: ${(props) =>
    props.selected ? "#c44c49" : props.theme.headerBackground};
  font-size: 0.95em;
  font-weight: ${(props) => (props.selected ? "900" : "400")};
  letter-spacing: +1px;
  font-family: ${(props) => props.theme.contentFont};
  cursor: pointer;
  margin: 0.25em 0;
  padding: 0.35em 0;
  padding-left: 0.5em;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) =>
      `hsl(5, 80%, ${props.theme.textReadableLuminosity}%)`};
    color: white;
  }

  &:hover ${IconStyle} {
    * {
      color: white;
    }
  }
`;

export interface NavigationWarning {
  /** What route we are navigating from */
  from: string;
  /** Text that will be shown to the user when attempting to navigate away from given route */
  warningText: string;
} // NavigationWarning

export interface NavMenuElem {
  /** Navigation path for sidebar option */
  to: string;
  /** Display name for sidebar option */
  title: string;
  /** Icon to be rendered next to element's title */
  icon: StyledIcon;
} // NavMenuElem

interface SideMenuProps {
  /** Whether side menu should be open */
  open?: boolean;
  /** List of navigation entries to be rendered within the menu */
  entries: NavMenuElem[];
  /** Guards to warn user about a possible loss of progress when transitioning from a given route */
  navigationWarnings?: NavigationWarning[];
  /**
   * What sort of user management should be done from this side menu.
   * Three modes are currently supported:
   * + `none`: no user nor user handling methods will be displayed.
   * + `session-user`: assuming we are within the context of a `SessionAuthStore`, current username and session will be displayed
   * as well as the option to log out of the session.
   * + `system-user`: assuming we are within the context of an `AuthStore`, current username will be displayed, as well as the option
   * to perform a logout action.
   */
  sideMenuMode?: "none" | "session-user" | "system-user";
  /** Callback to use when component is closed from an internal action */
  onClose?: () => void;
}

/**
 * Navigation menu to be rendered to the side of the screen in order to provide quick
 * access to template links from within the app.
 */
export const SideMenu = (props: SideMenuProps): JSX.Element => {
  const {
    open = false,
    entries,
    navigationWarnings = [],
    onClose,
    sideMenuMode = "none",
  } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const username = useAppSelector(selectSessionUsername);
  const sessionName = useAppSelector(selectSessionName);
  const userData = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const performLogout = () => {
    if (sideMenuMode === "system-user") {
      // Logout from auth context
      dispatch(setCredentials({ userData: undefined, accessToken: undefined }));
    } else if (sideMenuMode === "session-user") {
      // Logout from session auth context
      dispatch(
        setSession({
          username: undefined,
          sessionName: undefined,
          activityId: undefined,
        })
      );
    }
  }; // performLogout

  let renderedUsername = "";
  let shouldRenderLogout = false;

  if (sideMenuMode === "none") {
    renderedUsername = "";
  } else if (sideMenuMode === "session-user") {
    if (username && sessionName) {
      renderedUsername = `${sessionName} [${username}]`;
      shouldRenderLogout = true;
    } else renderedUsername = "Not logged in";
  } else if (sideMenuMode === "system-user") {
    if (userData) {
      renderedUsername = userData.username;
      shouldRenderLogout = true;
    } else renderedUsername = "Not logged in";
  }

  const shouldRenderUser =
    sideMenuMode === "session-user" || sideMenuMode === "system-user";

  return (
    <>
      <Root open={open}>
        {open && (
          <>
            {shouldRenderUser && (
              <UserWrapper>
                <UserIcon />
                <Username>{renderedUsername}</Username>
              </UserWrapper>
            )}
            <NavigationList>
              {entries.map((elem) => (
                <NavigationElem
                  key={elem.title}
                  selected={pathname.includes(elem.to)}
                  onClick={() => {
                    // don't do anything if we are already at the destination
                    // if (pathname.includes(elem.to)) return;

                    // before actually navigating to the new route, check whether there exists
                    // a route warning. If there is one, render a window confirmation prompt to
                    // warn the user about their progress being possibly lost before transitioning.
                    const warning = navigationWarnings.find((w) =>
                      pathname.includes(w.from)
                    );

                    if (warning !== undefined) {
                      const reallyClose = window.confirm(warning.warningText);
                      if (!reallyClose) return;
                    }

                    if (onClose) {
                      onClose();
                    }
                    navigate(elem.to);
                  }}
                >
                  <IconStyle selected={pathname.includes(elem.to)}>
                    <elem.icon />
                  </IconStyle>
                  {elem.title}
                </NavigationElem>
              ))}
            </NavigationList>

            {shouldRenderLogout && (
              <NavigationList>
                <NavigationElem selected={false} onClick={performLogout}>
                  <IconStyle selected={false}>
                    <PowerOff />
                  </IconStyle>
                  Sign out
                </NavigationElem>
              </NavigationList>
            )}
          </>
        )}
      </Root>
    </>
  );
}; // SideMenu

export default SideMenu;
