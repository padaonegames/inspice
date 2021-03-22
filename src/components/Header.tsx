import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  justify-content: left;
  align-content: center;
  display: flex;
  flex-direction: row;
  top: 0;
  width: 100%;
  height: auto;
  padding-left: 1.5vw;
  padding-top: 3vh;
  border-style: solid;
  border-color: lightgrey;
  border-width: 0px 0px 1px 0px;
`;

const AppName = styled.p`
  font-size: 1.2em;
  letter-spacing: +2px;
  font-family: 'Anonymous Pro';
`;

const Header: React.FC = () => {

  return (
    <Root>
      <AppName>MUSEO DEL PRADO</AppName>
    </Root>
  );
}

export default Header;