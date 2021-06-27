import React from 'react';
import styled from 'styled-components';

import { CloudUpload } from '@styled-icons/boxicons-regular/CloudUpload';
import { ClockOutline } from '@styled-icons/evaicons-outline/ClockOutline';
import { DoneAllOutline } from '@styled-icons/evaicons-outline/DoneAllOutline';
import { MapPin } from '@styled-icons/boxicons-regular/MapPin';
import { useTranslation } from 'react-i18next';

const RoadLineWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 95%;
  max-width: 1200px;
  min-width: 780px;
  height: 65px;
  margin: auto;
`;

interface StageWrapperProps {
  width: number;
};

const StageWrapper = styled.div<StageWrapperProps>`
  width: ${props => props.width}%;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  align-self: center;
`;

const LocationIcon = styled(MapPin)`
  color: white;
  height: 27px;
  width: 27px;
`;

const PendingIcon = styled(ClockOutline)`
  color: white;
  height: 27px;
  width: 27px;
`;

const DoneIcon = styled(DoneAllOutline)`
  color: white;
  height: 27px;
  width: 27px;
`;

interface StageNumberProps {
  selected: boolean;
  completed: boolean;
};

const StageNumber = styled.div<StageNumberProps>`
  border-radius: 50%;
  background-color: ${props => props.selected ? '#c44c49' : (props.completed ? '#f49997' : '#a9a9a9')};
  width: 45px;
  height: 45px;
  padding: 2px;
  text-align: center;
  margin-bottom: 7px;
  z-index: 2;
  transform: ${props => props.selected ? 'scale(1.1)' : 'scale(0.9)'};
  transition: transform 0.5s ease;

  &:hover {
    cursor: ${props => props.selected ? 'default' : 'pointer'};
    transform: ${props => props.selected ? 'scale(1.1)' : 'scale(1)'};
  }
`;

interface FlagStageProps {
  active: boolean;
};

const FlagStage = styled.div<FlagStageProps>`
  border-radius: 50%;
  background-color: ${props => props.active ? '#b7625e' : 'lightgray'};
  width: 45px;
  height: 45px;
  text-align: center;
  margin-bottom: 7px;
  z-index: 2;

  transform: ${props => props.active ? 'scale(1)' : 'scale(0.9)'};
  transition: transform 0.5s ease;
  &:hover {
    cursor: ${props => props.active ? 'pointer' : 'default'};
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(0.9)'};
  }
`;

const FlagIcon = styled(CloudUpload)`
  color: white;
  height: 27px;
  width: 27px;
  margin: auto;
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
  last: boolean;
};

const DividerLine = styled.div<DividerLineProps>`
  height: 1px;
  z-index: 0;
  width: ${props => props.width}%;
  border-top: ${props => props.active ? `3px solid ${props.last ? '#b7625e' : '#f49997'}` : '2px dotted darkgray'};
  position: absolute;
  top: 13px;
  left: 50%;
`;

interface RoadLineProps {
  currentStage: number;
  stages: { name: string, completed: boolean }[];
  onStageSelected: (index: number) => void;
  onSubmitGame: () => void;
};

const ProgressLine: React.FC<RoadLineProps> = ({ currentStage, stages, onStageSelected, onSubmitGame }) => {

  const { t } = useTranslation('app');

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
              last={index === stages.length - 1}
              width={100}
              active={index === stages.length - 1 ? stages.every(elem => elem.completed) : stage.completed}
            />
          </StageWrapper>
        );
      })}
      <StageWrapper
        width={100 / (stages.length + 1)}
        key={stages.length}
      >
        <FlagStage
          active={stages.every(elem => elem.completed)}
          onClick={() => {
            if (stages.every(elem => elem.completed)) {
              onSubmitGame();
            }
          }}
        >
          <FlagIcon />
        </FlagStage>
        <StageDescription
          selected={false}
        >
          {t('submitActivity')}
        </StageDescription>
      </StageWrapper>
    </RoadLineWrapper>
  );
}

export default ProgressLine;