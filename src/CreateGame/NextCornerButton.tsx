import React from 'react';
import styled from 'styled-components';

import { NextPlan } from '@styled-icons/material-outlined/NextPlan';

const NextCornerIcon = styled(NextPlan)`
  color: #F8F8F8;
  height: 7.5vh;
  align-self: center;
  margin-bottom: 1vh;
`;

const NextCornerText = styled.p`
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: Raleway;
  color: #F8F8F8;
`;

const NextCorner = styled.div`
  width: 10vw;
  height: auto;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: transform linear 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform linear 0.3s;
  }
`;

interface NextCornerButtonProps {
  onNextClicked: () => void;
};

const NextCornerButton: React.FC<NextCornerButtonProps> = ({ onNextClicked }) => {

  return (
    <NextCorner
      onClick={onNextClicked}
    >
      <NextCornerIcon />
      <NextCornerText>
        CONTINUAR
      </NextCornerText>
    </NextCorner>
  );
}

export default NextCornerButton;