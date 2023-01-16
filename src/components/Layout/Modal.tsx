import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: transparent;
`;

export type Props = {
  modalOpen: boolean;
  children?: React.ReactNode;
};

export const Modal = ({ modalOpen, children }: Props): JSX.Element => {
  if (!modalOpen) return <></>;

  return createPortal(
    <Wrapper>
      <div>{children}</div>
    </Wrapper>,
    document.body
  );
};

export default Modal;
