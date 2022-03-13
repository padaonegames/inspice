import { useState } from 'react';
import styled from 'styled-components';
import EditableFieldCard from '../../../../components/Forms/Cards/EditableFieldCard';
import FormActionsFloatingCard from '../../../../components/Forms/Cards/FormActionsFloatingCarc';
import { EditableStepTitleCard } from '../../../../components/Forms/Cards/StepTitleCard';
import { StepComponentProps } from '../../../../components/Navigation/Steps';
import { FieldDefinition, MultistageFormStage } from '../../../../services/multistageFormActivity.model';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;

  position: relative;
  width: auto;
`;

export const DefineMultistageFormStep = (props: StepComponentProps): JSX.Element => {

  const defaultStage: MultistageFormStage = { forms: [], title: '', description: '' };
  const stage: MultistageFormStage = props.getState<MultistageFormStage>('stage', defaultStage);

  // which card is currently selected (useful for knowing where to place new cards)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(stage.forms.length - 1);

  const handleTitleChanged = (value: string) => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      title: value
    })), defaultStage);
  };

  const handleDescriptionChanged = (value: string) => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      description: value
    })), defaultStage);
  };

  const handleItemAdded = () => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      forms: [
        ...prev.forms.slice(0, selectedItemIndex),
        { type: 'multiple-choice', promptText: '', answers: ['Option 1'] },
        ...prev.forms.slice(selectedItemIndex)
      ]
    })), defaultStage);
    setSelectedItemIndex(prev => prev + 1);
  };

  const handleItemRemoved = (index: number) => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      forms: prev.forms.filter((_, i) => i !== index)
    })), defaultStage);
  };

  const handleItemChanged = (index: number, value: FieldDefinition) => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      forms: [
        ...prev.forms.slice(0, index),
        value,
        ...prev.forms.slice(index + 1)
      ]
    })), defaultStage);
  };

  return (
    <Root>
      <EditableStepTitleCard
        key='editableStepTitleCard'
        stepTitle={stage.title ?? ''}
        stepDescription={stage.description ?? ''}
        onTitleChanged={handleTitleChanged}
        onDescriptionChanged={handleDescriptionChanged}
        onCardFocused={() => setSelectedItemIndex(-1)}
      />
      {selectedItemIndex === -1 && (
        <FormActionsFloatingCard
          key='actionsFloatingCard'
          onAddNewQuestion={handleItemAdded}
        />
      )}
      {stage.forms.map((form, i) => (
        <>
          <EditableFieldCard
            key={i}
            fieldDefinition={form}
            onFieldDefinitionChanged={(value) => handleItemChanged(i, value)}
            onCardDeleted={() => handleItemRemoved(i)}
            onCardFocused={() => setSelectedItemIndex(i)}
          />
          {selectedItemIndex === i && (
            <FormActionsFloatingCard
              key='actionsFloatingCard'
              onAddNewQuestion={handleItemAdded}
            />
          )}
        </>
      ))}
    </Root>
  );
}

export default DefineMultistageFormStep;