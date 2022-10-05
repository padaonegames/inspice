import { useState } from "react";

import styled from "styled-components";
import { DeleteForever } from "@styled-icons/material-twotone/DeleteForever";
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt";
import { UpArrowAlt } from "@styled-icons/boxicons-regular/UpArrowAlt";

const Slide = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
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
  padding-top: 0.5em;
  position: relative;
  box-sizing: border-box;
  height: 10em;
  width: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-congent: center;
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

const MoveUpIcon = styled(UpArrowAlt)`
  position: absolute;
  right: 0.25rem;
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
  right: 0.25rem;
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

const DeleteSlideIcon = styled(DeleteForever)`
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

interface StagePreviewProps {
  src: string;
} // StagePreviewProps

const StagePreview = styled.div<StagePreviewProps>`
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

  background-size: contain;
  border-radius: 0rem 0rem 0.25rem 0.25rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: black;

  ${(props) =>
    props.src
      ? `background-image: url(${props.src});`
      : `background-color: darkred;`}
`;

export interface NarrativeItemSlideProps {
  /** slide's title (e.g. "Dialog 1") */
  title: string;
  /** whether this slide is currently selected */
  selected: boolean;
  /** image to render as this slide's preview */
  imageSrc: string;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
  /** whether slide can be moved up */
  canMoveUp?: boolean;
  /** whether slide can be moved down */
  canMoveDown?: boolean;
  /** callback to parent specifying that user wishes to move slide up */
  onSlideMoveUp?: () => void;
  /** callback to parent specifying that user wishes to move slide down */
  onSlideMoveDown?: () => void;
  /** callback to parent specifying that user wishes to delete this slide */
  onDeleteSlide?: () => void;
} // NarrativeItemSlideProps

export const NarrativeItemSlide = (
  props: NarrativeItemSlideProps
): JSX.Element => {
  const [mouseOverMe, setMouseOverMe] = useState<boolean>(false);

  const {
    imageSrc,
    selected,
    title,
    onSlideSelected,

    canMoveDown,
    canMoveUp,
    onDeleteSlide,
    onSlideMoveDown,
    onSlideMoveUp,
  } = props;

  return (
    <Root
      selected={selected}
      onMouseOver={() => setMouseOverMe(true)}
      onMouseOut={() => setMouseOverMe(false)}
    >
      <Slide>
        <SlideTitle>{title}</SlideTitle>
        <SlideContainer onClick={onSlideSelected}>
          <StagePreview src={imageSrc} />
        </SlideContainer>
      </Slide>

      {(mouseOverMe || selected) && (
        <>
          <DeleteSlideIcon onClick={onDeleteSlide} />
          {/* Move slide up button */}
          <MoveUpIcon onClick={onSlideMoveUp} />
          {/* Move slide down button */}
          <MoveDownIcon onClick={onSlideMoveUp} />
        </>
      )}
    </Root>
  );
}; // NarrativeItemSlide
