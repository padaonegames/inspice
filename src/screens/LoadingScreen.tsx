import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Spinner2 } from '@styled-icons/icomoon/Spinner2';
import { NumberLiteralType } from 'typescript';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(11, 11, 11, 0.75);
  width: 100%;
  height: 89.75vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

const SpinAnimation = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const SpinnerIcon = styled(Spinner2)`
  color: lightgray;
  height: 10vh;
  width: auto;

  animation: ${SpinAnimation} 2s linear infinite;
`;

const LoadingText = styled.div`
  margin: auto;
  font-size: 1.2em;
  font-weight: 700;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
  text-align: center;
  margin-top: 4.5vh;
`;

interface LoadingScreenProps {
  loadedAssets: number;
  totalAssets: number;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loadedAssets, totalAssets }) => {
  return (
    <Root>
      <ContentWrapper>
        <SpinnerIcon />
        <LoadingText>
          Cargando demo: {loadedAssets}/{totalAssets}.
      </LoadingText>
      </ContentWrapper>
    </Root>
  );
};

export default LoadingScreen;