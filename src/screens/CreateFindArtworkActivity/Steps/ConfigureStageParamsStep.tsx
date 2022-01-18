import styled from 'styled-components';
import CheckBoxGroupInput from '../../../components/Forms/CheckBoxGroupInput';
import IntegerRangeInputFieldWithTag from '../../../components/Forms/IntegerRangeInputFieldWithTag';
import ContentCard from '../../../components/Layout/ContentCard';
import { StepComponentProps } from '../../../components/Navigation/Steps';
import { AllowedInputs } from '../../../services/findArtworkActivity.model';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.5vh;
`;

const CardContent = styled.div`
  align-self: center;
`;

/**
 * <img src="media://ConfigureStageParamsStage.PNG" alt="ConfigureStageParamsStage">
 */
export const ConfigureStageParamsStep = (props: StepComponentProps) => {

  return (
    <Root>
      <ContentCard
        cardTitle='Stage Settings'
        titleAlign='center'
        width='95%'
      >
        <CardContent>
          <IntegerRangeInputFieldWithTag
            min={1}
            max={10}
            step={1}
            initialMin={props.getState('minStages', 1)}
            initialMax={props.getState('maxStages', 1)}
            onMinValueChange={(val) => props.setState('minStages', val, 1)}
            onMaxValueChange={(val) => props.setState('maxStages', val, 1)}
            fieldText='SPECIFY THE REQUIRED NUMBER OF ARTWORKS TO PICK'
          />
          <IntegerRangeInputFieldWithTag
            min={1}
            max={10}
            step={1}
            initialMin={props.getState('minCluesPerStage', 1)}
            initialMax={props.getState('maxCluesPerStage', 1)}
            onMinValueChange={(val) => props.setState('minCluesPerStage', val, 1)}
            onMaxValueChange={(val) => props.setState('maxCluesPerStage', val, 1)}
            fieldText='SPECIFY THE REQUIRED NUMBER OF HINTS PER ARTWORK'
          />
          <CheckBoxGroupInput
            fieldText='SPECIFY ALLOWED MEDIA INPUT TYPES'
            labelList={['Text', 'Audio', 'Image']}
            onCheckBoxToggled={(elem) => props.setState<AllowedInputs[]>('allowedInputs', (prev: AllowedInputs[]) => {
              const cElem = elem as AllowedInputs;
              if (!prev || !cElem) return [];
              if(prev.some(e => e === cElem)) {
                return prev.filter(e => e !== cElem);
              }
              else return [...prev, cElem];
            }, [])}
            initialAllowedInputTypes={props.getState('allowedInputs', [])}
          />
        </CardContent>
      </ContentCard>
    </Root>
  );
}

export default ConfigureStageParamsStep;