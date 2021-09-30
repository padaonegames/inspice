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
  background-color: rgb(255, 253, 253);
  z-index:5;
`;

const CloseIcon = styled(Close)`
  color: lightgray;
  cursor: pointer;
  top:0;
  height: 7.5vh;
  align-self: flex-end;
  margin-bottom: 1vh;
  transform: scale(0.7);
  //transition: transform 0.5s ease;
  position: absolute;
  &:hover {
    //transform: scale(1.1);
    //transition: transform 0.5s ease;
    color: darkgray;
  }
`;

const TitleText = styled.h2`
  margin-top :1rem;
  align-self: center;
  color: #3f3c2d;
  letter-spacing: +0.5px;
  font-family: Raleway;
`;

const CardsArea = styled.div`
  width: 100%;
  height: 75%;
  align-self: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  padding: 1rem;
  overflow-y:scroll;
  border-top: 1px solid black;
`;

const CardContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 0;
  background-color: white;
  width: 42.5%;
  height: 47.5%;
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
                    {`"${elem.response}"`}
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