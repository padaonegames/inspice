import styled from "styled-components";
import { Plus } from "styled-icons/bootstrap";
import { Cross } from "@styled-icons/entypo/Cross";
import { ImageAdd } from "@styled-icons/boxicons-regular/ImageAdd";
import {
  AlertCircleOutline,
  CloseOutline,
} from "styled-icons/evaicons-outline";

export const PromptText = styled.div`
  font-size: 1em;
  font-weight: 400;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.contentFont};
  line-height: 150%;
  width: 100%;
  white-space: pre-wrap;
`;

export const InputFile = styled.input`
  display: none;
`;

interface NavigationButtonProps {
  colorMode?: "primary" | "secondary";
}
export const NavigationButton = styled.label<NavigationButtonProps>`
  font-size: 0.95em;
  font-weight: 500;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
  cursor: pointer;
  color: ${(props) =>
    props.colorMode === "secondary" ? props.theme.textColor : "white"};

  height: 2.5em;
  width: fit-content;
  padding: 0.25em 1.75em;
  margin-right: 1em;

  background-color: ${(props) =>
    props.colorMode === "primary"
      ? props.theme.secondaryButtonColor
      : props.theme.cardBackground};
  border-radius: 0.35rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.141), 0 1px 3px 0 rgba(0, 0, 0, 0.122);
  border: 1px solid #dfe1e5;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid ${(props) => props.theme.secondaryButtonColor};
  }
`;
NavigationButton.defaultProps = { colorMode: "secondary" };

export const InputFileButton = styled.label`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

  @media (max-width: 768px) {
    height: 30px;
    width: 95%;
    margin: 2.5%;
  }

  @media (min-width: 768px) {
    height: 30px;
    width: 25%;
  }

  background-color: transparent;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.25rem 0px;
  border: 2px solid #dadce0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
  }
`;

interface InputTextProps {
  /** proportion of parent to use to display text */
  textWidth?: number;
}
export const InputText = styled.input<InputTextProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: ${(props) =>
    props.textWidth !== undefined ? props.textWidth * 100 : 50}%;
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 2px solid #dadce0;
  outline: none;
  padding: 2px 0;
  background-color: transparent;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:focus {
    border-bottom: 3px solid #c44c49;
  }
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
  border-bottom: 2px solid #dadce0;
  outline: none;
  padding: 0.65em 0.65em 0.65em 0.05em;
  background-color: ${(props) =>
    props.dimBackground ? "#f8f9fa" : "transparent"};
  resize: none;
  overflow-y: hidden;

  &:focus {
    border-bottom: 3px solid #c44c49;
  }
`;

export const SelectFieldTypeDropdownButton = styled.span`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  margin-top: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};

  position: relative;

  height: 2.5em;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 768px) {
    width: 45%;
  }

  background-color: transparent;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.1rem 0px;
  border: 1px solid #dadce0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.85em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.25rem 0px;
  }
`;

interface InputSegmentProps {
  numCharacters: number;
}
export const InputSegment = styled.input<InputSegmentProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: ${(props) => props.numCharacters * 0.7}em;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 2px solid #dadce0;
  outline: none;
  background-color: transparent;

  &:focus {
    border-bottom: 3px solid #c44c49;
  }
`;

export const InputSegmentWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
`;

export const InputSegmentTag = styled.div`
  display: flex;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 16px;
  color: #70757a;
  word-break: keep-all;
  font-family: ${(props) => props.theme.contentFont};
  margin-bottom: 5px;
`;

export const DateSlash = styled.div`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  align-self: flex-end;
  margin: 0 7px;
  margin-bottom: 2px;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: auto;
`;

interface CardPanelProps {
  /** True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
  /** True if user tried to submit the form without filling a required field */
  isFocused?: boolean;
  /** whether to add padding to card (true by default) */
  addPadding?: boolean;
  /** whether to add a focus effect to left border (true by default) */
  addFocusEffect?: boolean;
  /** whether this card should be a visible container or just provide layout */
  showCardBackground?: boolean;
}
export const CardPanel = styled.div<CardPanelProps>`
  position: relative;
  ${(props) =>
    (props.addPadding === undefined || props.addPadding) &&
    `padding: 16px 16px 24px 16px`};
  background-color: ${(props) =>
    props.showCardBackground ? props.theme.cardBackground : "transparent"};
  ${(props) => !props.requiredAlert && "border: 1px solid #dadce0;"}
  ${(props) => props.requiredAlert && "border: 1px solid #c44c49;"}

  ${(props) =>
    (props.addFocusEffect === undefined || props.addFocusEffect) &&
    `
    &:focus-within {
      border-left: 6px solid #c44c49;
    }
    &:focus {
      outline: none !important;
      border-left: 6px solid #c44c49;
    }
    ${props.isFocused ? "border-left: 6px solid #c44c49;" : ""}
    `}

  border-radius: 8px;
  min-width: fit-content;
  width: 100%;
  height: fit-content;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;

  ${(props) => !props.showCardBackground && `border: none;`}
`;
CardPanel.defaultProps = { showCardBackground: true };

interface CardChildrenContainerProps {
  layout?: "column" | "row";
}
export const CardChildrenContainer = styled.div<CardChildrenContainerProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.layout};
`;
CardChildrenContainer.defaultProps = { layout: "column" };

export const Root = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
    align-self: center;
    margin: 1%;
  }

  @media (min-width: 768px) {
    max-width: 770px;
    width: 97.5%;
    margin: 0.5%;
  }
`;

export const RequiredQuestionSpan = styled.div`
  color: #d93025;
  font-size: 0.8em;
  font-family: ${(props) => props.theme.contentFont};
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RequiredAlertIcon = styled(AlertCircleOutline)`
  color: #d93025;
  font-family: ${(props) => props.theme.contentFont};
  height: 1.25em;
  width: 1.25em;
  margin-right: 0.5em;
`;

export const RequiredAsterisk = styled.span`
  color: #d93025;
  font-size: 1.2em;
  font-family: ${(props) => props.theme.contentFont};
`;

export const TitleText = styled.div`
  // font: 400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: 1.45em;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
`;

export const EditableTitleText = styled.input`
  // font: 400 16px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: 1.45em;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;

  border: none;
  border-bottom: 2px solid #dadce0;
  outline: none;
  padding: 2px 0;
  background-color: transparent;

  &:focus {
    border-bottom: 3px solid #c44c49;
  }
`;

export const TitleColor = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 8px 8px 0 0;
  background-color: #c44c49;
`;

export const StepDescription = styled.div`
  font-size: 0.95em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  margin-top: 5px;
  color: ${(props) => props.theme.textColor};
  white-space: pre-line;
`;

export const EditableStepDescription = styled.textarea`
  font-size: 0.95em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  margin-top: 5px;
  color: ${(props) => props.theme.textColor};

  height: 6em;
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

export const EditableText = styled.textarea`
  font-size: 0.95em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 100%;
  margin-top: 5px;
  color: ${(props) => props.theme.textColor};

  height: 8em;
  border: none;
  border-bottom: 2px solid #dadce0;
  outline: none;
  padding: 2px 0;
  background-color: transparent;
  resize: vertical;

  &:focus {
    border-bottom: 3px solid #c44c49;
  }
`;

interface ImagePreviewProps {
  sizing?: "small" | "medium" | "large";
}
export const ImagePreview = styled.img<ImagePreviewProps>`
  object-fit: cover;
  align-self: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (min-width: 768px) {
    width: ${(props) =>
      props.sizing === "small"
        ? "40%"
        : props.sizing === "medium"
        ? "57.5%"
        : "72.5%"};
  }
`;

ImagePreview.defaultProps = { sizing: "medium" };

export const TagsContainer = styled.div`
  line-height: 135%;
  width: 100%;
  height: auto;
  min-height: 1.5em;
  max-height: 35vh;
  overflow-y: auto;
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 2px solid #dadce0;
  padding: 2px 0;
  background-color: transparent;

  display: flex;
  flex-flow: row wrap;
  -moz-box-pack: center;
  justify-content: start;
`;

export const TagText = styled.span`
  font-size: 0.8em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  color: ${(props) => props.theme.textColor};

  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  line-height: 1.1;
  padding: 3px;
`;

export const EditableTagText = styled.input`
  font-size: 0.8em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  color: ${(props) => props.theme.textColor};

  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1;
  padding: 3px;

  border: none;
  border-bottom: 1px solid #dadce0;
  outline: none;
  background-color: transparent;

  &:focus {
    border-bottom: 2px solid #c44c49;
  }
`;

interface TagWrapperProps {
  error?: boolean;
}
export const TagWrapper = styled.div<TagWrapperProps>`
  ${(props) => !props.error && "border: 2px solid #dadce0;"}
  ${(props) => props.error && "border: 2px solid #c44c49;"}
  padding: 2px 5px;
  background-color: transparent;
  border-radius: 10px;
  // box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.25rem 0px;
  margin: 0.6%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RemoveTagIcon = styled(CloseOutline)`
  height: 0.85em;
  width: 0.85em;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const RemoveOptionIcon = styled(Cross)`
  height: 1.5em;
  width: 1.5em;
  padding: 0.1em;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  margin: auto;
  border-radius: 50%;
  color: #696d72;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const AddImageIcon = styled(ImageAdd)`
  height: 1.5em;
  width: 1.5em;
  padding: 0.1em;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  margin: auto;
  border-radius: 50%;
  color: #696d72;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const NewTagButton = styled.div`
  border: 1px solid #dadce0;
  padding: 2px 5px;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.25rem 0px;
  margin: 0.6%;
  border: 2px solid #dadce0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 0.25rem 0px;
  }
`;

export const NewTagIcon = styled(Plus)`
  color: ${(props) => props.theme.textColor};
  height: 1.15em;
  width: 1.15em;
`;

export const NewTagText = styled.span`
  font-size: 0.8em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  color: ${(props) => props.theme.textColor};

  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  line-height: 1.1;
  padding: 3px;
`;

interface CheckboxListProps {
  layout?: "column" | "row";
}
export const CheckboxList = styled.div<CheckboxListProps>`
  margin-top: 5px;
  display: flex;
  background-color: transparent;
  flex-direction: ${(props) => props.layout};
  align-items: left;

  border-bottom: 2px solid #dadce0;
  padding: 5px 0;
  background-color: transparent;
`;
CheckboxList.defaultProps = { layout: "column" };

export const CheckboxOption = styled.div`
  margin-top: 0.1em;
  margin-left: 0.3em;
  margin-right: 0.3em;
  border-top: none;
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  color: ${(props) => props.theme.textColor};
  line-height: 135%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
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

export const DottedLine = styled.div`
  height: 0.5em;
  width: 100%;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
  margin: 0.5em 0;
`;

export const HorizontalLine = styled.div`
  height: 1.75em;
  width: 0.5em;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 2px 0px 0px;
  margin: 0 0.5em;
`;
