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
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
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
  text-align: center;
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 125px);
`;

const SpinnerIcon = styled(Spinner2)`
  color: white;
  height: 65px;
  width: auto;
  align-self: center;

  animation: ${SpinAnimation} 2s linear infinite;
`;

const LoadingText = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 85px;
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
  text-align: center;
  align-self: center;
`;

interface LoadingOverlayProps {
  message?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading' }) => {

  const [numDots, setNumdots] = useState<number>(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumdots(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Root>
      <ContentContainer>
        <SpinnerIcon />
        <LoadingText>{message + '.'.repeat(numDots)}</LoadingText>
      </ContentContainer>
    </Root>
  );
};

export default LoadingOverlay;