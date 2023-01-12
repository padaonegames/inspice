import React from "react";
import styled from "styled-components";
import EmbedImageLinkCard from "../../../../components/Forms/Cards/EmbedImageLinkCard";
import LongTextInputCard from "../../../../components/Forms/Cards/LongTextInputCard";
import ShortTextInputCard from "../../../../components/Forms/Cards/ShortTextInputCard";
import StepTitleCard from "../../../../components/Forms/Cards/StepTitleCard";
import {
  descriptionChanged,
  selectDescription,
  selectThumbnailSrc,
  selectTitle,
  thumbnailSrcChanged,
  titleChanged,
} from "../../../../store/features/multistageForm/multistageFormCreationSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.5vh;
  margin-bottom: 4.5vh;
  justify-content: center;
  align-items: center;
`;

export const ActivityInstanceBasicInfoStep = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const thumbnailSrc = useAppSelector(selectThumbnailSrc);

  const handleDescriptionChanged = (description: string) => {
    dispatch(descriptionChanged({ description, bufferAction: true }));
  }; // handleDescriptionChanged

  const handleTitleChanged = (title: string) => {
    dispatch(titleChanged({ title, bufferAction: true }));
  }; // handleTitleChanged

  const handleThumbnailChanged = (thumbnailSrc: string | undefined) => {
    dispatch(thumbnailSrcChanged({ thumbnailSrc, bufferAction: true }));
  }; // handleThumbnailChanged

  return (
    <Root>
      <StepTitleCard
        stepTitle="Basic Information"
        stepDescription={`Below, enter the basic information about your activity, such as title, description, author,
        start and end dates, thumbnail image, and possible tags.`}
      />
      <ShortTextInputCard
        promptText="Choose a name for your activity:"
        fieldPayload={{
          placeholder: "Activity name...",
          maxLength: 60,
        }}
        response={{
          text: title,
        }}
        onResponseChanged={(res) => handleTitleChanged(res.text)}
        required
      />
      <LongTextInputCard
        promptText="Enter a description for your activity:"
        fieldPayload={{
          placeholder: "Description...",
          maxLength: 500,
        }}
        response={{
          text: description ?? "",
        }}
        onResponseChanged={(res) => handleDescriptionChanged(res.text)}
      />
      <EmbedImageLinkCard
        promptText="Paste the URL of the image you wish to use as thumbnail for this activity:"
        src={thumbnailSrc}
        onChange={(res) => handleThumbnailChanged(res)}
      />
    </Root>
  );
};

// Este componente no tiene siquiera props, por lo que sólo nos interesa
// hacer un re-render a partir de su estado (que depende exclusivamente
// de las keys del slice correspondiente de redux).
export default React.memo(ActivityInstanceBasicInfoStep);
