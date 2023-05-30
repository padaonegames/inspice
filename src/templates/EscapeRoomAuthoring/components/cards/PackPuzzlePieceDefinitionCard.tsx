import {
  PackPuzzlePiece,
  Vector2,
} from "../../../../services/escapeRoomActivity.model";

import styled, { css } from "styled-components";
import { Save } from "@styled-icons/boxicons-solid/Save";
import { Edit } from "@styled-icons/fluentui-system-regular/Edit";

import { useEffect, useState } from "react";
import { ResourcesPopUp } from "../ResourcesPopUp";
import {
  CardPanel,
  HorizontalLine,
  RequiredAlertIcon,
  RequiredQuestionSpan,
  Root,
} from "../../../../components/Forms/Cards/cardStyles";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { Cancel } from "@styled-icons/material-outlined/Cancel";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import NumberInputCard from "../../../../components/Forms/Cards/NumberInputCard";
import TagsInputCard from "../../../../components/Forms/Cards/TagsInputCard";

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

interface ButtonProps {
  disabled?: boolean;
}
const fieldTypeIcon = css<ButtonProps>`
  color: ${(props) => props.theme.textColor};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  height: 1.75em;
  width: 1.75em;
  margin-right: 0.75em;
`;

const DeleteIcon = styled(Delete)`
  ${fieldTypeIcon}
  cursor: pointer;
`;

const EditIcon = styled(Edit)`
  ${fieldTypeIcon}
`;
const PackPuzzleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: left;
`;

interface PackPuzzlePreviewContainerProps {
  src?: string;
}
const PackPuzzlePreviewContainer = styled.div<PackPuzzlePreviewContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 15em;
  position: relative;

  background-size: contain;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: black;
  ${(props) =>
    props.src
      ? `background-image: url(${props.src});`
      : `background-color: darkred;`}
`;

const PackPuzzleInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 0 10px 10px 10px;
  width: 100%;
  border-radius: 0 0.5rem 0.5rem 0;
  z-index: 0;
`;

export const CardBottomRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  justify-content: right;
  align-items: center;
  margin-top: 0.25em;
`;

export const VectorTwoRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25em;
`;

interface InputAreaProps {
  width?: string;
  height?: string;
  dimBackground?: boolean;
}
export const InputArea = styled.textarea<InputAreaProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "6em"};
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  outline: none;
  padding: 0.65em;
  background-color: ${(props) =>
    props.dimBackground ? "#f8f9fa" : "transparent"};
  resize: none;
  overflow-y: hidden;

  text-align: center;

  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset;

  &:focus {
    box-shadow: #c44c49 0px -4px 0px 0px inset;
  }
`;

const SaveChangesIcon = styled(Save)`
  ${fieldTypeIcon}
  color: white;
`;

const CancelEditingIcon = styled(Cancel)`
  ${fieldTypeIcon}
  color: white;
`;

const AddImageIcon = styled(ImageAdd)`
  ${fieldTypeIcon}
  color: white;
`;

const SaveChangesButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.primaryButtonColor};
`;

const CancelEditingButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.secondaryButtonColor};
`;

const SelectPackPuzzleButton = styled.button`
  ${actionButtonStyle}
  background-color: ${(props) => props.theme.secondaryButtonColor};
  margin-bottom: 1em;
  opacity: 0.975;
`;

export interface PackPuzzlePieceDefinitionCardProps {
  /** Default definition to initialize a characters data */
  initialPackPuzzlePieceDefinition: PackPuzzlePiece;
  /** Callback to parent component to notify that the user wants to save this puzzle piece data */
  onSavePackPuzzlePieceData?: (newInfo: PackPuzzlePiece) => void;
  /** Callback to parent component to notify that the user wants to start/finish editing data */
  onTogglePackPuzzlePieceEditMode?: () => void;
  /** Callback to parent component to notify that the user wants to delete this puzzle piece */
  onDeletePackPuzzlePiece?: () => void;
  /** Boolean to determine wether this card should be filled with elements that allow its edition or only its visualization */
  editMode: boolean;
  /** Boolean to prevent the user from editing a puzzle piece with a value that is not acceptable and change to another piece's edit mode */
  editButtonAvaliable: boolean;
} // PackPuzzlePieceDefinitionCardProps

export const PackPuzzlePieceDefinitionCard = (
  props: PackPuzzlePieceDefinitionCardProps
): JSX.Element => {
  const {
    initialPackPuzzlePieceDefinition,
    onSavePackPuzzlePieceData,
    onDeletePackPuzzlePiece,
    onTogglePackPuzzlePieceEditMode,
    editMode,
    editButtonAvaliable,
  } = props;

  const [showResourcesPopUp, setShowResourcesPopUp] = useState<boolean>(false);
  const [packPuzzlePieceData, setPackPuzzlePieceData] =
    useState<PackPuzzlePiece>(initialPackPuzzlePieceDefinition);

  const onSavePackPuzzlePieceInfo = () => {
    // Trim to prevent names with empty spaces at the end/begining
    if (onSavePackPuzzlePieceData)
      onSavePackPuzzlePieceData(packPuzzlePieceData);
  }; // onSavePackPuzzleInfo

  const handleDeletePackPuzzlePiece = () => {
    if (onDeletePackPuzzlePiece) onDeletePackPuzzlePiece();
  }; //handleDeletePackPuzzle

  const handleToggleEditPackPuzzlePieceMode = () => {
    if (onTogglePackPuzzlePieceEditMode) onTogglePackPuzzlePieceEditMode();
  }; // handleToggleEditPackPuzzlePieceMode

  const handleResourceSelected = (resourceSrc: string | undefined) => {
    setPackPuzzlePieceData({
      ...packPuzzlePieceData,
      imageSrc: resourceSrc ?? "",
    });
    setShowResourcesPopUp((prev) => !prev);
  }; // handleResourceSelected

  useEffect(() => {
    if (!packPuzzlePieceData.imageSrc) return;

    /** Promisified image loading. */
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.addEventListener("load", () => {
          resolve(img);
        });
        img.addEventListener("error", reject);
        img.src = src;
      });
    }; // loadImage

    const analyzeImage = (img: HTMLImageElement) => {
      const { width, height } = img;
      const canvas = document.createElement("canvas");
      canvas.height = height;
      canvas.width = width;
      const context = canvas.getContext?.("2d");
      if (context === null) {
        return;
      }
      context.drawImage(img, 0, 0);
      const imageData = context.getImageData(0, 0, width, height);

      const coords: Vector2[] = [];

      // en qué fila (casilla 5x5) estamos
      for (let i = 0; i < 5; i++) {
        // en qué columna (casilla 5x5) estamos
        for (let j = 0; j < 5; j++) {
          // puntos medios del cuadrado en la cuadrícula
          const x = Math.floor((height / 5.0) * (i + 0.5));
          const y = Math.floor((width / 5.0) * (j + 0.5));

          const p = (x * width + y) * 4 + 3; // pasamos al array original
          if (imageData.data[p] > 0) {
            coords.push({ x: j - 2, y: i - 2 }); // columna = x, fila = y
          } // si algo es > 0 hay contenido
        }
      }
      setPackPuzzlePieceData((prev) => ({ ...prev, coords: coords }));
    }; // analyzeImage

    loadImage(packPuzzlePieceData.imageSrc).then(analyzeImage);
  }, [packPuzzlePieceData.imageSrc]);

  const needsImage = packPuzzlePieceData.imageSrc.length === 0;
  const shouldAlert = editMode && needsImage;

  return (
    <Root>
      <CardPanel
        addPadding={false}
        addFocusEffect={false}
        requiredAlert={shouldAlert}
      >
        {/* Pop up component to enable image selection from the escape room resources */}
        {showResourcesPopUp && (
          <ResourcesPopUp
            onClosePopUp={() => setShowResourcesPopUp(false)}
            onResourceSelected={handleResourceSelected}
            popUpTitle="Select an image for this piece"
          />
        )}

        {/* Card with Prompt fields to modify the caracters name and description and a button to specify its image */}
        <PackPuzzleContainer>
          <PackPuzzlePreviewContainer src={packPuzzlePieceData.imageSrc}>
            {/* Image */}
            {editMode && (
              <SelectPackPuzzleButton
                onClick={() => {
                  setShowResourcesPopUp(true);
                }}
              >
                <AddImageIcon />
                Select Image
              </SelectPackPuzzleButton>
            )}
          </PackPuzzlePreviewContainer>
          {/* Name and description */}
          <PackPuzzleInfoContainer>
            <VectorTwoRow>
              <NumberInputCard
                disabled={!editMode}
                width={1}
                promptText="Initial Position (x):"
                fieldPayload={{ isFloat: true }}
                response={{ number: packPuzzlePieceData.initPosition.x }}
                onResponseChanged={(res) =>
                  setPackPuzzlePieceData((prev) => ({
                    ...prev,
                    initPosition: { x: res.number, y: prev.initPosition.y },
                  }))
                }
              />
              <NumberInputCard
                disabled={!editMode}
                width={1}
                promptText="Initial Position (y):"
                fieldPayload={{ isFloat: true }}
                response={{ number: packPuzzlePieceData.initPosition.y }}
                onResponseChanged={(res) =>
                  setPackPuzzlePieceData((prev) => ({
                    ...prev,
                    initPosition: { x: prev.initPosition.x, y: res.number },
                  }))
                }
              />
            </VectorTwoRow>

            <VectorTwoRow>
              <NumberInputCard
                disabled={!editMode}
                width={1}
                promptText="Piece Size (x):"
                fieldPayload={{ isFloat: true }}
                response={{ number: packPuzzlePieceData.size.x }}
                onResponseChanged={(res) =>
                  setPackPuzzlePieceData((prev) => ({
                    ...prev,
                    size: { x: res.number, y: prev.size.y },
                  }))
                }
              />
              <NumberInputCard
                disabled={!editMode}
                width={1}
                promptText="Piece Size (y):"
                fieldPayload={{ isFloat: true }}
                response={{ number: packPuzzlePieceData.size.y }}
                onResponseChanged={(res) =>
                  setPackPuzzlePieceData((prev) => ({
                    ...prev,
                    size: { x: prev.size.x, y: res.number },
                  }))
                }
              />
            </VectorTwoRow>

            {packPuzzlePieceData.coords && (
              <TagsInputCard
                enabled={false}
                promptText={"Detected coordinates:"}
                value={packPuzzlePieceData.coords.map(
                  (elem) => `[x: ${elem.x}, y: ${elem.y}]`
                )}
              />
            )}

            <CardBottomRow>
              {editMode && (
                <>
                  <CancelEditingButton
                    title="Discard the changes to this puzzle piece"
                    onClick={handleToggleEditPackPuzzlePieceMode}
                  >
                    <CancelEditingIcon />
                    Cancel
                  </CancelEditingButton>
                  <HorizontalLine />
                  <SaveChangesButton
                    title="Save your changes to this puzzle piece"
                    onClick={onSavePackPuzzlePieceInfo}
                  >
                    <SaveChangesIcon />
                    Save Changes
                  </SaveChangesButton>
                </>
              )}
              {!editMode && (
                <>
                  <EditIcon
                    title="Edit Pack Puzzle"
                    disabled={!editButtonAvaliable}
                    onClick={() => {
                      editButtonAvaliable &&
                        handleToggleEditPackPuzzlePieceMode();
                    }}
                  />
                  <DeleteIcon
                    title="Remove PackPuzzle"
                    onClick={handleDeletePackPuzzlePiece}
                  />
                </>
              )}
            </CardBottomRow>
            {shouldAlert && (
              <RequiredQuestionSpan>
                <RequiredAlertIcon />{" "}
                {needsImage ? "Please select an image for this character" : ""}
              </RequiredQuestionSpan>
            )}
          </PackPuzzleInfoContainer>
        </PackPuzzleContainer>
      </CardPanel>
    </Root>
  );
}; // PackPuzzlePieceDefinitionCard

export default PackPuzzlePieceDefinitionCard;
