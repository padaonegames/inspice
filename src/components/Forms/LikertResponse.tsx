import styled from "styled-components";

const LikertResponseContainer = styled.label`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0; /* never set to auto */
  // min-width: 1.6em;
  width: min-content;
  text-align: center;
  position: relative;
`;

const LikertText = styled.span`
  font-size: 0.9em;
  width: 50%;
  font-weight: 200;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: ${(props) => props.theme.textColor};
`;

const LikertInputText = styled.input`
  position: relative;
  font-size: 0.9em;
  font-weight: 200;
  text-align: center;
  letter-spacing: +0.5px;
  font-family: Raleway;
  width: 70%;

  color: ${(props) => props.theme.textColor};
`;

const VerticalSpace = styled.div`
  height: 0.25em;
`;

interface LikertLineProps {
  visible: boolean;
}
const LikertLine = styled.span<LikertLineProps>`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  display: inline-block;
  width: 50%;
  vertical-align: top;
  margin-top: 0.5em;
  border-top: 3px solid dimgray;
`;

interface LikertIndicatorProps {
  checked: boolean;
  disabled?: boolean;
}
const LikertIndicator = styled.span<LikertIndicatorProps>`
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  border: thin solid
    ${(props) => (props.checked ? "#4a90e2" : props.theme.textColor)};
  background-color: ${(props) => (props.checked ? "#4a90e2" : "#eee")};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  box-sizing: border-box;
  transition: all linear 200ms;

  ${(props) =>
    !props.disabled &&
    `
  cursor: pointer;
  &:hover {
    background-color: ${props.checked ? "#4a90e2" : "darkgray"};
  }
  `}
`;

interface LikertInputProps {
  disabled?: boolean;
}
const LikertInput = styled.input<LikertInputProps>`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  ${(props) => !props.disabled && `cursor: pointer;`}
`;

export interface LikertResponseProps {
  /** Whether this response is selected or not */
  selected?: boolean;
  /** Text to be displayed underneath the likert indicator */
  responseText: string;
  /** callback to parent component specifying that the answer has been selected */
  onResponseSelected?: () => void;
  /** Relative position of this answer within the list */
  position?: "first" | "middle" | "last";
  /** whether this response accepts rejects user input */
  disabled?: boolean;
}

export const LikertResponse = (props: LikertResponseProps): JSX.Element => {
  const {
    position = "middle",
    selected = false,
    responseText,
    onResponseSelected,
    disabled = false,
  } = props;

  const handleSelectAnswer = () => {
    if (!disabled && onResponseSelected) onResponseSelected();
  }; // handleSelectAnswer

  return (
    <LikertResponseContainer>
      <LikertLine visible={position !== "first"} />
      <LikertLine visible={position !== "last"} />
      <LikertInput
        disabled={disabled}
        type="radio"
        name={responseText}
        onChange={handleSelectAnswer}
      />
      <LikertIndicator checked={selected} disabled={disabled} />
      <VerticalSpace />
      <LikertText>{responseText}</LikertText>
    </LikertResponseContainer>
  );
};

export default LikertResponse;

export interface EditableLikertResponseProps {
  /** Whether this response is selected or not */
  selected?: boolean;
  /** Text to be displayed underneath the likert indicator */
  responseText: string;
  /** callback to parent component specifying that the answer has been selected */
  onResponseSelected?: () => void;
  onScaleEdited?: (newName: string) => void;
  /** Relative position of this answer within the list */
  position?: "first" | "middle" | "last";
}

export const EditableLikertResponse = (
  props: EditableLikertResponseProps
): JSX.Element => {
  const {
    position = "middle",
    selected = false,
    responseText,
    onScaleEdited,
    onResponseSelected,
  } = props;

  const handleSelectAnswer = () => {
    if (onResponseSelected) onResponseSelected();
  };

  const handleAnswerEdited = (value: string) => {
    if (onScaleEdited) onScaleEdited(value);
  };

  return (
    <LikertResponseContainer>
      <LikertLine key={`leftLine`} visible={position !== "first"} />
      <LikertLine key={`rightLine`} visible={position !== "last"} />
      <LikertInput
        type="radio"
        name={responseText}
        onChange={handleSelectAnswer}
      />
      <LikertIndicator checked={selected} />
      <VerticalSpace />
      {/* Input to adjust the scale's value */}
      <LikertInputText
        type="text"
        defaultValue={responseText}
        maxLength={10}
        onChange={(event) => handleAnswerEdited(event.target.value)}
      />
    </LikertResponseContainer>
  );
};
