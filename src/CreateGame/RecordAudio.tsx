import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Microphone } from '@styled-icons/fa-solid/Microphone';

import NextCornerButton from './NextCornerButton';
import useRecorder from './useRecorder';

interface RootProps {
  backgroundImage: string;
};

const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 76.2vh;

  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: 115% auto;
  background-position: 15% 15%;
  overflow: hidden;
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
  margin-bottom: 2.5vh;
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

  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  useEffect(() => {
    if (audioURL) {
      onRecordingReady(audioURL);
    }
  }, [audioURL]);

  const canAdvance = audioURL !== undefined && !isRecording;

  return (
    <Root
      backgroundImage={imageSrc}
    >
      <ReferencePanel>
        <QuestionWrapper>
          <Question>
            Graba el audio a reproducir tras encontrar la obra
        </Question>
        </QuestionWrapper>

        <audio src={audioURL} controls />
        <button onClick={startRecording} disabled={isRecording}>
          start recording
      </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
        >
          stop recording
      </button>

        <ControlsWrapper>
          <NextCornerButton
            type='previous'
            text='RETROCEDER'
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