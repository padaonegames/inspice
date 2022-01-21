import styled from 'styled-components';
import CheckBoxGroupInputCard from '../../../components/Forms/Cards/CheckBoxGroupInputCard';
import RangeInputCard from '../../../components/Forms/Cards/RangeInputCard';
import StepTitleCard from '../../../components/Forms/Cards/StepTitleCard';
import { StepComponentProps } from '../../../components/Navigation/Steps';
import { AllowedResponseType } from '../../../services/gamGameActivity.model';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.5vh;
`;


/**
 * <img src="media://ConfigureStageParamsStage.PNG" alt="ConfigureStageParamsStage">
 */
export const ConfigureStageParamsStep = (props: StepComponentProps) => {

  return (
    <Root>
      <StepTitleCard
        stepTitle='GAM Game - Stage Settings'
        stepDescription={`Below, enter the neccesary restrictions on the users' stories, including
          the range of artworks that they will be allowed to pick and the types of media inputs that they will be 
          allowed to submit.`}
      />
      <RangeInputCard
        promptText='Specify the required number of artworks to pick:'
        onMinValueChange={(val) => props.setState<number>('minArtworks', val, 1)}
        onMaxValueChange={(val) => props.setState<number>('maxArtworks', val, 1)}
        required
        min={1}
        max={10}
        initialMin={props.getState<number | undefined>('minArtworks', 1)}
        initialMax={props.getState<number | undefined>('maxArtworks', 4)}
      />
      <CheckBoxGroupInputCard
        promptText='Specify allowed media input types in responses:'
        fields={['Tags', 'Emojis', 'Image', 'Text']}
        onFieldToggle={(elem) => props.setState<AllowedResponseType[]>('allowedResponseTypes', (prev: AllowedResponseType[]) => {
          const cElem = elem as AllowedResponseType;
          if (!prev || !cElem) return [];
          if (prev.some(e => e === cElem)) {
            return prev.filter(e => e !== cElem);
          }
          else return [...prev, cElem];
        }, [])}
        checked={props.getState<AllowedResponseType[]>('allowedResponseTypes', [])}
        required
      />
    </Root>
  );
}

export default ConfigureStageParamsStep;