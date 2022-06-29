import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { SupportedActivity } from "../../../services/activity.model";
import { Close } from '@styled-icons/evaicons-solid/Close';
import { TreasureMap } from '@styled-icons/remix-line/TreasureMap';
import { PhoneTablet } from '@styled-icons/fluentui-system-regular/PhoneTablet';

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
`;

const Root = styled.div`
  width: 45vw;
  height: 40vh;
  margin-top: 25vh;
  margin-left: 27.5vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background-color: ${props => props.theme.bodyBackground};
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  // border: solid 1px ${props => props.theme.textColor};
  z-index:5;
`;

const CloseIcon = styled(Close)`
  cursor: pointer;
  top: 1%;
  right : 12px;
  height: 50px;
  transform: scale(0.5);
  position: absolute;
  color: ${props => props.theme.textColor};
  &:hover {
    transform: scale(0.7);
  }
`;

const TitleText = styled.div`
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.theme.headerBackground};
  text-align: center;
  color: ${props => props.theme.textColor};
  width: 100%;
  height: 25%;
  align-self: center;
  letter-spacing: +0.5px;
  font-family: Raleway;
  font-size: 1.05rem;
  border-radius: 25px 25px 0 0;
`;

const TemplateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  -moz-box-pack: center;
  justify-content: space-evenly;
  align-content: center;
  padding: 1rem 0;
`;

const templateIconStyle = css`
  color: ${props => props.theme.textColor};
  height: 50px;
  width: 50px;
  margin-bottom: 10px;
`;

const TreasureHuntIcon = styled(TreasureMap)`
  ${templateIconStyle}
`;

const GamGameIcon = styled(PhoneTablet)`
  ${templateIconStyle}
`;

const TemplateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  background-color: ${props => props.theme.cardBackground};
  padding: 5px 10px;
  height: 8.5vw;
  width: 8.5vw;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
`;

const TemplateText = styled.span`
  text-align: center;
  color: ${props => props.theme.textColor};
  letter-spacing: +0.5px;
  font-family: Raleway;
  font-size: 0.85rem;
`;

export interface NewActivityPopupProps {
  /** Callback to notify the parent which template has been selected. */
  onTemplateSelected?: (template: SupportedActivity) => void;
  /** Callback to notify the parent if the user has closed the pop-up. */
  onPopupClose?: () => void;
};

export const NewActivityPopup = (props: NewActivityPopupProps): JSX.Element => {

  const {
    onPopupClose,
    onTemplateSelected
  } = props;

  const handleTemplateSelected = (template: SupportedActivity) => {
    if (onTemplateSelected) {
      onTemplateSelected(template);
    }
  };

  return ReactDOM.createPortal(
    <>
      <Background onClick={onPopupClose} />
      <Root>
        <TitleText>
          Choose a template for your activity
        </TitleText>
        <TemplateContainer>
          <TemplateBox onClick={() => handleTemplateSelected('Treasure Hunt')}>
            <TreasureHuntIcon />
            <TemplateText>
              Treasure Hunt
            </TemplateText>
          </TemplateBox>
          <TemplateBox onClick={() => handleTemplateSelected('GAM Game')}>
            <GamGameIcon />
            <TemplateText>
              GAM Game
            </TemplateText>
          </TemplateBox>
        </TemplateContainer>
        <CloseIcon onClick={onPopupClose} />
      </Root>
    </>,
    document.body);
};

export default NewActivityPopup;