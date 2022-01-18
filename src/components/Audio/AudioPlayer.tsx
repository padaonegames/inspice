import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AudioControls from './AudioControls';

const AudioPlayerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  height: 55%;
  width: 60%;
`;

const ProgressBar = styled.input`
  height: 2.5%;
  align-self: center;
	-webkit-appearance: none;
	width: 80%;
	border-radius: 15px;
	background: smokewhite;
	transition: background 0.2s ease;
  margin-top: 5%;
	cursor: pointer;
`;

interface AudioPlayerProps {
  src: string; // Reference to audio file to play
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);

  // Refs
  const audioRef = useRef(new Audio(src));
  const intervalRef = useRef<number>();
  // const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearTimeout(intervalRef.current);
    }
  }, []);

  const handleResetAudio = () => {
    setPlaybackProgress(0);
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
  };

  const handleForwClick = () => {
    audioRef.current.currentTime = Math.min(duration, playbackProgress + 5);
    setPlaybackProgress(audioRef.current.currentTime);
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (audioRef.current.ended) {
        setIsPlaying(false);
      } else {
        setPlaybackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: string) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = parseInt(value, 10);
    setPlaybackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const currentPercentage = duration ? `${(playbackProgress / duration) * 100}%` : '0%';
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  return (
    <AudioPlayerContainer>
      <AudioControls
        isPlaying={isPlaying}
        onPlayPauseClick={setIsPlaying}
        onPrevClick={handleResetAudio}
        onForwClick={handleForwClick}
      />
      <ProgressBar
        type='range'
        value={playbackProgress}
        step='1'
        min='1'
        max={duration ? duration : `${duration}`}
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;