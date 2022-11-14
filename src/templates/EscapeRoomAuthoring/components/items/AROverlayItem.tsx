import {
  EditableItemProps,
  ArOverlayItemDefinition,
} from "../../../../services/escapeRoomActivity.model";
import { AbstractActivityItemFactory } from "../ActivityItemFactory";

import styled from "styled-components";
import { Root } from "./generalItemsStyles";
import { ImageSelectionCardCard } from "../cards/ImageSelectionCard";
import NumberInputCard from "../../../../components/Forms/Cards/NumberInputCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";

export const EditableAROverlayItemContent = (
  props: EditableItemProps<ArOverlayItemDefinition>
): JSX.Element => {
  const { payload, onPayloadChanged } = props;

  const { imageSrc, trackableSize, overlayImageSrc, trackableHint } = payload;

  const handleResourceSelected = (resourceSrc: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      imageSrc: resourceSrc,
    });
  }; // handleResourceSelected

  const handleTrackableSizeChanged = (size: number) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      trackableSize: size,
    });
  }; // handleTrackableSizeChanged

  const handleOverlayImageChanged = (resourceSrc: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      overlayImageSrc: resourceSrc,
    });
  }; // handleOverlayImageChanged

  const handleTrackableHintChanged = (hint: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...payload,
      trackableHint: hint,
    });
  }; // handleTrackableHintChanged

  return (
    <Root>
      <ImageSelectionCardCard
        promptText="Trackable image to look for:"
        fieldPayload={{}}
        response={{ imageSrc: imageSrc }}
        onResponseChanged={(res) => handleResourceSelected(res.imageSrc)}
        required
        requiredAlert={!imageSrc}
        alertMessage={"Please select a valid image."}
      />
      <NumberInputCard
        promptText="Enter the physical width of the trackable, in meters:"
        required
        fieldPayload={{ units: "meters." }}
        response={{ number: trackableSize ?? 1 }}
        onResponseChanged={(res) => handleTrackableSizeChanged(res.number)}
      />
      <LongTextInputCard
        promptText="Hint to help the player find the trackable:"
        fieldPayload={{
          placeholder: "Short description of what the player should look for.",
        }}
        response={{ text: trackableHint }}
        onResponseChanged={(res) => handleTrackableHintChanged(res.text)}
      />
      <ImageSelectionCardCard
        promptText="Image to use as overlay for the trackable:"
        fieldPayload={{}}
        response={{ imageSrc: overlayImageSrc }}
        onResponseChanged={(res) => handleOverlayImageChanged(res.imageSrc)}
        required
        requiredAlert={!overlayImageSrc}
        alertMessage={"Please select a valid image."}
      />
    </Root>
  );
}; // EditableAROverlayItemContent

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

export const AROverlayItemStageSlide = (
  props: ArOverlayItemDefinition
): JSX.Element => {
  const { imageSrc } = props;

  return (
    <>
      <PreviewTitle>{imageSrc === "" ? "Empty Image" : imageSrc}</PreviewTitle>
      <PreviewAR>
        <img src={imageSrc} width={50} height={50} />
      </PreviewAR>
    </>
  );
}; // AROverlayItemStageSlide

export const arOverlayItemFactory: AbstractActivityItemFactory<ArOverlayItemDefinition> =
  {
    editingComponent: (editingProps) => (
      <EditableAROverlayItemContent {...editingProps} />
    ),
    defaultDefinition: {
      imageSrc: "",
      trackableSize: 1,
      overlayImageSrc: "",
      trackableHint: "",
    },
  }; // AROverlayItemFactory

export default EditableAROverlayItemContent;
