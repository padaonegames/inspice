import styled, { css } from 'styled-components';
import { QrCode } from 'styled-icons/remix-line';
import { Home } from '@styled-icons/boxicons-regular/Home';
import { Gallery } from '@styled-icons/remix-line/Gallery';
import { Books } from '@styled-icons/icomoon/Books';
import { useLocation, useNavigate } from 'react-router-dom';

const Root = styled.div`
  position: fixed;
  background-color: ${props => props.theme.headerBackground};
  color: ${props => props.theme.textColor};
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  padding: 0;
  border-top: 1px solid #e5e5e5;
  box-sizing: inherit;
  z-index: 9001;
  oveflow-x: scroll;
`;

interface NavigationElemProps {
  selected?: boolean;
};
const NavigationElem = styled.div<NavigationElemProps>`
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.selected ? props.theme.cardBackground : props.theme.textColor};
  background-color: ${props => props.selected ? props.theme.textColor : props.theme.cardBackground};
  text-align: center;
  font-size: 0.65em;
  font-weight: ${props => props.selected ? '900' : '400'};
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  text-transform: uppercase;
  padding: 10px 5px;
  cursor: pointer;
  width: 25%;
`;

const IconStyle = css<NavigationElemProps>`
  height: 25px;
  width: 25px;
  color: ${props => props.selected ? props.theme.cardBackground : props.theme.textColor};
`;

const QrIcon = styled(QrCode)`
  ${IconStyle}
`;

const HomeIcon = styled(Home)`
  ${IconStyle}
`;

const GalleryIcon = styled(Gallery)`
  ${IconStyle}
`;

const BooksIcon = styled(Books)`
  ${IconStyle}
`;

export const NavigationFooter = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Root>
      <NavigationElem
        selected={pathname.includes('home')}
        onClick={() => navigate('home')}
      >
        <HomeIcon selected={pathname.includes('home')} />
        Home
      </NavigationElem>
      <NavigationElem
        selected={pathname.includes('collection')}
        onClick={() => navigate('collection')}
      >
        <GalleryIcon selected={pathname.includes('collection')} />
        Collection
      </NavigationElem>
      <NavigationElem
        selected={pathname.includes('scan-qr')}
        onClick={() => navigate('scan-qr')}
      >
        <QrIcon selected={pathname.includes('scan-qr')} />
        Scan QR
      </NavigationElem>
      <NavigationElem
        selected={pathname.includes('my-stories')}
        onClick={() => navigate('my-stories')}
      >
        <BooksIcon selected={pathname.includes('my-stories')} />
        My Stories
      </NavigationElem>
    </Root>
  );
}

export default NavigationFooter;