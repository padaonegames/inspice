import styled from 'styled-components';
import CheckBoxGroupInput from '../../../components/Forms/CheckBoxGroupInput';
import IntegerRangeInputFieldWithTag from '../../../components/Forms/IntegerRangeInputFieldWithTag';
import ContentCard from '../../../components/Layout/ContentCard';
import { StepComponentProps } from '../../../components/Navigation/Steps';

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
        width='60%'
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
          <CheckBoxGroupInput
            fieldText='SPECIFY ALLOWED RESPONSE INPUT TYPES'
            labelList={['Tags', 'Emojis']}
            onCheckBoxToggled={(elem) => props.setState<string[]>('allowedInputs', (prev: string[]) => {
              const cElem = elem as string;
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