import styled from "styled-components";

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
  height: calc(100% - 2rem);
  box-sizing: border-box;
  color: rgb(51, 51, 51);
`;

interface PuzzlePreviewProps {
  selected?: boolean;
}
const PuzzlePreview = styled.div<PuzzlePreviewProps>`
  display: flex;
  flex-direction: column;
  -moz-box-pack: justify;
  justify-content: top;
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
  margin-bottom: 0.125rem;
  color: rgb(110, 110, 110);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.33;
  letter-spacing: 0.2px;
  max-height: 1rem;
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

export interface PuzzleSlideProps {
  /** Type of puzzle represented by this slide */
  puzzleType: string;
  // TODO: Generalize to multiple puzzle types
  prompt: string;
  /** whether this slide is currently selected */
  selected: boolean;
  /** callback to parent notifying of slide being selected by the user */
  onSlideSelected?: () => void;
} // PuzzleSlideProps

export const PuzzleSlide = (props: PuzzleSlideProps): JSX.Element => {

  const {
    puzzleType,
    prompt,
    selected,
    onSlideSelected
  } = props;

  return (
    <Root selected={selected}>
      <SlideTitle>{puzzleType}</SlideTitle>
      <SlideContainer>
        <PuzzlePreview selected={selected}>
          <PreviewTitle>{prompt}</PreviewTitle>
          <PreviewAnswers>
            <PreviewAnswer />
            <PreviewAnswer />
            <PreviewAnswer />
            <PreviewAnswer />
          </PreviewAnswers>
        </PuzzlePreview>
      </SlideContainer>
    </Root>
  );
}; // PuzzleSlide