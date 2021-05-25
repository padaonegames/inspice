import React from 'react';
import styled from 'styled-components';

import { FlagOutline } from '@styled-icons/evaicons-outline/FlagOutline';
import { ClockOutline } from '@styled-icons/evaicons-outline/ClockOutline';
import { DoneAllOutline } from '@styled-icons/evaicons-outline/DoneAllOutline';
import { MapPin } from '@styled-icons/boxicons-regular/MapPin';
import { useTranslation } from 'react-i18next';

const RoadLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 75%;
  height: 10vh;
  margin: auto;
`;

interface StageWrapperProps {
  width: number;
};

const StageWrapper = styled.div<StageWrapperProps>`
  width: ${props => props.width}%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: auto;
`;

const LocationIcon = styled(MapPin)`
  color: white;
  height: 3.5vh;
  width: 3.5vh;
`;

const PendingIcon = styled(ClockOutline)`
  color: white;
  height: 3.5vh;
  width: 3.5vh;
`;

const DoneIcon = styled(DoneAllOutline)`
  color: white;
  height: 3.5vh;
  width: 3.5vh;
`;

interface StageNumberProps {
  selected: boolean;
  completed: boolean;
};

const StageNumber = styled.div<StageNumberProps>`
  border-radius: 50%;
  background-color: ${props => props.completed ? '#f49997' : 'darkgray'};
  width: 5.5vh;
  height: 5.5vh;
  padding: 3px;
  text-align: center;
  margin-bottom: 2.5%;
  z-index: 2;
  transform: ${props => props.selected ? 'scale(1.1)' : 'scale(0.9)'};
  transition: transform 0.5s ease;

  &:hover {
    cursor: ${props => props.selected ? 'default' : 'pointer'};
    transform: ${props => props.selected ? 'scale(1.1)' : 'scale(1)'};
  }
`;

const FlagStage = styled.div`
  border-radius: 50%;
  background-color: #b7625e;
  width: 6vh;
  height: 6vh;
  padding: 3px;
  text-align: center;
  margin-bottom: 2.5%;
  z-index: 2;
`;

const FlagIcon = styled(FlagOutline)`
  color: white;
  height: 4vh;
  width: 4vh;
`;

interface StageDescriptionProps {
  selected: boolean;
};

const StageDescription = styled.div<StageDescriptionProps>`
  font-size: ${props => props.selected ? '0.675em' : '0.6em'};
  font-weight: 400;
  letter-spacing: +1px;
  font-family: 'EB Garamond';
  align-self: center;
  margin-top: 0;
`;

interface DividerLineProps {
  width: number;
  active: boolean;
};

const DividerLine = styled.div<DividerLineProps>`
  height: ${props => props.active ? '1.5px' : '1px'};
  z-index: 0;
  width: ${props => props.width}%;
  background-color: ${props => props.active ? '#f49997' : 'darkgray'};
  position: absolute;
  top: 7.5%;
  left: 50%
`;

interface RoadLineProps {
  currentStage: number;
  stages: { name: string, completed: boolean }[];
  onStageSelected: (index: number) => void;
};

const ProgressLine: React.FC<RoadLineProps> = ({ currentStage, stages, onStageSelected }) => {

  const { t, i18n } = useTranslation('app');
  
  return (
    <RoadLineWrapper>
      {stages.map((stage, index) => {
        return (
          <StageWrapper
            width={100 / (stages.length + 1)}
            key={index}
          >
            <StageNumber
              selected={index === currentStage}
              completed={stage.completed}
              onClick={() => onStageSelected(index)}
            >
              {index === currentStage ? <LocationIcon /> : (
                stage.completed ? <DoneIcon /> : <PendingIcon />
              )}
            </StageNumber>
            <StageDescription
              selected={index === currentStage}
            >
              {stage.name}
            </StageDescription>
            <DividerLine
              width={100}
              active={stage.completed}
            />
          </StageWrapper>
        );
      })}
      <StageWrapper
        width={100 / (stages.length + 1)}
        key={stages.length}
      >
        <FlagStage>
          <FlagIcon />
        </FlagStage>
        <StageDescription
          selected={false}
        >
          {t('endPhase')}
        </StageDescription>
      </StageWrapper>
    </RoadLineWrapper>
  );
}

export default ProgressLine;