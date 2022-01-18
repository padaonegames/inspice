import styled from 'styled-components';
import CheckBoxGroupInput from '../../../components/Forms/CheckBoxGroupInput';
import IntegerRangeInputFieldWithTag from '../../../components/Forms/IntegerRangeInputFieldWithTag';
import ContentCard from '../../../components/Layout/ContentCard';
import { StepComponentProps } from '../../../components/Navigation/Steps';
import { AllowedResponseType } from '../../../services/gamGameActivity.model';

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
            initialMin={props.getState('minArtworks', 1)}
            initialMax={props.getState('maxArtworks', 1)}
            onMinValueChange={(val) => props.setState('minArtworks', val, 1)}
            onMaxValueChange={(val) => props.setState('maxArtworks', val, 1)}
            fieldText='SPECIFY THE REQUIRED NUMBER OF ARTWORKS TO PICK'
          />
          <CheckBoxGroupInput
            fieldText='SPECIFY ALLOWED INPUT TYPES IN RESPONSES'
            labelList={['Tags', 'Emojis', 'Image', 'Text']}
            onCheckBoxToggled={(elem) => props.setState<AllowedResponseType[]>('allowedResponseTypes', (prev: AllowedResponseType[]) => {
              const cElem = elem as AllowedResponseType;
              if (!prev || !cElem) return [];
              if(prev.some(e => e === cElem)) {
                return prev.filter(e => e !== cElem);
              }
              else return [...prev, cElem];
            }, [])}
            initialAllowedInputTypes={props.getState('allowedResponseTypes', [])}
          />
        </CardContent>
      </ContentCard>
    </Root>
  );
}

export default ConfigureStageParamsStep;