import { useState } from "react";
import styled, { css } from "styled-components";
import FormCard from "../../../../components/Forms/Cards/FormCard";
import { ImageSelectionResponseDefinition } from "../../../../services/escapeRoomActivity.model";
import { ConsumableFieldProps } from "../../../../services/multistageFormActivity.model";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import { ResourcesPopUp } from "../ResourcesPopUp";

interface CharacterPreviewContainerProps {
  src?: string;
}
const CharacterPreviewContainer = styled.div<CharacterPreviewContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 15em;
  margin-top: 1em;

  background-size: auto 100%;
  border-radius: 0.5rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: black;
  ${(props) =>
    props.src
      ? `background-image: url(${props.src});`
      : `background-color: darkred;`}
`;

interface ButtonProps {
  disabled?: boolean;
}

const actionButtonStyle = css<ButtonProps>`
  font-family: ${(props) => props.theme.contentFont};
  font-size: ${(props) => props.theme.smallButtonFont};
  border-radius: ${(props) => props.theme.buttonBorderRadius};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  height: 3em;
  padding: 0 1em;
  color: white;
  opacity: 50%;
  cursor: default;

  ${(props) =>
    !props.disabled &&
    `
  opacity: 100%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
  `}
`;

const SelectResourceButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.secondaryButtonColor};
  margin: 1em 0;
  opacity: 0.975;
`;

const fieldTypeIcon = css<ButtonProps>`
  color: ${(props) => props.theme.textColor};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const AddImageIcon = styled(ImageAdd)`
  ${fieldTypeIcon}
  color: white;
`;

export interface ImageSelectionCardProps
  extends ConsumableFieldProps<{}, ImageSelectionResponseDefinition> {
  disabled?: boolean;
} // ImageSelectionCardProps

export const ImageSelectionCard = (
  props: ImageSelectionCardProps
): JSX.Element => {
  const {
    promptText = "",
    required = false,
    requiredAlert = false,
    alertMessage,
    fieldPayload,
    response,
    onResponseChanged,
    disabled = false,
    ...htmlProps
  } = props;

  const { imageSrc } = response;

  const [showResourcesPopUp, setShowResourcesPopUp] = useState<boolean>(false);

  const handleShowPopUp = (show: boolean) => {
    setShowResourcesPopUp(show);
  }; // handleShowPopUp

  const handleResourceSelected = (resourceSrc: string | undefined) => {
    if (!onResponseChanged) return;
    onResponseChanged({
      imageSrc: resourceSrc || "",
    });
    setShowResourcesPopUp((prev) => !prev);
  }; // handleResourceSelected

  return (
    <>
      {/* Pop up component to enable image selection from the escape room resources */}
      {showResourcesPopUp && (
        <ResourcesPopUp
          onClosePopUp={() => {
            handleShowPopUp(false);
          }}
          onResourceSelected={handleResourceSelected}
          popUpTitle="Select an image"
        />
      )}
      <FormCard
        {...htmlProps}
        promptText={promptText}
        required={required}
        requiredAlert={requiredAlert}
        alertMessage={alertMessage}
      >
        <CharacterPreviewContainer src={imageSrc}>
          {/* Image */}
          <SelectResourceButton
            onClick={() => {
              setShowResourcesPopUp(true);
            }}
          >
            <AddImageIcon />
            Select Image
          </SelectResourceButton>
        </CharacterPreviewContainer>
      </FormCard>
    </>
  );
}; // ImageSelectionCard
