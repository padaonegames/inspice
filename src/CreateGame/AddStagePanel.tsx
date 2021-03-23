import React from 'react';
import styled from 'styled-components';

import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle';

const AddStageIcon = styled(PlusCircle)`
  color: black;
  height: 5vh;
  weight: 5vh;
  align-self: center;
  margin-bottom: 4.5%;
`;

const AddStageText = styled.p`
  font-size: 0.7em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
`;

const AddStageCorner = styled.div`
  width: 12.5%;
  height: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: transform ease 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1);
    transition: transform ease 0.5s;
  }
`;

interface AddStagePanelProps {
  onButtonClicked: () => void;
};

const AddStagePanel: React.FC<AddStagePanelProps> = ({ onButtonClicked }) => {

  return (
    <AddStageCorner
      onClick={onButtonClicked}
    >
      <AddStageIcon/>
      <AddStageText>
        NUEVA ETAPA  
      </AddStageText>      
    </AddStageCorner>
  );
}

export default AddStagePanel;