import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';

import NextCornerButton from './NextCornerButton';
import useRecorder from './useRecorder';

import { Microphone } from '@styled-icons/fa-solid/Microphone';
import { StopCircle } from '@styled-icons/boxicons-regular/StopCircle';

interface RootProps {
  backgroundImage: string;
};

const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 76.2vh;
  background-image: ${props => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 90%;
`;

const ReferencePanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(11, 11, 11, 0.85);
  margin: auto;
  width: 55%;
  height: 100%;
  padding: 1.5%;
  padding-top: 3%;
  justify-content: center;
  align-content: center;
`;

const QuestionWrapper = styled.div`
  align-self: center;
  text-align: center;
  width: 70%;
  height: auto;
  margin-bottom: 5.5vh;
  margin-top: 5.5vh;
`;

const Question = styled.p`
  font-size: 1em;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2.5%;
  padding-right: 2.5%;
  padding-bottom: 2.5%;
  width: 100%;
  height: auto;
  margin: auto;
`;

const AudioPanel = styled.audio`
  margin-top: 5vh;
  width: 65%;
  align-self: center;
`;

const MicWrapper = styled.div`
  border: solid 0.75vh white;
  border-radius: 50%;

  height: 12.5vh;
  width: 12.5vh;
  text-align: center;
  padding: 1vh;

  align-self: center;

  transform: scale(0.9);
  transition: transform linear 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

const MicButton = styled(Microphone)`
  color: white;
  height: 9vh;
  width: 9vh;
`;

const StopAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
`;

const StopButton = styled(StopCircle)`
  color: white;
  height: 12.5vh;
  width: auto;
  transform: scale(0.9);
  animation: ${StopAnimation} 2s ease infinite;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

interface RecordAudioProps {
  imageSrc: string;
  canClickNext: boolean;
  onRecordingReady: (recordingSrc: string) => void;
  onNextClicked: () => void;
  onBackClicked: () => void;
};

const RecordAudio: React.FC<RecordAudioProps> = ({
  imageSrc,
  onRecordingReady,
  canClickNext,
  onBackClicked,
  onNextClicked
}) => {

  const { t } = useTranslation('app');
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  useEffect(() => {
    if (audioURL) {
      onRecordingReady(audioURL);
    }
  }, [audioURL, onRecordingReady]);

  const canAdvance = audioURL !== undefined && !isRecording;

  return (
    <Root
      backgroundImage={imageSrc}
    >
      <ReferencePanel>
        <QuestionWrapper>
          <Question>
            {t('recordAudio')}
          </Question>
        </QuestionWrapper>

        {isRecording ?
          <StopButton onClick={stopRecording} /> :
          <MicWrapper>
            <MicButton onClick={startRecording} />
          </MicWrapper>
        }
        <AudioPanel src={audioURL} controls />

        <ControlsWrapper>
          <NextCornerButton
            type='previous'
            size='small'
            fontSize='0.65em'
            alignSelf='flex-start'
            margin='0'
            onNextClicked={onBackClicked}
          />
          {canClickNext &&
            <NextCornerButton
              size='small'
              fontSize='0.65em'
              alignSelf='flex-end'
              margin='0'
              active={canAdvance}
              onNextClicked={() => {
                if (canAdvance) {
                  onNextClicked();
                }
              }}
            />
          }
        </ControlsWrapper>
      </ReferencePanel>
    </Root>
  );
}

export default RecordAudio;