import styled from "styled-components";
import { Exit } from "@styled-icons/icomoon/Exit";
import { EscapeRoomStage } from "../../../services/escapeRoomActivity.model";

interface RootProps {
  selected?: boolean;
}
const Root = styled.div<RootProps>`
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

const PreviewTitle = styled.div`
  margin-bottom: 0.25rem;
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

const PreviewAnswers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3px;
  color: rgb(178, 178, 178);
`;

const PreviewAnswer = styled.div`
  position: relative;
  width: calc(100% - 0.125rem);
  height: 7px;
  margin-bottom: 3px;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 0.125rem;
`;

export interface EscapeRoomStageSlideProps {
  stage: EscapeRoomStage;
  /** whether this slide is currently selected */
  selected: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
} // EscapeRoomStageSlideProps

export const EscapeRoomStageSlide = (props: EscapeRoomStageSlideProps): JSX.Element => {

  const {
    stage,
    selected,
    onSlideSelected
  } = props;

  // TODO: Ahora mismo las miniaturas las dibujamos aquí de forma condicional.
  // Lo ideal sería hacer como con los componentes de edición y que cada componente 
  // (stage) exponga su propia manera de renderizarse como una slide.

  const renderStagePreview = () => {

    if (stage.type === 'multiple-choice') {
      return (
        <>
          <PreviewTitle>Prompt</PreviewTitle>
          <PreviewAnswers>
            {[...Array(stage.payload.answers.length)].map((_, i) => <PreviewAnswer key={i} />)}
          </PreviewAnswers>
        </>
      );
    }

    if (stage.type === 'room') {
      // render room preview
      // const room = stage.room;

      return (
        <></>
      );
    }
  };

  return (
    <Root
      onClick={onSlideSelected}
      selected={selected}
    >
      <SlideTitle>{stage.type}</SlideTitle>
      <SlideContainer>
        <StagePreview selected={selected}>
          {renderStagePreview()}
        </StagePreview>
      </SlideContainer>
    </Root>
  );
}; // EscapeRoomStageSlide