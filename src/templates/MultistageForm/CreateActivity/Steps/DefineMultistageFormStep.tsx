import { useEffect, useState } from 'react';
import EditableFieldCard, { FieldMappings, fieldTypeIcon } from '../../../../components/Forms/Cards/EditableFieldCard';
import FormActionsFloatingCard from '../../../../components/Forms/Cards/FormActionsFloatingCarc';
import { EditableMultipleChoiceCardContent, multipleChoiceCardFactory } from '../../../../components/Forms/Cards/MultipleChoiceCard';
import { EditableDisplayImageCardContent, displayImageCardFactory } from '../../../../components/Forms/Cards/DisplayImageCard';
import { EditableDisplayVideoCardContent, displayVideoCardFactory } from '../../../../components/Forms/Cards/DisplayVideoCard';
import { LikertScaleInputCard } from '../../../../components/Forms/Cards/LikertScaleInputCard';
import { EditableShortTextContent, shortTextCardFactory } from '../../../../components/Forms/Cards/ShortTextInputCard';
import { EditableStepTitleCard } from '../../../../components/Forms/Cards/StepTitleCard';
import { StepComponentProps } from '../../../../components/Navigation/Steps';
import { AvailableMultistageFormFieldType, EditableFieldProps, FieldDefinition, MultistageFormFieldDefinition, MultistageFormStage, SupportedFormField } from '../../../../services/multistageFormActivity.model';
import { calendarInputCardFactory, EditableCalendarContent } from '../../../../components/Forms/Cards/CalendarInputCard';
import { EditableCheckBoxGroupCardContent } from '../../../../components/Forms/Cards/CheckBoxGroupInputCard';
import { EditableLongTextContent } from '../../../../components/Forms/Cards/LongTextInputCard';
import { EditableLikertScaleCardContent } from '../../../../components/Forms/Cards/LikertScaleInputCard';
import LikertScaleInputCardStories from '../../../../stories/forms/cards/LikertScaleInputCard.stories';

import styled from 'styled-components';
import { FormNew } from "@styled-icons/fluentui-system-filled/FormNew";
import { RadioCircleMarked } from "styled-icons/boxicons-regular";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { Video } from "@styled-icons/entypo/Video";
import { Like } from "@styled-icons/boxicons-regular/Like";
import { ShortText } from "@styled-icons/material/ShortText";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { CalendarEvent } from "@styled-icons/boxicons-regular/CalendarEvent";
import { Likert } from "@styled-icons/fluentui-system-regular/Likert";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import { CardText } from "@styled-icons/bootstrap/CardText"
import { CheckboxChecked } from "@styled-icons/fluentui-system-filled/CheckboxChecked";
import { LinearScale } from "@styled-icons/material-outlined/LinearScale";
import { Tags } from "@styled-icons/fa-solid/Tags";
import { EditableDisplayTextCardContent } from '../../../../components/Forms/Cards/DisplayTextCard';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  justify-content: center;
  align-items: center;

  position: relative;
  width: auto;
`;

export const TitleColor = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 8px 8px 0 0;
  background-color: #c44c49;
`;

export const Separator = styled.div`
  width: 100%;
  height: 50px;
  // background-color:rgb(255,0,0);
`;


const MultipleChoiceIcon = styled(RadioCircleMarked)`
  ${fieldTypeIcon}
`;

const DisplayImageIcon = styled(CardImage)`
  ${fieldTypeIcon}
`;

const DisplayTextIcon = styled(CardText)`
  ${fieldTypeIcon}
`;

const DisplayVideoIcon = styled(Video)`
  ${fieldTypeIcon}
`;

const LikerIcon = styled(Like)`
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

const NewSectionIcon = styled(FormNew)`
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
  },
  'display-image': {
    displayName: 'Display Image',
    iconComponent: <DisplayImageIcon />,
    editingComponentProducer: EditableDisplayImageCardContent,
    defaultFieldPayload: {
      src: 'Image source'
    }
  },
  'display-video': {
    displayName: 'Display Video',
    iconComponent: <DisplayVideoIcon />,
    editingComponentProducer: EditableDisplayVideoCardContent,
    defaultFieldPayload: {
      src: ''
    }
  },
  'display-text': {
    displayName: 'Display Text',
    iconComponent: <DisplayTextIcon />,
    editingComponentProducer: EditableDisplayTextCardContent,
    defaultFieldPayload: {
      text: ''
    }
  },
  'likert-scale': {
    displayName: 'Liker',
    iconComponent: <LikerIcon />,
    editingComponentProducer: EditableLikertScaleCardContent,
    defaultFieldPayload: {
      scale: ["First", "Second", "Third"],
      questions: [],
      showQuestionsIndex: false
    }
  },
}; // fieldMappings

export const DefineMultistageFormStep = (props: StepComponentProps): JSX.Element => {

  const defaultStage: MultistageFormStage = { forms: [], title: '', description: '' };
  const stage: MultistageFormStage = props.getState<MultistageFormStage>('stage', defaultStage);
  const [activityStages, setActivityStages] = useState<MultistageFormStage[]>(props.getState<MultistageFormStage[]>('stages', [defaultStage]));

  // which card is currently selected (useful for knowing where to place new cards)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(stage.forms.length - 1);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  // state to see if the focused item can change just by hovering the mouse over any object or it must be clicked 
  const [focusOnHover, setFocusOnHover] = useState<boolean>(true);

  // const [currentStage, setCurrentStage] = useState<MultistageFormStage>(props.getState<MultistageFormStage>('stage', defaultStage));



  // each time the stages are modified our state will notice it
  useEffect(() => {
    setActivityStages(props.getState<MultistageFormStage[]>('stages', [defaultStage]));
  }, [props.getState<MultistageFormStage[]>('stages', [defaultStage])])

  const handleTitleChanged = (stageIndex: number, value: string) => {
    let currentStage = activityStages[stageIndex];
    currentStage.title = value;

    props.setState<MultistageFormStage[]>('stages',
      [
        ...activityStages.slice(0, stageIndex),
        currentStage,
        ...activityStages.slice(stageIndex + 1)
      ]
      , [defaultStage]);
  }; // handleTitleChanged

  const handleDescriptionChanged = (stageIndex: number, value: string) => {
    let currentStage = activityStages[stageIndex];
    currentStage.description = value;

    props.setState<MultistageFormStage[]>('stages',
      [
        ...activityStages.slice(0, stageIndex),
        currentStage,
        ...activityStages.slice(stageIndex + 1)
      ]
      , [defaultStage]);
  }; // handleDescriptionChanged

  const handleItemAdded = (stageIndex: number) => {

    let currentStage = activityStages[stageIndex];
    currentStage.forms = [...currentStage.forms.slice(0, selectedItemIndex + 1),
    { promptText: '', fieldData: { type: 'multiple-choice', payload: { answers: ['Option 1'] } } },
    ...currentStage.forms.slice(selectedItemIndex + 1)
    ];

    props.setState<MultistageFormStage[]>('stages',
      [
        ...activityStages.slice(0, stageIndex),
        currentStage,
        ...activityStages.slice(stageIndex + 1)
      ]
      , [defaultStage]);
    setSelectedItemIndex(prev => prev + 1);
  }; // handleItemAdded

  const handleItemRemoved = (index: number, stageIndex: number) => {
    let currentStage = activityStages[stageIndex];
    currentStage.forms = [...currentStage.forms.slice(0, index),
    ...currentStage.forms.slice(index + 1)
    ];

    props.setState<MultistageFormStage[]>('stages',
      [
        ...activityStages.slice(0, stageIndex),
        currentStage,
        ...activityStages.slice(stageIndex + 1)
      ], [defaultStage]);
  }; // handleItemRemoved

  const handleItemChanged = (index: number, stageIndex: number, value: MultistageFormFieldDefinition) => {

    let currentStage = activityStages[stageIndex];
    currentStage.forms = [...currentStage.forms.slice(0, index),
      value,
    ...currentStage.forms.slice(index + 1)
    ];

    props.setState<MultistageFormStage[]>('stages',
      [
        ...activityStages.slice(0, stageIndex),
        currentStage,
        ...activityStages.slice(stageIndex + 1)
      ], [defaultStage]);
  }; // handleItemChanged

  const handleFieldTypeChanged = (index: number, stageIndex: number, value: AvailableMultistageFormFieldType) => {
    const mapping = fieldMappings[value];

    let currentStage = activityStages[stageIndex];
    currentStage.forms = [
      ...currentStage.forms.slice(0, index),
      {
        promptText: currentStage.forms[index].promptText,
        fieldData: {
          type: value,
          payload: mapping.defaultFieldPayload
        } as SupportedFormField
      },
      ...currentStage.forms.slice(index + 1)
    ];

    props.setState<MultistageFormStage[]>('stages',
      [
        ...activityStages.slice(0, stageIndex),
        currentStage,
        ...activityStages.slice(stageIndex + 1)
      ], [defaultStage]);

  }; // handleFieldTypeChanged


  const handleMouseEntered = (index: number, sectionIndex: number) => {
    if (!focusOnHover) return;
    setSelectedItemIndex(index);
    setSelectedStageIndex(sectionIndex);
  } // handleMouseEntered

  const handleFocusLost = (index: number, sectionIndex: number) => {
    setFocusOnHover(index === selectedItemIndex ? true : false);
  } // handleFocusLost

  const handleCardMovedUpwards = (cardIndex: number, sectionIndex: number) => {

    //Card needs to be transfered to the previus section 
    if (cardIndex === 0 && sectionIndex > 0) {
      let movedCard = activityStages[sectionIndex].forms[0];
      props.setState<MultistageFormStage[]>('stages', [
        ...activityStages.slice(0, sectionIndex - 1),
        { ...activityStages[sectionIndex - 1], forms: [...activityStages[sectionIndex - 1].forms, movedCard] },  //Previus section gets the new card
        { ...activityStages[sectionIndex], forms: activityStages[sectionIndex].forms.slice(1) },             //Current section loses this card
        ...activityStages.slice(sectionIndex + 1)
      ], [defaultStage]);
      return;
    }

    //Card can go upwards in the current section 
    let currentStage = activityStages[sectionIndex];
    var element = currentStage.forms[cardIndex];
    currentStage.forms.splice(cardIndex, 1);
    currentStage.forms.splice(cardIndex - 1, 0, element);

    props.setState<MultistageFormStage[]>('stages', [
      ...activityStages.slice(0, sectionIndex),
      currentStage,
      ...activityStages.slice(sectionIndex + 1)
    ], [defaultStage]);
  } //handleCardMovedUpwards

  const handleCardMovedDownwards = (cardIndex: number, sectionIndex: number) => {

    //Card needs to be transfered to the next section 
    if (sectionIndex < activityStages.length - 1 && cardIndex === activityStages[sectionIndex].forms.length - 1) {
      let movedCard = activityStages[sectionIndex].forms[0];
      props.setState<MultistageFormStage[]>('stages', [
        ...activityStages.slice(0, sectionIndex),
        { ...activityStages[sectionIndex], forms: activityStages[sectionIndex].forms.slice(0, activityStages[sectionIndex].forms.length - 1) },  //Previus section gets the new card
        { ...activityStages[sectionIndex + 1], forms: [movedCard, ...activityStages[sectionIndex + 1].forms] },             //Current section loses this card
        ...activityStages.slice(sectionIndex + 2)
      ], [defaultStage]);
      return;
    }


    let currentStage = activityStages[sectionIndex];
    var element = currentStage.forms[cardIndex];
    currentStage.forms.splice(cardIndex, 1);
    currentStage.forms.splice(cardIndex + 1, 0, element);

    props.setState<MultistageFormStage[]>('stages', [
      ...activityStages.slice(0, sectionIndex),
      currentStage,
      ...activityStages.slice(sectionIndex + 1)
    ], [defaultStage]);
  } //handleCardMovedDownwards


  /////////////////////////////////////////////Section methods

  const handleAddNewSection = () => {
    props.setState<MultistageFormStage[]>('stages',
      [...activityStages, defaultStage]
      , [defaultStage]);
  } //handleAddNewSection

  const handleSectionMovedDownwards = (sectionIndex: number) => {
    let newActivityStages = activityStages;
    let movedSection = activityStages[sectionIndex];
    newActivityStages.splice(sectionIndex, 1);
    newActivityStages.splice(sectionIndex + 1, 0, movedSection);
    props.setState<MultistageFormStage[]>('stages', newActivityStages, [defaultStage]);
  } //handleSectionMovedDownwards

  const handleSectionMovedUpwards = (sectionIndex: number) => {
    let newActivityStages = activityStages;
    let movedSection = activityStages[sectionIndex];
    newActivityStages.splice(sectionIndex, 1);
    newActivityStages.splice(sectionIndex - 1, 0, movedSection);
    props.setState<MultistageFormStage[]>('stages', newActivityStages, [defaultStage]);
  } //handleSectionMovedUpwards

  const handleDeleteSection = (index: number) => {
    props.setState<MultistageFormStage[]>('stages',
      [...activityStages.slice(0, index), ...activityStages.slice(index + 1)]
      , [defaultStage]);
  } //handleAddNewSection

  return (
    <Root>

      {activityStages.map((currentStage, stageIndex) => (
        <>
          <Separator/>
          <EditableStepTitleCard
            key='editableStepTitleCard'
            stepTitle={currentStage.title ?? ''}
            stepDescription={currentStage.description ?? ''}
            onTitleChanged={(value) => handleTitleChanged(stageIndex, value)}
            onDescriptionChanged={(value) => handleDescriptionChanged(stageIndex, value)}
            onCardFocused={() => { setSelectedItemIndex(-1); setSelectedStageIndex(stageIndex); setFocusOnHover(false) }}
            onCardLostFocus={() => handleFocusLost(-1, stageIndex)}
            onMouseEntered={() => handleMouseEntered(-1, stageIndex)}
            position={stageIndex}
            onSectionMovedUp={() => handleSectionMovedUpwards(stageIndex)}
            onSectionMovedDown={() => handleSectionMovedDownwards(stageIndex)}
            onSectionDeleted={() => handleDeleteSection(stageIndex)}
          />
          {(selectedItemIndex === -1 && selectedStageIndex === stageIndex) && (
            <FormActionsFloatingCard
              key='actionsFloatingCard'
              onAddNewQuestion={() => handleItemAdded(stageIndex)}
            />
          )}
          {currentStage.forms.map((form, formIndex) => (
            <>
              <EditableFieldCard
                key={formIndex}
                initialFieldDefinition={form}
                fieldMappings={fieldMappings}
                onFieldDefinitionChanged={(value) => handleItemChanged(formIndex, stageIndex, value)}
                onFieldTypeChanged={(fieldType) => handleFieldTypeChanged(formIndex, stageIndex, fieldType)}
                onCardDeleted={() => handleItemRemoved(formIndex, stageIndex)}
                onCardFocused={() => { setSelectedItemIndex(formIndex); setFocusOnHover(false) }}
                onCardLostFocus={() => handleFocusLost(formIndex, stageIndex)}
                onMouseEntered={() => handleMouseEntered(formIndex, stageIndex)}
                onMoveUpCard={() => handleCardMovedUpwards(formIndex, stageIndex)}
                onMoveDownCard={() => handleCardMovedDownwards(formIndex, stageIndex)}
                isFocused={selectedItemIndex === formIndex && selectedStageIndex === stageIndex}
              />
              {(selectedItemIndex === formIndex && selectedStageIndex === stageIndex) && (
                <FormActionsFloatingCard
                  key='actionsFloatingCard'
                  onAddNewQuestion={() => handleItemAdded(stageIndex)}
                />
              )}
            </>
          ))}
        </>
      ))}

      <NewSectionIcon onMouseDown={handleAddNewSection} />
    </Root>
  );
}

export default DefineMultistageFormStep;