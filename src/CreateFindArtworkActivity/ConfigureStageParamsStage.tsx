import React from 'react';
import styled from 'styled-components';
import IntegerRangeSlider from '../components/IntegerRangeSlider';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
`;


interface ConfigureStageParamsStageProps {
  onMinStagesChange: (minStages: number) => void;
  onMaxStagesChange: (maxStages: number) => void;
  onMinCluesChange: (minClues: number) => void;
  onMaxCluesChange: (maxClues: number) => void;
  initialMinStages?: number;
  initialMaxStages?: number;
  initialMinClues?: number;
  initialMaxClues?: number;
};

const ConfigureStageParamsStage: React.FC<ConfigureStageParamsStageProps> = ({
  onMinStagesChange,
  onMaxStagesChange,
  onMinCluesChange,
  onMaxCluesChange,
  initialMinStages,
  initialMaxStages,
  initialMinClues,
  initialMaxClues
}) => {

  return (
    <Root>
      <IntegerRangeSlider
        min={1}
        max={10}
        step={1}
        initialMin={2}
        initialMax={4}
        onMinValueChange={onMinStagesChange}
        onMaxValueChange={onMaxStagesChange}
      />
    </Root>
  );
}

export default ConfigureStageParamsStage;