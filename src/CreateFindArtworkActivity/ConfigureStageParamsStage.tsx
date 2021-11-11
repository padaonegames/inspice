import React from 'react';
import styled from 'styled-components';
import CheckBoxGroupInput from '../components/CheckBoxGroupInput';
import ContentCard from '../components/ContentCard';
import IntegerRangeInputFieldWithTag from '../components/IntegerRangeInputFieldWithTag';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.5vh;
`;

const CardContent = styled.div`
  align-self: center;
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
      <ContentCard
        cardTitle='Stage Settings'
        titleAlign='center'
        width='60%'
      >
        <CardContent>
          <IntegerRangeInputFieldWithTag
            min={1}
            max={10}
            step={1}
            initialMin={initialMinStages}
            initialMax={initialMaxStages}
            onMinValueChange={onMinStagesChange}
            onMaxValueChange={onMaxStagesChange}
            fieldText='SPECIFY THE REQUIRED NUMBER OF ARTWORKS TO PICK'
          />
          <IntegerRangeInputFieldWithTag
            min={1}
            max={10}
            step={1}
            initialMin={initialMinClues}
            initialMax={initialMaxClues}
            onMinValueChange={onMinCluesChange}
            onMaxValueChange={onMaxCluesChange}
            fieldText='SPECIFY THE REQUIRED NUMBER OF HINTS PER ARTWORK'
          />
          <CheckBoxGroupInput
            fieldText='SPECIFY ALLOWED MEDIA INPUT TYPES'
            labelList={['Text', 'Audio', 'Image']}
            onCheckBoxToggled={onInputTypeToggle}
            initialAllowedInputTypes={initialAllowedInputTypes}
          />
        </CardContent>
      </ContentCard>
    </Root>
  );
}

export default ConfigureStageParamsStage;