import styled from "styled-components";
import { StyledIcon } from "styled-icons/types";
import { UserCircle } from "@styled-icons/boxicons-regular/UserCircle";
import { useLocation, useNavigate } from "react-router-dom";

interface RootProps {
  open: boolean;
}
const Root = styled.div<RootProps>`
  position: fixed;
  width: ${props => props.open ? 'min(80vw, 350px)' : 0};
  height: calc(100vh - 3.75em);
  top: 3.75em;
  background-color: ${props => props.theme.headerBackground};
  z-index: 99999;

  display: flex;
  flex-direction: column;

  transition: width 0s;
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
  color: ${props => props.theme.textColor};
  height: 2.5em;
  width: 2.5em;
`;

const Username = styled.div`
  font-size: 0.9em;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  margin-left: 1em;
  letter-spacing: +1px;
  color: ${props => props.theme.textColor};
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

interface NavigationElemProps {
  selected?: boolean;
};
const NavigationElem = styled.ul<NavigationElemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.selected ? 'white' : props.theme.textColor};
  background-color: ${props => props.selected ? '#c44c49' : props.theme.headerBackground};
  font-size: 0.95em;
  font-weight: ${props => props.selected ? '900' : '400'};
  letter-spacing: +1px;
  font-family: ${props => props.theme.contentFont};
  cursor: pointer;
  margin: 0.25em 0;
  padding: 0.35em 0;
  padding-left: 0.5em;
  border-radius: 5px;
`;

const IconStyle = styled.span<NavigationElemProps>`
  * {
    height: 1.75em;
    width: 1.75em;
    color: ${props => props.selected ? 'white' : props.theme.textColor};
    margin-right: 1em;
  }
`;

export interface NavMenuElem {
  /** Navigation path for sidebar option */
  to: string;
  /** Display name for sidebar option */
  title: string;
  /** Icon to be rendered next to element's title */
  icon: StyledIcon;
};

interface SideMenuProps {
  /** Whether side menu should be open */
  open?: boolean;
  /** List of navigation entries to be rendered within the menu */
  entries: NavMenuElem[];
  /** Callback to use when component is closed from an internal action */
  onClose?: () => void;
};

/**
 * Navigation menu to be rendered to the side of the screen in order to provide quick 
 * access to template links from within the app.
 */
export const SideMenu = (props: SideMenuProps): JSX.Element => {

  const {
    open = false,
    entries,
    onClose
  } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Root open={open}>
        {open &&
          (<>
            <UserWrapper>
              <UserIcon />
              <Username>Tester</Username>
            </UserWrapper>
            <NavigationList>
              {entries.map(elem => (
                <NavigationElem
                  selected={pathname.includes(elem.to)}
                  onClick={() => {
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
          </>)}
      </Root>
    </>
  );
};

export default SideMenu;