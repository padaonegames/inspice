import { useState } from "react";
import EditableFieldCard, {
  FieldMappings,
  fieldTypeIcon,
} from "../../../../components/Forms/Cards/EditableFieldCard";
import FormActionsFloatingCard from "../../../../components/Forms/Cards/FormActionsFloatingCard";
import { EditableMultipleChoiceCardContent } from "../../../../components/Forms/Cards/MultipleChoiceCard";
import { EditableDisplayImageCardContent } from "../../../../components/Forms/Cards/DisplayImageCard";
import { EditableDisplayVideoCardContent } from "../../../../components/Forms/Cards/DisplayVideoCard";
import { EditableShortTextContent } from "../../../../components/Forms/Cards/ShortTextInputCard";
import { EditableStepTitleCard } from "../../../../components/Forms/Cards/StepTitleCard";
import {
  AvailableMultistageFormFieldType,
  MultistageFormField,
  SupportedFormField,
} from "../../../../services/multistageFormActivity.model";
import { EditableCalendarContent } from "../../../../components/Forms/Cards/CalendarInputCard";
import { EditableCheckBoxGroupCardContent } from "../../../../components/Forms/Cards/CheckBoxGroupInputCard";
import { EditableLongTextContent } from "../../../../components/Forms/Cards/LongTextInputCard";
import { EditableLikertScaleCardContent } from "../../../../components/Forms/Cards/LikertScaleInputCard";
import { EditableHighLightTextCardContent } from "../../../../components/Forms/Cards/HighLightTextCard";

import styled from "styled-components";
import { FolderAdd } from "@styled-icons/foundation/FolderAdd";
import { RadioCircleMarked } from "styled-icons/boxicons-regular";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import { Video } from "@styled-icons/entypo/Video";
import { Likert } from "@styled-icons/fluentui-system-regular/Likert";
import { ShortText } from "@styled-icons/material/ShortText";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { CalendarEvent } from "@styled-icons/boxicons-regular/CalendarEvent";
import { CardText } from "@styled-icons/bootstrap/CardText";
import { CheckboxChecked } from "@styled-icons/fluentui-system-filled/CheckboxChecked";
import { EditableDisplayTextCardContent } from "../../../../components/Forms/Cards/DisplayTextCard";
import { Highlight } from "@styled-icons/boxicons-regular/Highlight";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectStages,
  stageAdded,
  stageDescriptionChanged,
  stageItemAdded,
  stageItemPositionMoved,
  stageItemRemoved,
  stageItemUpdated,
  stagePositionMoved,
  stageRemoved,
  stageTitleChanged,
} from "../../../../store/features/multistageForm/multistageFormCreationSlice";
import { ObjectID } from "bson";
import React from "react";

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

const LikerIcon = styled(Likert)`
  ${fieldTypeIcon}
`;

const HighlighterIcon = styled(Highlight)`
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

const NewStageIcon = styled(FolderAdd)`
  height: 1.75em;
  width: 1.75em;
`;

const AddStageButton = styled.div`
  font-family: ${(props) => props.theme.contentFont};
  cursor: pointer;
  background-color: #c44c49;
  border: 2px solid #83322f;
  border-radius: 0.5rem;
  color: rgb(255, 255, 255);
  padding: 0.25rem 1rem 0.25rem 1rem;
  margin-top: 1rem;
  &:hover {
    border: 2px solid #ffffff;
    // transform: scale(1.05);
  }
`;

const CheckboxIcon = styled(CheckboxChecked)`
  ${fieldTypeIcon}
`;

export const fieldMappings: FieldMappings<SupportedFormField> = {
  checkbox: {
    displayName: "Checkbox",
    iconComponent: <CheckboxIcon />,
    editingComponentProducer: EditableCheckBoxGroupCardContent,
    defaultFieldPayload: {
      fields: ["Option 1", "Option 2"],
    },
  },
  "short-text": {
    displayName: "Short Text",
    iconComponent: <ShortTextIcon />,
    editingComponentProducer: EditableShortTextContent,
    defaultFieldPayload: {},
  },
  "long-text": {
    displayName: "Long Text",
    iconComponent: <LongTextIcon />,
    editingComponentProducer: EditableLongTextContent,
    defaultFieldPayload: {},
  },
  "multiple-choice": {
    displayName: "Multiple Choice",
    iconComponent: <MultipleChoiceIcon />,
    editingComponentProducer: EditableMultipleChoiceCardContent,
    defaultFieldPayload: {
      answers: ["", ""],
    },
  },
  calendar: {
    displayName: "Date",
    iconComponent: <DateIcon />,
    editingComponentProducer: EditableCalendarContent,
    defaultFieldPayload: {},
  },
  "display-image": {
    displayName: "Display Image",
    iconComponent: <DisplayImageIcon />,
    editingComponentProducer: EditableDisplayImageCardContent,
    defaultFieldPayload: {
      src: "",
      sizing: "medium",
    },
  },
  "display-video": {
    displayName: "Display Video",
    iconComponent: <DisplayVideoIcon />,
    editingComponentProducer: EditableDisplayVideoCardContent,
    defaultFieldPayload: {
      src: "",
    },
  },
  "display-text": {
    displayName: "Display Text",
    iconComponent: <DisplayTextIcon />,
    editingComponentProducer: EditableDisplayTextCardContent,
    defaultFieldPayload: {
      text: "",
    },
  },
  "likert-scale": {
    displayName: "Likert Scale",
    iconComponent: <LikerIcon />,
    editingComponentProducer: EditableLikertScaleCardContent,
    defaultFieldPayload: {
      scale: ["First", "Second", "Third"],
      questions: [],
      showQuestionsIndex: false,
    },
  },
  "highlight-text": {
    displayName: "Highlight Text",
    iconComponent: <HighlighterIcon />,
    editingComponentProducer: EditableHighLightTextCardContent,
    defaultFieldPayload: {
      highlighters: [],
      text: "",
    },
  },
}; // fieldMappings

export const DefineMultistageFormStep = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const stages = useAppSelector(selectStages);
  // which card is currently selected (useful for knowing where to place new cards)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  // index to determine the stage we are currently working on
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  // state to see if the focused item can change just by hovering the mouse over any object or it must be clicked
  const [focusOnHover, setFocusOnHover] = useState<boolean>(true);

  const handleStageTitleChanged = (stageId: string) => (value: string) => {
    dispatch(stageTitleChanged({ title: value, stageId, bufferAction: true }));
  }; // handleStageTitleChanged

  const handleStageDescriptionChanged =
    (stageId: string) => (value: string) => {
      dispatch(
        stageDescriptionChanged({
          description: value,
          stageId,
          bufferAction: true,
        })
      );
    }; // handleStageDescriptionChanged

  const handleStageItemAdded = (stageId: string, itemIndex: number) => () => {
    const item: MultistageFormField = {
      promptText: "",
      fieldData: {
        type: "multiple-choice",
        payload: { answers: ["Option 1"] },
      },
      _id: new ObjectID().toString(),
    };
    dispatch(
      stageItemAdded({ item, stageId, index: itemIndex, bufferAction: true })
    );
    setSelectedItemIndex((prev) => prev + 1);
  }; // handleStageItemAdded

  const handleStageItemRemoved = (stageId: string, itemId: string) => () => {
    dispatch(stageItemRemoved({ itemId, stageId, bufferAction: true }));
  }; // handleStageItemRemoved

  const handleStageItemFieldTypeChanged =
    (stageId: string, itemId: string) =>
    (value: AvailableMultistageFormFieldType) => {
      const mapping = fieldMappings[value];
      const currentStage = stages.find((elem) => elem._id === stageId);
      if (!currentStage) return;
      const chosenItem = currentStage.forms.find((elem) => elem._id === itemId);
      if (!chosenItem) return;

      const item: MultistageFormField = {
        ...chosenItem,
        fieldData: {
          type: value,
          payload: mapping.defaultFieldPayload,
        } as SupportedFormField,
      };

      dispatch(stageItemUpdated({ item, stageId, bufferAction: true }));
    }; // handleStageItemFieldTypeChanged

  const handleStageItemContentChanged =
    (stageId: string, itemId: string) => (value: MultistageFormField) => {
      dispatch(stageItemUpdated({ item: value, stageId, bufferAction: true }));
    }; // handleStageItemContentChanged

  const handleMouseEntered = (index: number, stageIndex: number) => () => {
    if (!focusOnHover) return;
    setSelectedItemIndex(index);
    setSelectedStageIndex(stageIndex);
  }; // handleMouseEntered

  const handleFocusLost = (index: number) => () => {
    setFocusOnHover(index === selectedItemIndex);
  }; // handleFocusLost

  const handleCardMovedUpwards = (stageId: string, itemId: string) => () => {
    dispatch(
      stageItemPositionMoved({
        stageId,
        itemId,
        offset: -1,
        bufferAction: true,
      })
    );
  }; // handleCardMovedUpwards

  const handleCardMovedDownwards = (stageId: string, itemId: string) => () => {
    dispatch(
      stageItemPositionMoved({
        stageId,
        itemId,
        offset: 1,
        bufferAction: true,
      })
    );
  }; // handleCardMovedDownwards

  ///////////////////////////////////////////// Stage methods

  const handleAddNewStage = (index: number) => () => {
    dispatch(
      stageAdded({
        index,
        stage: {
          forms: [],
          title: "",
          description: "",
          _id: new ObjectID().toString(),
        },
        bufferAction: true,
      })
    );
  }; // handleAddNewStage

  const handleStageMovedDownwards = (stageId: string) => () => {
    dispatch(stagePositionMoved({ stageId, offset: 1, bufferAction: true }));
  }; // handleStageMovedDownwards

  const handleStageMovedUpwards = (stageId: string) => () => {
    dispatch(stagePositionMoved({ stageId, offset: -1, bufferAction: true }));
  }; // handleStageMovedUpwards

  const handleDeleteStage = (stageId: string) => () => {
    dispatch(stageRemoved({ stageId, bufferAction: true }));
  }; // handleDeleteStage

  const handleCardFocused = (stageIndex: number, itemIndex: number) => () => {
    setSelectedItemIndex(itemIndex);
    setSelectedStageIndex(stageIndex);
    setFocusOnHover(false);
  }; // handleCardFocused

  return (
    <Root>
      {/* For each stage there is a title, a description and a list of forms */}
      {stages.map((currentStage, stageIndex) => (
        <React.Fragment key={`${currentStage._id}_frag`}>
          {/* Title and description of the current stage */}
          <Separator key={`${currentStage._id}_sep`} />
          <EditableStepTitleCard
            key={currentStage._id}
            stepTitle={currentStage.title ?? ""}
            stepDescription={currentStage.description ?? ""}
            onTitleChanged={handleStageTitleChanged(currentStage._id)}
            onDescriptionChanged={handleStageDescriptionChanged(
              currentStage._id
            )}
            onCardFocused={handleCardFocused(stageIndex, -1)}
            onCardLostFocus={handleFocusLost(stageIndex)}
            onMouseEntered={handleMouseEntered(-1, stageIndex)}
            position={stageIndex}
            onStageMovedUp={handleStageMovedUpwards(currentStage._id)}
            onStageMovedDown={handleStageMovedDownwards(currentStage._id)}
            onStageDeleted={handleDeleteStage(currentStage._id)}
          />
          {/* In case the user wants to add a new form right after the stage title and description */}
          {selectedItemIndex === -1 && selectedStageIndex === stageIndex && (
            <FormActionsFloatingCard
              key="formActionsFloatingCard_0"
              onAddNewQuestion={handleStageItemAdded(currentStage._id, 0)}
            />
          )}
          {/* List of forms that are included in this current stage of the activity */}
          {currentStage.forms.map((form, formIndex) => (
            <React.Fragment key={`${form._id}_frag`}>
              <EditableFieldCard
                key={form._id}
                initialField={form}
                fieldMappings={fieldMappings}
                onFieldChanged={handleStageItemContentChanged(
                  currentStage._id,
                  form._id
                )}
                onFieldTypeChanged={handleStageItemFieldTypeChanged(
                  currentStage._id,
                  form._id
                )}
                onCardDeleted={handleStageItemRemoved(
                  currentStage._id,
                  form._id
                )}
                onCardFocused={handleCardFocused(stageIndex, formIndex)}
                onCardLostFocus={handleFocusLost(formIndex)}
                onMouseEntered={handleMouseEntered(formIndex, stageIndex)}
                onMoveUpCard={handleCardMovedUpwards(
                  currentStage._id,
                  form._id
                )}
                onMoveDownCard={handleCardMovedDownwards(
                  currentStage._id,
                  form._id
                )}
                isFocused={
                  selectedItemIndex === formIndex &&
                  selectedStageIndex === stageIndex
                }
                firstCard={stageIndex === 0 && formIndex === 0}
                lastCard={
                  stageIndex === stages.length - 1 &&
                  formIndex === currentStage.forms.length - 1
                }
              />
              {/* If the user is selecting this current form the button to add new forms is displayed right after this current form */}
              {selectedItemIndex === formIndex &&
                selectedStageIndex === stageIndex && (
                  <FormActionsFloatingCard
                    key="formActionsFloatingCard_N"
                    onAddNewQuestion={handleStageItemAdded(
                      currentStage._id,
                      currentStage.forms.length
                    )}
                  />
                )}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}

      {/* Button to add a new stage to the activity */}
      <AddStageButton onClick={handleAddNewStage(stages.length)}>
        <NewStageIcon />
        New Section
      </AddStageButton>
    </Root>
  );
};

export default DefineMultistageFormStep;
