import styled, { css } from 'styled-components';
import { QrCode } from 'styled-icons/remix-line';
import { Home } from '@styled-icons/boxicons-regular/Home';
import { Gallery } from '@styled-icons/remix-line/Gallery';
import { Books } from '@styled-icons/icomoon/Books';
import { NavigationComponentProps } from '../Navigation/Steps';

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

export interface NavigationFooterProps extends NavigationComponentProps {

};

export const NavigationFooter = (props: NavigationFooterProps) => {

  return (
    <Root>
      <NavigationElem
        selected={props.currentStep == 0}
        onClick={() => props.jump(0)}
      >
        <HomeIcon selected={props.currentStep == 0} />
        Home
      </NavigationElem>
      <NavigationElem
        selected={props.currentStep == 1}
        onClick={() => props.jump(1)}
      >
        <GalleryIcon selected={props.currentStep == 1} />
        Collection
      </NavigationElem>
      <NavigationElem
        selected={props.currentStep == 2}
        onClick={() => props.jump(2)}
      >
        <QrIcon selected={props.currentStep == 2} />
        Scan QR
      </NavigationElem>
      <NavigationElem
        selected={props.currentStep == 3}
        onClick={() => props.jump(3)}
      >
        <BooksIcon selected={props.currentStep == 3} />
        My Stories
      </NavigationElem>
    </Root>
  );
}

export default NavigationFooter;