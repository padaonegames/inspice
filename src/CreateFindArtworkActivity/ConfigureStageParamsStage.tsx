import React from 'react';
import styled from 'styled-components';
import CheckBoxGroupInput from '../components/CheckBoxGroupInput';
import IntegerRangeInputFieldWithTag from '../components/IntegerRangeInputFieldWithTag';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
`;

interface VerticalSeparatorProps {
  size: number;
};

const VerticalSeparator = styled.div<VerticalSeparatorProps>`
  height: ${props => props.size}vh;
`;

interface ConfigureStageParamsStageProps {
  onMinStagesChange: (minStages: number) => void;
  onMaxStagesChange: (maxStages: number) => void;
  onMinCluesChange: (minClues: number) => void;
  onMaxCluesChange: (maxClues: number) => void;
  onInputTypeToggle: (label: string) => void;
  initialMinStages?: number;
  initialMaxStages?: number;
  initialMinClues?: number;
  initialMaxClues?: number;
  initialAllowedInputTypes?: string[];
};

const ConfigureStageParamsStage: React.FC<ConfigureStageParamsStageProps> = ({
  onMinStagesChange,
  onMaxStagesChange,
  onMinCluesChange,
  onMaxCluesChange,
  onInputTypeToggle,
  initialMinStages = 1,
  initialMaxStages = 5,
  initialMinClues = 1,
  initialMaxClues = 5,
  initialAllowedInputTypes = [],
}) => {

  return (
    <Root>
      <IntegerRangeInputFieldWithTag
        min={1}
        max={10}
        step={1}
        initialMin={initialMinStages}
        initialMax={initialMaxStages}
        onMinValueChange={onMinStagesChange}
        onMaxValueChange={onMaxStagesChange}
        fieldText='Select the number of stages (range) that visitors will be able to add to their treasure hunts:'
      />
      <VerticalSeparator size={4} />
      <IntegerRangeInputFieldWithTag
        min={1}
        max={10}
        step={1}
        initialMin={initialMinClues}
        initialMax={initialMaxClues}
        onMinValueChange={onMinCluesChange}
        onMaxValueChange={onMaxCluesChange}
        fieldText='Select the number of clues (range) that visitors will be able to add to their stages:'
      />
      <VerticalSeparator size={6} />
      <CheckBoxGroupInput
        fieldText='Select the types of inputs that the users will be able to choose from when adding multimedia content to their treasure hunts:'
        labelList={['Text', 'Audio', 'Image']}
        onCheckBoxToggled={onInputTypeToggle}
        initialAllowedInputTypes={initialAllowedInputTypes}
      />
    </Root>
  );
}

export default ConfigureStageParamsStage;