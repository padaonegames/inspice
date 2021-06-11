import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Spinner2 } from '@styled-icons/icomoon/Spinner2';

const Root = styled.div`
  top: 0;
  left: 0;
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
  height: 100px;
  width: 75px;
  position: absolute;
  top: 7.5%;
  left: 45%;
`;

const SpinnerIcon = styled(Spinner2)`
  color: white;
  height: 65px;
  width: auto;

  animation: ${SpinAnimation} 2s linear infinite;
`;

const LoadingText = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 35px;
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: white;
  text-align: center;
`;

const LoadingOverlay: React.FC = () => {

  return (
    <Root>
      <ContentContainer>
        <SpinnerIcon />
        <LoadingText>Loading...</LoadingText>
      </ContentContainer>
    </Root>
  );
};

export default LoadingOverlay;