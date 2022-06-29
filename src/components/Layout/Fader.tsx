import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  to {
    opacity: 0;
  }
  from {
    opacity: 1;
  }
`;

interface FaderContainerProps {
  /** A boolean to decide whether the content should be shown or not. */
  show: boolean;
  /** Value which indicates how long will take for the content to fade away. Value in seconds. */
  transitionTime: number;
};

const FaderContainer = styled.div<FaderContainerProps>`
  animation: ${props => props.show ? fadeIn : fadeOut} ${props => props.transitionTime}s ease;
`;

export interface FaderProps {
  show: boolean;
  transitionTime: number;
  onAnimationCompleted?: () => void;
};

export const Fader: React.FC<FaderProps> = ({ show, transitionTime, onAnimationCompleted, children }) => {

  const [shouldRender, setShouldRender] = useState<boolean>(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    }
  }, [show]);

  const onAnimationEnd = (e: any) => {
    if (e.elapsedTime < transitionTime) return;
    console.log(e);
    if (!show) {
      setShouldRender(false);
      if (onAnimationCompleted) onAnimationCompleted();
    }
  };

  return (
    shouldRender ? (
      <FaderContainer
        transitionTime={transitionTime}
        show={show}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </FaderContainer>
    ) : null
  );
}

export default Fader;