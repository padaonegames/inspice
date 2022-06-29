import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Spinner2 } from '@styled-icons/icomoon/Spinner2';
import { useState } from 'react';

const Root = styled.div`
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: absolute;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.cardBackground};
  filter: alpha(opacity=60);
  /* IE */
  -moz-opacity: 0.6;
  /* Mozilla */
  opacity: 0.6;
`;

const SpinAnimation = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const ContentContainer = styled.div`
  height: 150px;
  width: 250px;
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 125px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: ${props => props.theme.textColor};
`;

const SpinnerIcon = styled(Spinner2)`
  height: 4em;
  width: auto;
  align-self: center;

  animation: ${SpinAnimation} 2s linear infinite;
`;

const LoadingText = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: 1em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  text-align: middle;
  align-self: center;
`;

export interface LoadingOverlayProps {
  /** Message to be display. */
  message?: string;
};

/** Component to display a loading message while performing API calls */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading' }) => {

  const [numDots, setNumdots] = useState<number>(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumdots(prev => Math.max((prev + 1) % 4, 1));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Root>
      <Background />
      <ContentContainer>
        <SpinnerIcon />
        <LoadingText>{message + '.'.repeat(numDots)}</LoadingText>
      </ContentContainer>
    </Root>
  );
};

export default LoadingOverlay;