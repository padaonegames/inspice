import { useState } from "react";
import {
  ItemDefinition,
  SupportedPuzzle,
  SupportedStage,
} from "../../../services/escapeRoomActivity.model";

import styled from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt";
import { UpArrowAlt } from "@styled-icons/boxicons-regular/UpArrowAlt";

const Slide = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translate(0, -50%);
`;

const SlideTitle = styled.div`
  display: flex;
  height: 15%;
  width: 100%;
  -moz-box-pack: start;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 3px 0px 0px 10px;
  border: 0px none;
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: ${(props) => props.theme.frameColor};
  color: white;
  text-align: center;

  font-size: 0.75rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
`;

const SlideContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 80%;
  border-radius: 0 0 0.25rem 0.25rem;
`;

interface RootProps {
  selected?: boolean;
}
const Root = styled.div<RootProps>`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0px none;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  color: rgb(51, 51, 51);
  max-height: 141px;

  ${SlideContainer} {
    background-color: #f2f2f2;
  }

  ${(props) =>
    props.selected &&
    `
  background-color: rgb(234, 244, 252);
  ${SlideContainer} {
    background-color: white;
  }
  `}

  &:hover {
    ${SlideContainer} {
      ${(props) =>
        !props.selected &&
        `
        border: 2px solid ${props.theme.frameColor};
        border-top: 0px;
        border-radius: 0 0 0.25rem 0.25rem;
        transition: all 0s;
        `}
    }
  }
`;

const DuplicateIcon = styled(Copy)`
  position: absolute;
  left: 0.25rem;
  top: 30%;
  height: 1.75em;
  width: 1.75em;
  border-radius: 50%;
  padding: 0.15em;
  background-color: white;
  border: 2px solid ${(props) => props.theme.frameColor};
  cursor: pointer;

  color: ${(props) => props.theme.frameColor};
  &:hover {
    background-color: #f2f2f2;
  }
`;
const DeleteIcon = styled(DeleteForever)`
  position: absolute;
  left: 0.25rem;
  top: 60%;
  height: 1.75em;
  width: 1.75em;
  border-radius: 50%;
  padding: 0.15em;
  background-color: white;
  border: 2px solid ${(props) => props.theme.frameColor};
  cursor: pointer;

  color: ${(props) => props.theme.frameColor};
  &:hover {
    background-color: #f2f2f2;
  }
`;

const StagePreview = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  -moz-box-pack: justify;
  height: 100%;
  width: 100%;
  max-width: 100%;
  flex: 1 1 0%;
  padding: 0.25rem 0.5rem;
  color: rgb(178, 178, 178);
`;

const MoveUpIcon = styled(UpArrowAlt)`
  position: absolute;
  right: 0.35rem;
  top: 30%;
  height: 1.75em;
  width: 1.75em;
  border-radius: 50%;
  padding: 0.15em;
  background-color: white;
  border: 2px solid ${(props) => props.theme.frameColor};
  cursor: pointer;

  color: ${(props) => props.theme.frameColor};
  &:hover {
    background-color: #f2f2f2;
  }
`;

const MoveDownIcon = styled(DownArrowAlt)`
  position: absolute;
  right: 0.35rem;
  top: 60%;
  height: 1.75em;
  width: 1.75em;
  border-radius: 50%;
  padding: 0.15em;
  background-color: white;
  border: 2px solid ${(props) => props.theme.frameColor};
  cursor: pointer;

  color: ${(props) => props.theme.frameColor};
  &:hover {
    background-color: #f2f2f2;
  }
`;

type EscapeRoomStageSlidePropsBase<T extends ItemDefinition> = {
  [P in T["type"]]: {
    stage: Extract<ItemDefinition, { type: P }>;
    /** whether this slide is currently selected */
    selected: boolean;
    /** component to render the contents of the slide based on the stage payload */
    slidePreviewProducer?: (
      props: Extract<ItemDefinition, { type: P }>["payload"]
    ) => JSX.Element;
    /** callback to parent notifying of slide being selected by the user */
    onSlideSelected?: () => void;
    /** preview title for this slide */
    title: string;

    /** callback to parent notifying of slide being duplicated by the user */
    onDuplicateStage?: () => void;
    /** callback to parent specifying that user wishes to delete this stage */
    onDeleteStage?: () => void;

    /** whether slide can be moved up */
    canMoveUp?: boolean;
    /** whether slide can be moved down */
    canMoveDown?: boolean;
    /** callback to parent specifying that user wishes to move slide up */
    onSlideMoveUp?: () => void;
    /** callback to parent specifying that user wishes to move slide down */
    onSlideMoveDown?: () => void;
  };
}; // EscapeRoomStageSlidePropsBase

type EscapeRoomEditorSlideProps<T extends ItemDefinition> =
  EscapeRoomStageSlidePropsBase<T>[keyof EscapeRoomStageSlidePropsBase<T>];

const EscapeRoomEditorSlide = <T extends ItemDefinition>(
  props: EscapeRoomEditorSlideProps<T>
): JSX.Element => {
  const [mouseOverMe, setMouseOverMe] = useState<boolean>(false);

  const {
    title,
    stage,
    selected,
    slidePreviewProducer,
    onSlideSelected,

    onDeleteStage,
    onDuplicateStage,

    canMoveDown,
    canMoveUp,
    onSlideMoveDown,
    onSlideMoveUp,
  } = props;

  return (
    <Root
      selected={selected}
      onMouseOver={() => setMouseOverMe(true)}
      onMouseOut={() => setMouseOverMe(false)}
    >
      <Slide onClick={onSlideSelected}>
        <SlideTitle>{title}</SlideTitle>
        <SlideContainer>
          <StagePreview>
            {slidePreviewProducer && slidePreviewProducer(stage.payload as any)}
          </StagePreview>
        </SlideContainer>
      </Slide>

      {(mouseOverMe || selected) && (
        <>
          {/* Duplicate slice button */}
          <DuplicateIcon onClick={onDuplicateStage} />
          {/* Duplicate slice button */}
          <DeleteIcon onClick={onDeleteStage} />
          {/* Move slide up button */}
          {canMoveUp && <MoveUpIcon onClick={onSlideMoveUp} />}
          {/* Move slide down button */}
          {canMoveDown && <MoveDownIcon onClick={onSlideMoveDown} />}
        </>
      )}
    </Root>
  );
}; // EscapeRoomEditorSlide

export type EscapeRoomStageSlideProps =
  EscapeRoomEditorSlideProps<SupportedStage>;
export const EscapeRoomStageSlide = (props: EscapeRoomStageSlideProps) =>
  EscapeRoomEditorSlide(props);

export type EscapeRoomPuzzleSlideProps =
  EscapeRoomEditorSlideProps<SupportedPuzzle>;
export const EscapeRoomPuzzleSlide = (props: EscapeRoomPuzzleSlideProps) =>
  EscapeRoomEditorSlide(props);
