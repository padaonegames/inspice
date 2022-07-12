import { useState } from 'react';
import styled from 'styled-components';
import EditableFieldCard, { FieldMappings, fieldTypeIcon } from '../../../../components/Forms/Cards/EditableFieldCard';
import FormActionsFloatingCard from '../../../../components/Forms/Cards/FormActionsFloatingCarc';
import { EditableMultipleChoiceCardContent, multipleChoiceCardFactory } from '../../../../components/Forms/Cards/MultipleChoiceCard';
import { EditableShortTextContent, shortTextCardFactory } from '../../../../components/Forms/Cards/ShortTextInputCard';
import { EditableStepTitleCard } from '../../../../components/Forms/Cards/StepTitleCard';
import { StepComponentProps } from '../../../../components/Navigation/Steps';
import { AvailableMultistageFormFieldType, EditableFieldProps, FieldDefinition, MultistageFormFieldDefinition, MultistageFormStage, SupportedFormField } from '../../../../services/multistageFormActivity.model';
import { RadioCircleMarked } from "styled-icons/boxicons-regular";
import { ShortText } from "@styled-icons/material/ShortText";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { CalendarEvent } from "@styled-icons/boxicons-regular/CalendarEvent";
import { Likert } from "@styled-icons/fluentui-system-regular/Likert";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import { CheckboxChecked } from "@styled-icons/fluentui-system-filled/CheckboxChecked";
import { LinearScale } from "@styled-icons/material-outlined/LinearScale";
import { Tags } from "@styled-icons/fa-solid/Tags";
import { calendarInputCardFactory, EditableCalendarContent } from '../../../../components/Forms/Cards/CalendarInputCard';
import { EditableCheckBoxGroupCardContent } from '../../../../components/Forms/Cards/CheckBoxGroupInputCard';
import { EditableLongTextContent } from '../../../../components/Forms/Cards/LongTextInputCard';
import { EditableLikertScaleCardContent } from '../../../../components/Forms/Cards/LikertScaleInputCard';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;

  position: relative;
  width: auto;
`;

const MultipleChoiceIcon = styled(RadioCircleMarked)`
  ${fieldTypeIcon}
`;

const ShortTextIcon = styled(ShortText)`
  ${fieldTypeIcon}
`;

const LongTextIcon = styled(TextLeft)`
  ${fieldTypeIcon}
`;

const DateIcon = styled(CalendarEvent)`
  ${fieldTypeIcon}
`;

const LikertIcon = styled(Likert)`
  ${fieldTypeIcon}
`;

const ImageUploadIcon = styled(ImageAdd)`
  ${fieldTypeIcon}
`;

const CheckboxIcon = styled(CheckboxChecked)`
  ${fieldTypeIcon}
`;

const RangeIcon = styled(LinearScale)`
  ${fieldTypeIcon}
`;

const TagsIcon = styled(Tags)`
  ${fieldTypeIcon}
`;

export const fieldMappings: FieldMappings<SupportedFormField> = {
  checkbox: {
    displayName: 'Checkbox',
    iconComponent: <CheckboxIcon />,
    editingComponentProducer: EditableCheckBoxGroupCardContent,
    defaultFieldPayload: {
      fields: ['']
    }
  },
  'short-text': {
    displayName: 'Short Text',
    iconComponent: <ShortTextIcon />,
    editingComponentProducer: EditableShortTextContent,
    defaultFieldPayload: {}
  },
  'long-text': {
    displayName: 'Long Text',
    iconComponent: <LongTextIcon />,
    editingComponentProducer: EditableLongTextContent,
    defaultFieldPayload: {}
  },
  'multiple-choice': {
    displayName: 'Multiple Choice',
    iconComponent: <MultipleChoiceIcon />,
    editingComponentProducer: EditableMultipleChoiceCardContent,
    defaultFieldPayload: {
      answers: ['', '']
    }
  },
  calendar: {
    displayName: 'Date',
    iconComponent: <DateIcon />,
    editingComponentProducer: EditableCalendarContent,
    defaultFieldPayload: {}
  }
}; // fieldMappings

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
  }; // handleTitleChanged

  const handleDescriptionChanged = (value: string) => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      description: value
    })), defaultStage);
  }; // handleDescriptionChanged

  const handleItemAdded = () => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      forms: [
        ...prev.forms.slice(0, selectedItemIndex + 1),
        {
          promptText: '',
          fieldData: {
            type: 'multiple-choice',
            payload: {
              answers: ['Option 1']
            }
          }
        },
        ...prev.forms.slice(selectedItemIndex + 1)
      ]
    })), defaultStage);
    setSelectedItemIndex(prev => prev + 1);
  }; // handleItemAdded

  const handleItemRemoved = (index: number) => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      forms: prev.forms.filter((_, i) => i !== index)
    })), defaultStage);
  }; // handleItemRemoved

  const handleItemChanged = (index: number, value: MultistageFormFieldDefinition) => {
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      forms: [
        ...prev.forms.slice(0, index),
        value,
        ...prev.forms.slice(index + 1)
      ]
    })), defaultStage);
  }; // handleItemChanged

  const handleFieldTypeChanged = (index: number, value: AvailableMultistageFormFieldType) => {
    const mapping = fieldMappings[value];
    props.setState<MultistageFormStage>('stage', (prev => ({
      ...prev,
      forms: [
        ...prev.forms.slice(0, index),
        {
          promptText: prev.forms[index].promptText,
          fieldData: {
            type: value,
            payload: mapping.defaultFieldPayload
          } as SupportedFormField
        },
        ...prev.forms.slice(index + 1)
      ]
    })), defaultStage);
  }; // handleFieldTypeChanged

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
            initialFieldDefinition={form}
            fieldMappings={fieldMappings}
            onFieldDefinitionChanged={(value) => handleItemChanged(i, value)}
            onFieldTypeChanged={(fieldType) => handleFieldTypeChanged(i, fieldType)}
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