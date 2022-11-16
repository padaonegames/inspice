import styled from "styled-components";
import { AddImageIcon, RemoveOptionIcon } from "./Cards/cardStyles";
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";
import { useRef } from "react";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.35em;
`;

/* Create a custom checkbox */
interface CheckMarkProps {
  size?: string;
  type: "radio" | "checkbox";
  enabled?: boolean;
}

const CheckMark = styled.span<CheckMarkProps>`
  height: ${(props) => props.size ?? "1.5em"};
  width: ${(props) => props.size ?? "1.5em"};
  background-color: #eee;
  margin-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85em;
  position: relative;

  ${(props) =>
    props.enabled &&
    `
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
    background-color: ${props.theme.secondaryButtonColor};
  }
  `}

  ${(props) => props.type === "radio" && "border-radius: 50%;"}
`;

interface InputTextProps {
  /** whether this input admits text, click interactions, or no interactions. "text" by default */
  inputType?: "text" | "none" | "click";
}
export const InputText = styled.input<InputTextProps>`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 85%;
  margin-top: 0.2em;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 2px solid transparent;
  cursor: ${(props) =>
    props.inputType === "text"
      ? "text"
      : props.inputType === "click"
      ? "pointer"
      : "default"};
  outline: none;
  padding: 2px 0;
  background-color: transparent;
  transition: all 0s;

  &:hover {
    ${(props) =>
      props.inputType !== "none" && `border-bottom: 2px solid #dadce0;`}
  }

  ${(props) =>
    props.inputType === "text" &&
    `
    &:focus {
      transition: border-bottom 0.25s;
      border-bottom: 3px solid #c44c49;
    }`}
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0 0.5em;
  margin-bottom: 0.35em;

  font-size: 1em;
  font-weight: normal;
  letter-spacing: +0.5px;
  font-family: Raleway;
  color: ${(props) => props.theme.textColor};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BoxCheckedIcon = styled(CheckCircle)`
  margin: auto;
  height: 100%;
  width: 100%;
  padding: 0.1em;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.theme.secondaryButtonColor};

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0.5rem 0px;
  }
`;

interface ImagePreviewContainerProps {
  src?: string;
}
const ImagePreviewContainer = styled.div<ImagePreviewContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 11em;
  height: 11em;
  margin: 0.15em auto;

  background-size: contain;
  border-radius: 0.5rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: black;
  ${(props) =>
    props.src
      ? `background-image: url(${props.src});`
      : `background-color: darkred;`}
`;

export interface EditableCheckBoxInputProps {
  /** Text that will be displayed next to the checkbox */
  labelText: string;
  /** Image that will be displayed underneath the text input */
  imageSrc?: string;
  /** size of the checkbox */
  boxSize?: string;
  /** Whether to display checkbox as a radio button or a square */
  style?: "radio" | "checkbox";
  /** callback to parent specifying that label Text has been modified by the user */
  onLabelTextChanged?: (value: string) => void;
  /** callback to parent specifying that user wishes to delete this option */
  onObjectRemoved?: () => void;
  /** callback to parent specifying that user wishes to add an image to this option */
  onAddImageRequested?: () => void;
  /** callback to parent specifying that input text was clicked on */
  onInputTextClicked?: () => void;
  /** Placeholder to show if labelText is an empty string */
  labelTextPlaceholder?: string;
  /** whether add image option is allowed for the current item */
  addImageEnabled?: boolean;
  /** whether this input admits text, click interactions, or no interactions. "text" by default */
  inputType?: "text" | "none" | "click";
  /** whether this input element can be removed, true by default */
  canBeRemoved?: boolean;
  /** checkbox content */
  boxContent:
    | {
        /** Whether it should be possible to check/ uncheck this box */
        type: "check";
        /** Whether this box is checked */
        checked?: boolean;
        /** whether clicking on this box is active */
        clickEnabled?: boolean;
        /** callback to parent specifying that user clicked on this box */
        onCheckToggle?: () => void;
      }
    | {
        type: "number";
        /** box number */
        boxNumber: number;
      }
    | {
        type: "none";
      };
} // EditableCheckBoxInputProps

export const EditableCheckBoxInput = (
  props: EditableCheckBoxInputProps
): JSX.Element => {
  const {
    boxSize = "25px",
    style = "checkbox",
    canBeRemoved = true,
    labelText,
    imageSrc,
    addImageEnabled,
    inputType = "text",
    onLabelTextChanged,
    onObjectRemoved,
    onAddImageRequested,
    onInputTextClicked,
    labelTextPlaceholder = "Write a text...",
    boxContent,
  } = props;

  const handleCheckMarkClicked = () => {
    if (
      boxContent.type === "none" ||
      boxContent.type === "number" ||
      !boxContent.onCheckToggle
    )
      return;
    boxContent.onCheckToggle();
  }; // handleCheckMarkClicked

  const renderCheckMarkContent = () => {
    if (boxContent.type === "number") {
      return boxContent.boxNumber ? <>{boxContent.boxNumber}</> : <></>;
    } else if (boxContent.type === "check") {
      return boxContent.checked ? <BoxCheckedIcon /> : <></>;
    }
    return <></>;
  }; // renderCheckMarkContent

  const handleInputFocus = () => {
    if (inputType !== "none" || inputRef.current === null) return;
    inputRef.current.blur();
  }; // handleInputFocus

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Root>
      {/* Always enable interactions with container in text and click modes */}
      <Container>
        <CheckMark
          type={style}
          size={boxSize}
          onClick={handleCheckMarkClicked}
          enabled={boxContent.type === "check"}
        >
          {renderCheckMarkContent()}
        </CheckMark>
        <InputText
          ref={inputRef}
          onFocus={handleInputFocus}
          inputType={inputType}
          readOnly={inputType !== "text"}
          placeholder={labelTextPlaceholder}
          maxLength={500}
          value={labelText}
          onClick={() => {
            if (inputType === "click" && onInputTextClicked)
              onInputTextClicked();
          }}
          onChange={(event) => {
            if (inputType === "text" && onLabelTextChanged)
              onLabelTextChanged(event.target.value);
          }}
        />
        {inputType === "text" && addImageEnabled && (
          <AddImageIcon onClick={onAddImageRequested} title="Add an image" />
        )}
        {canBeRemoved && inputType !== "none" && (
          <RemoveOptionIcon
            onClick={onObjectRemoved}
            title="Remove this answer"
          />
        )}
      </Container>
      {imageSrc && <ImagePreviewContainer src={imageSrc} />}
    </Root>
  );
};

export default EditableCheckBoxInput;
