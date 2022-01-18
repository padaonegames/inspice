import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { Response } from "../services/viewpointsResponse.model";


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
  width: 70vw;
  height: 70vh;
  margin-top: 15vh;
  margin-left: 15vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background-color: ${props => props.theme.bodyBackground};
  border: solid 1px ${props => props.theme.textColor};
  z-index:5;
`;

const CloseIcon = styled(Close)`
  cursor: pointer;
  top:0;
  right : 12px;
  height: 50px;
  transform: scale(0.5);
  position: absolute;
  &:hover {
    transform: scale(0.7);
    color: darkgray;
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
  height: 15%;
  align-self: center;
  letter-spacing: +0.5px;
  font-family: Raleway;
`;

const CardsArea = styled.div`
  width: 100%;
  height: 85%;
  align-self: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  overflow-y:scroll;
  border-top: 1px solid #e5e5e5;
`;

const CardContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 0;
  background-color: ${props => props.theme.cardBackground};
  width: 42.5%;
  height: 46%;
  margin: 10px auto;
`;

const QuestionPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 42.5%;
  padding: 10px;
  font-size: 1.1em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
  background-color: rgba(15, 15, 15, 0.75);
  text-align: center;
`;

const AnswerPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 57.5%;
  padding: 10px;
  padding-left: 15px;
  font-size: 1.1em;
  font-weight: 500;
  font-style: italic;
  letter-spacing: +0.5px;
  font-family: Raleway;
  text-align: center;
  overflow-y: auto;
`;

const OptionText = styled.span`
  align-self: left;
  color: #000000;
  letter-spacing: +0.6px;
  font-size: 0.7em;
  font-weight: 1000;
  font-family: Raleway;
`;

interface ResponsesPopupProps {
  responses: Response[];
  titleText?: string;
  togglePopup?: () => void;
};

const ResponsesPopup: React.FC<ResponsesPopupProps> = ({
  responses,
  titleText = 'User responses to artwork questions',
  togglePopup = () => { },
}) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

  return ReactDOM.createPortal(
    <>
      <Background onClick={() => togglePopup()} />
      <Root>
        <TitleText>
          {titleText}
        </TitleText>
        <CloseIcon onClick={() => togglePopup()} />
        <CardsArea>
          {
            responses.sort().map((elem, _) =>
              <CardContainer
                key={elem.artworkID + '_' + elem.questionID + '_' + elem.userResponseID}
              >
                <OptionText>
                  <QuestionPanel>
                    {elem.questionAsked}
                  </QuestionPanel>
                  <AnswerPanel>
                    <p>
                      {`"${elem.response}"`}
                    </p>
                  </AnswerPanel>
                </OptionText>
              </CardContainer>
            )}
          {
            (responses.length === 0 &&
              <OptionText>No responses found</OptionText>
            )
          }
        </CardsArea>
      </Root>
    </>
    , document.body);
};

export default ResponsesPopup;