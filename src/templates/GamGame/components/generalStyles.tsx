import styled, { css } from "styled-components";
import lineBackground from "./../../../components/line-header-point.png";
import { Cross } from "@styled-icons/entypo/Cross";
import { RightArrowCircle } from "@styled-icons/boxicons-regular/RightArrowCircle";

const arrowStyle = css`
  width: auto;
  height: 2.25rem;
  color: white;
  margin: auto;
`;

export const NextArrowIcon = styled(RightArrowCircle)`
  ${arrowStyle}
`;

export const Root = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    align-self: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 16px;
    width: 85%;
    max-width: 1200px;
    align-items: left;
    margin-bottom: 15px;
    padding: 0;
    flex-direction: row;
  }
`;

export const DetailUpperPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 16px 24px 16px;
`;

export const DetailMainInfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

interface DetailActionPanelProps {
  disabled?: boolean;
}
export const DetailActionPanel = styled.div<DetailActionPanelProps>`
  width: 20%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-size: 0.65em;
  font-weight: 400;
  letter-spacing: +1px;
  font-family: "EB Garamond";
  text-transform: uppercase;
  ${(props) => !props.disabled && "cursor: pointer;"}
  ${(props) => props.disabled && "opacity: 0.5;"}
`;

export interface DetailArtworkDisplayProps {
  backgroundImage: string;
}

export const DetailArtworkDisplay = styled.div<DetailArtworkDisplayProps>`
  width: 100%;
  object-fit: contain;
  @media (max-width: 768px) {
    height: 90vw;
  }

  @media (min-width: 768px) {
    height: 100vw;
    max-height: 60vh;
  }

  position: relative;

  background-image: ${(props) => `url(${props.backgroundImage})`};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-color: ${(props) => props.theme.artworkDisplayBackground};
`;

export const ArtworkDescription = styled.p`
  font-weight: 400;
  line-height: 1.5;
  transition: color 0.5s ease;
  margin: auto 0 auto 0;
  word-wrap: break-word;
  padding-right: 15px;
`;

export const NoItemsFoundText = styled.p`
  font-weight: 400;
  line-height: 1.5;
  transition: color 0.5s ease;
  margin: 2em auto;
  word-wrap: break-word;
`;

export const ArtworkTitle = styled.p`
  font-size: 1.25em;
  font-weight: 500;
  font-style: italic;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
  word-wrap: break-word;
`;

export const ArtworkAuthor = styled.p`
  font-weight: 700;
  font-style: bold;
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

export const ArtworkDate = styled.p`
  letter-spacing: +0.5px;
  margin-bottom: 5px;
`;

export const ArtworkNotes = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  font-style: italic;
  margin-top: 1em;
`;

export const ArtworkDataContainer = styled.div`
  height: auto;
  padding: 1em;
  margin-bottom: 0.5em;
`;

export const ClickableText = styled.p`
  font-size: 0.9em;
  font-weight: 400;
  color: ${(props) => props.theme.clickableTextFontColor};
  margin-top: 1em;
  text-decoration: underline;
  cursor: pointer;
`;

export const InputArea = styled.textarea`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  height: 6em;
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 2px solid #dadce0;
  outline: none;
  padding: 2px 0;
  background-color: transparent;
  resize: none;

  &:focus {
    border-bottom: 3px solid #c44c49;
  }
`;

export const VerticalSeparator = styled.div`
  width: 85%;
  max-width: 960px;
  height: 1em;
  background: url(${lineBackground}) repeat-x 0 center;
  align-self: center;
`;

export const ArtworkListDottedLine = styled.div`
  height: 0.5em;
  width: 100%;
  border-style: dotted;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin-bottom: 0.75em;
`;

export const ArtworkGrid = styled.div`
  position: relative;
  height: fit-content;
  width: 100%;
  max-width: 730px;
  display: grid;
  align-self: top;

  @media (max-width: 768px) {
    justify-content: center;
    padding-bottom: 1em;
  }

  @media (min-width: 768px) {
    padding-top: 1em;
    justify-content: space-around;
    align-content: center;
    grid-row-gap: 1.5em;
    grid-template-columns: auto auto;
    padding-left: 15px;
  }

  padding-bottom: 24px;
`;

export const StoryGrid = ArtworkGrid;

export const StepRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 65px;
`;

export interface ProgressButtonProps {
  enabled?: boolean;
}
export const ProgressButton = styled.button<ProgressButtonProps>`
  border-radius: 15px;
  background-color: ${(props) =>
    props.enabled ? "rgb(196, 76, 73)" : "rgba(196, 76, 73, 0.5)"};
  color: ${(props) => (props.enabled ? "white" : "rgb(230, 230, 230)")};
  font-weight: 700;
  padding: 6px 10px;
  cursor: ${(props) => (props.enabled ? "pointer" : "default")};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  max-width: 25em;
  width: 100%;

  ${(props) =>
    props.enabled &&
    `
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
    }
  `}
`;

export const StoryDisplayUpperPanel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const StoryDisplayMainInfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

export const StoryDisplaySelectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0.5em;
  }
`;

export const StoryDataContainer = styled.div`
  margin-bottom: 0.5em;
  height: auto;
  padding: 1em;
`;

export const StoryDisplayHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 12px;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0 5px 0;
`;

export const StoryDisplayBottomRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 12px;
  align-items: center;
  justify-content: flex-end;
  margin: 0 0 1em 0;
`;

export const StoryDisplayQuitIcon = styled(Cross)`
  color: ${(props) => props.theme.textColor};
  height: 1.5em;
  width: 1.2em;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export interface StoryDisplayActionButtonProps {
  enabled?: boolean;
}
export const StoryDisplayActionButton = styled.button<StoryDisplayActionButtonProps>`
  border-radius: 15px;
  background-color: ${(props) =>
    props.enabled ? "rgb(196, 76, 73)" : "rgba(196, 76, 73, 0.5)"};
  color: ${(props) => (props.enabled ? "white" : "rgb(230, 230, 230)")};
  font-weight: 700;
  padding: 6px 10px;
  cursor: ${(props) => (props.enabled ? "pointer" : "default")};

  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0.5rem 0px;
  }
`;
