import { useState } from 'react';
import { ItemDefinition, SupportedPuzzle, SupportedStage } from "../../../services/escapeRoomActivity.model";

import styled from "styled-components";
import {Bin} from "@styled-icons/icomoon/Bin";
import {Copy} from "@styled-icons/boxicons-regular/Copy";


interface RootProps {
  selected?: boolean;
}
const Root = styled.div<RootProps>`
  position: relative; 
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background-color: transparent;
  user-select: none;
  padding: 12px 16px 12px 0px;
  display: block;
  border: 0px none;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
  color: rgb(51, 51, 51);
  max-height: 141px;
  ${props => props.selected && `
  background-color: rgb(234, 244, 252);
  `}
`;


interface SliceButtonProps {
  heigh?: number ;
}

const SliceButton = styled.div<SliceButtonProps>`
  position: absolute;
  top: ${props => props.heigh}%;
  padding: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  box-sizing: border-box;
  color: rgb(247, 0, 255);
  background-color:rgb(222, 222, 222);
  border-radius: 0.75rem;
  &:hover {
    transition: border background-color visibility  1s;
    border: 3px solid rgb(200, 200, 200);
    background-color:  rgb(180, 180, 180);
  }
`;

const DuplicateIcon = styled(Copy)`
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`
const DeleteIcon = styled(Bin)`
  color: rgb(0, 0, 0);
  height: 1.25em;
  width: 1.25em;
`


const SlideTitle = styled.div`
  display: flex;
  flex: 0 1 auto;
  -moz-box-pack: start;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 0.25em 0px 0.25em 1em;
  padding: 0px;
  border: 0px none;

  font-size: 0.75rem;
  font-weight: 500;
  font-family: ${props => props.theme.contentFont};
`;

const SlideContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  height: calc(100% - 1.25rem);
  box-sizing: border-box;
  color: rgb(51, 51, 51);
`;

interface StagePreviewProps {
  selected?: boolean;
}
const StagePreview = styled.div<StagePreviewProps>`
  display: flex;
  flex-direction: column;
  -moz-box-pack: justify;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 100%;
  flex: 1 1 0%;
  padding: 0.25rem 0.5rem;
  color: rgb(178, 178, 178);

  margin: 0.25em 0.5em;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 0.25rem;

  background-color: ${props => props.selected ? 'white' : '#f2f2f1'};
  transition: border 0.25s;
  &:hover {
    transition: border 0.25s;
    ${props => !props.selected && `
    border: 3px solid rgb(200, 200, 200);
    `}
  }
`;



type EscapeRoomStageSlidePropsBase<T extends ItemDefinition> = {
  [P in T['type']]: {
    stage: Extract<ItemDefinition, { type: P }>;
    /** whether this slide is currently selected */
    selected: boolean;
    /** component to render the contents of the slide based on the stage payload */
    slidePreviewProducer?: (props: Extract<ItemDefinition, { type: P }>['payload']) => JSX.Element;
    /** callback to parent notifying of slide being selected by the user */
    onSlideSelected?: () => void;

    index: number;

    duplicateStage: (index:number)=> void;
    deleteStage: (index:number)=> void;
  }
} // EscapeRoomStageSlidePropsBase


type EscapeRoomEditorSlideProps<T extends ItemDefinition> = EscapeRoomStageSlidePropsBase<T>[keyof EscapeRoomStageSlidePropsBase<T>];

const EscapeRoomEditorSlide = <T extends ItemDefinition,>(props: EscapeRoomEditorSlideProps<T>): JSX.Element => {

  const [mouseOverMe, setMouseOverMe] = useState<boolean>(false);

  const {
    stage,
    selected,
    slidePreviewProducer,
    onSlideSelected,

    index,
    duplicateStage,
    deleteStage
  } = props;

  return (
    <Root selected={selected} onMouseLeave = {()=>setMouseOverMe(prev => false)}  onMouseEnter={()=>setMouseOverMe(prev => true)}>

      <SlideTitle>{index+1 + " " + stage.type}</SlideTitle>
      <SlideContainer  onClick={onSlideSelected}>
        <StagePreview selected={selected}>
          {slidePreviewProducer && slidePreviewProducer(stage.payload as any)}
        </StagePreview>
      </SlideContainer>

      {mouseOverMe ? 
      <>
        {/* Duplicate slice button */}
        <SliceButton heigh={35}  onClick={ e=>{ duplicateStage && duplicateStage(index)}}>
          <DuplicateIcon></DuplicateIcon>
        </SliceButton>

        {/* Duplicate slice button */}
        <SliceButton heigh={65} onClick={ e=>{ deleteStage && deleteStage(index)}} >
          <DeleteIcon></DeleteIcon>
        </SliceButton>
      </>
      :
      <></>}

  </Root>
  );
}; // EscapeRoomEditorSlide

export type EscapeRoomStageSlideProps = EscapeRoomEditorSlideProps<SupportedStage>;
export const EscapeRoomStageSlide = (props: EscapeRoomStageSlideProps) => EscapeRoomEditorSlide(props);

export type EscapeRoomPuzzleSlideProps = EscapeRoomEditorSlideProps<SupportedPuzzle>;
export const EscapeRoomPuzzleSlide = (props: EscapeRoomPuzzleSlideProps) => EscapeRoomEditorSlide(props);