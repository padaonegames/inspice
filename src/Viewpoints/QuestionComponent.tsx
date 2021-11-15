import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Artwork } from '../services/viewpointsArtwork.model';
import { Loop } from '@styled-icons/material/Loop';
import { useAsyncRequest } from '../services/useAsyncRequest';
import { viewpointsQuestionsService, viewpointsResponseService } from '../services';
import { Response } from '../services/viewpointsResponse.model';
import { Question } from '../services/viewpointsQuestion.model';
import { ApiResult } from '../services/viewpointsQuestions.service';
import { LoaderCircle } from '@styled-icons/boxicons-regular/LoaderCircle';
import Alert from '../components/Layout/Alert';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.cardBackground};

  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 16px;
  width: 85%;
  max-width: 1200px;
  justify-content: left;
  align-items: left;
  margin-bottom: 15px;
  padding: 0;
`;

const SelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 1.5%;
  padding-top: 3%;
`;

const ArtworkListDottedLine = styled.div`
  height: 0.5vh;
  width: 100%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-bottom: 2.5%;
`;

const QuestionHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const QuestionTitle = styled.p`
  font-size: 1.25em;
  font-weight: 500;
  font-style: italic;
  letter-spacing: +0.5px;
  font-family: Raleway;
  margin-bottom: 0;
`;

const AnotherQuestionIcon = styled(Loop)`
  height: 25px;
  width: auto;
  margin-left: 20px;
  margin-bottom: 0;
  margin-right: 5px;
`;

const AnotherQuestionText = styled.p`
  font-size: 0.9em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  margin-bottom: 0;
  text-decoration: underline;
  cursor: pointer;
`;

const QuestionText = styled.p`
  font-weight: 700;
  font-style: italic;
  text-align: center;
  letter-spacing: +0.5px;
  margin-bottom: 10px;
`;

const QuestionAnswerPrompt = styled.p`
  letter-spacing: +0.5px;
`;

const TextArea = styled.textarea`
  resize: none;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const SubmitResponseButton = styled.div`
  font-weight: 400;
  font-family: ${props => props.theme.contentFont};
  font-size: ${props => props.theme.contentFontSize};
  color: ${props => props.theme.clickableTextFontColor};
  margin: 15px auto;
  text-decoration: underline;
  cursor: pointer;
`;

const ResponseSubmittingIndicator = styled.div`
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 220px;
  font-size: 1em;
  align-items: center;
  letter-spacing: +0.5px;
`;

const SpinAnimation = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const LoadingIcon = styled(LoaderCircle)`
  height: 35px;
  width: auto;

  animation: ${SpinAnimation} 2s linear infinite;
`;


interface QuestionComponentProps {
  artwork: Artwork;
};

const defaultResponse: Response = {
  questionID: '',
  questionAsked: '',
  artworkID: '',
  response: '',
  datetimeSubmitted: new Date(),
  userResponseID: ''
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({ artwork }) => {

  const [userResponseID, setUserResponseID] = useState<string>('');
  const [responseSubmitting, setResponseSubmitting] = useState<boolean>(false);
  const [responseSubmitted, setResponseSubmitted] = useState<boolean>(false);

  const [triggerQuestions, setTriggerQuestions] = useState<boolean>(false);
  const [triggerUserResponseID, setTriggerUserResponseID] = useState<boolean>(false);
  const [triggerSaveUserResponse, setTriggerSaveUserResponse] = useState<boolean>(false);

  const [response, setResponse] = useState<Response>(defaultResponse);
  const [question, setQuestion] = useState<Question | undefined>(undefined);

  const fetchQuestions = () => {
    if (triggerQuestions) return viewpointsQuestionsService.fetchQuestions();
    else return new Promise<ApiResult<Question[]>>((resolve, reject) => reject());
  };

  const fetchUserResponseID = () => {
    if (!triggerUserResponseID) {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
    else {
      return new Promise((resolve, reject) => {
        resolve(viewpointsResponseService.generateUserResponseID(10));
      });
    }
  };

  const saveUserResponse = () => {
    if (!triggerSaveUserResponse) {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
    else {
      return viewpointsResponseService.saveResponse(response);
    }
  };

  const [fetchQuestionsStatus] = useAsyncRequest(fetchQuestions, [triggerQuestions]);
  const [fetchUserResponseIdStatus] = useAsyncRequest(fetchUserResponseID, [triggerUserResponseID]);
  const [saveUserResponseStatus] = useAsyncRequest(saveUserResponse, [triggerSaveUserResponse]);

  useEffect(() => {
    getUserResponseID();
    getAllQuestions();
  }, []);

  const saveResponse = () => {
    if (!question) return;

    setResponseSubmitting(true);

    const resp: Response = {
      response: response.response,
      questionID: question._id,
      questionAsked: question.question,
      artworkID: artwork._id,
      datetimeSubmitted: new Date(),
      userResponseID: userResponseID,
    };
    setResponse(resp);
    setTriggerSaveUserResponse(true);
  }

  useEffect(() => {
    if (saveUserResponseStatus.kind === 'success') {
      setTriggerSaveUserResponse(false);
      setResponse(defaultResponse);
      setResponseSubmitting(false);
      setResponseSubmitted(true);
    }
  }, [saveUserResponseStatus]);

  const getQuestion = () => {
    if (fetchQuestionsStatus.kind !== 'success' || fetchQuestionsStatus.result.kind !== 'ok') return;

    setResponseSubmitting(false);
    const randomID = Math.floor(Math.random() * fetchQuestionsStatus.result.data.length);
    setQuestion(fetchQuestionsStatus.result.data[randomID]);
    setResponse(defaultResponse);
    setResponseSubmitted(false);
  };

  const getAllQuestions = () => {
    setResponseSubmitting(false);
    setTriggerQuestions(true);
  };

  useEffect(() => {
    if (fetchQuestionsStatus.kind === 'success' && fetchQuestionsStatus.result.kind === 'ok') {
      getQuestion();
      setResponse(defaultResponse);
      setResponseSubmitted(false);
    }
  }, [fetchQuestionsStatus]);

  const getUserResponseID = () => {
    if (localStorage.userResponseID) {
      setUserResponseID(localStorage.userResponseID);
    }
    else {
      const responseID = viewpointsResponseService.generateUserResponseID(32)
      setUserResponseID(responseID);
      localStorage.userResponseID = responseID;
    }
  };

  return (
    <Root>
      <SelectionPanel>
        <QuestionHead>
          <QuestionTitle>
            Question
          </QuestionTitle>
          <AnotherQuestionIcon />
          <AnotherQuestionText onClick={getQuestion}>
            Another Question
          </AnotherQuestionText>
        </QuestionHead>
        {question && <QuestionText>
          {question.question}
        </QuestionText>}
        <ArtworkListDottedLine />
        <QuestionAnswerPrompt>
          Your answer:
        </QuestionAnswerPrompt>
        <TextArea rows={6}></TextArea>
        {responseSubmitted &&
          <Alert onClose={() => setResponseSubmitted(false)}>
            Thank you for sharing your view! Your response will appear shortly. All responses are pre-moderated before appearing on the site.
          </Alert>
        }
        {!responseSubmitting && !responseSubmitted &&
          <SubmitResponseButton onClick={saveResponse}>
            Submit your response
          </SubmitResponseButton>}
        {responseSubmitting &&
          <ResponseSubmittingIndicator>
            Submitting response...
            <LoadingIcon />
          </ResponseSubmittingIndicator>
        }
      </SelectionPanel>
    </Root>

  );
};

export default QuestionComponent;