import {
  EditableItemProps,
  ObjectObtainedItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled from "styled-components";
import { Root } from "./generalItemsStyles";
import { ImageSelectionCard } from "../cards/ImageSelectionCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";

export const EditableObjectObtainedItemContent = (
  props: EditableItemProps<ObjectObtainedItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const { spriteSrc, text } = payload;

  const handleResourceSelected = (resourceSrc: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      spriteSrc: resourceSrc,
    });
  }; // handleResourceSelected

  const handleTextChanged = (newText: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      text: newText,
    });
  }; // handleTextChanged

  return (
    <Root>
      <ImageSelectionCard
        promptText="Sprite of object obtained by the player:"
        fieldPayload={{}}
        response={{ imageSrc: spriteSrc }}
        onResponseChanged={(res) => handleResourceSelected(res.imageSrc)}
        required
        requiredAlert={!spriteSrc}
        alertMessage={"Please select a valid image."}
      />
      <LongTextInputCard
        promptText="Text to show below the sprite:"
        required
        requiredAlert={!text}
        alertMessage="Please enter a text to place below the obtained object's sprite."
        fieldPayload={{
          placeholder: "Short text for the player upon finding this object.",
        }}
        response={{ text: text }}
        onResponseChanged={(res) => handleTextChanged(res.text)}
      />
    </Root>
  );
}; // EditableObjectObtainedItemContent

const PreviewTitle = styled.div`
  margin-bottom: 0rem;
  color: rgb(110, 110, 110);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.33;
  letter-spacing: 0.2px;
  max-height: 1.5rem;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PreviewAR = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;

export const ObjectObtainedItemStageSlide = (
  props: ObjectObtainedItemDefinition
): JSX.Element => {
  const { spriteSrc } = props;

  return (
    <>
      <PreviewTitle>{spriteSrc === "" ? "No Object" : spriteSrc}</PreviewTitle>
      <PreviewAR>
        <img src={spriteSrc} width={50} height={50} />
      </PreviewAR>
    </>
  );
}; // ObjectObtainedItemStageSlide

export const objectObtainedItemFactory: AbstractActivityItemFactory<ObjectObtainedItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableObjectObtainedItemContent {...editingProps} />
    ),
    defaultDefinition: {
      spriteSrc: "",
      text: "",
    },
  }; // ObjectObtainedItemFactory

export default EditableObjectObtainedItemContent;
