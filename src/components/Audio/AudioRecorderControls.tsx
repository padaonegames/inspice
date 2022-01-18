import React from 'react';
import styled from 'styled-components';
import { PlayCircle } from '@styled-icons/boxicons-regular/PlayCircle';
import { PauseCircle } from '@styled-icons/boxicons-regular/PauseCircle';
import { SkipPreviousCircle } from '@styled-icons/boxicons-regular/SkipPreviousCircle';
import { Microphone } from '@styled-icons/fa-solid/Microphone';

const AudioRecorderControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  width: 75%;
  height: 75%;
  margin-top: 1%;
`;

const PlayButton = styled(PlayCircle)`
  color: white;
  height: 65%;
  width: auto;
  transform: scale(0.9);
  transition: transform linear 0.3s;
  align-self: center;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

const MicButton = styled(Microphone)`
  color: white;
  height: 100%;
  width: auto;
  transform: scale(0.9);
  transition: transform linear 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

const PauseButton = styled(PauseCircle)`
  color: white;
  height: 65%;
  width: auto;
  transform: scale(0.9);
  transition: transform linear 0.3s;
  align-self: center;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

const PrevButton = styled(SkipPreviousCircle)`
  color: white;
  height: 65%;
  width: auto;
  transform: scale(0.9);
  transition: transform linear 0.3s;
  align-self: center;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

interface AudioRecorderControlsProps {
  onPrevClick: () => void;
  onPlayPauseClick: (play: boolean) => void;
  onForwClick: () => void;
  isPlaying: boolean;
}

const AudioRecorderControls: React.FC<AudioRecorderControlsProps> = ({
  onForwClick, onPlayPauseClick, onPrevClick, isPlaying
}) => {

  return (
    <AudioRecorderControlsContainer>
      <PrevButton
        onClick={onPrevClick}
      />
      <MicButton />
      {isPlaying ? (
        <PauseButton
          onClick={() => onPlayPauseClick(false)}
        />
      ) : (
        <PlayButton
          onClick={() => onPlayPauseClick(true)}
        />
      )}
    </AudioRecorderControlsContainer>
  );
};

export default AudioRecorderControls;