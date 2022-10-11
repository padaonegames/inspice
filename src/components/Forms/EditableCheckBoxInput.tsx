import styled from "styled-components";
import { RemoveOptionIcon } from "./Cards/cardStyles";
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";

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

export const InputText = styled.input`
  font-size: 0.9em;
  font-weight: 200;
  font-family: ${(props) => props.theme.contentFont};
  line-height: 135%;
  width: 85%;
  margin-top: 0.2em;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 2px solid transparent;
  outline: none;
  padding: 2px 0;
  background-color: transparent;
  transition: all 0s;
`;

/* The container */
interface ContainerProps {
  enabled?: boolean;
}
const Container = styled.div<ContainerProps>`
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

  &:hover ${InputText} {
    border-bottom: 2px solid #dadce0;
  }

  ${InputText} {
    ${(props) =>
      props.enabled &&
      `
    &:focus {
      transition: border-bottom 0.25s;
      border-bottom: 3px solid #c44c49;
    }`}
  }
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

export interface EditableCheckBoxInputProps {
  /** Text that will be displayed next to the checkbox */
  labelText: string;
  /** size of the checkbox */
  boxSize?: string;
  /** Whether to display checkbox as a radio button or a square */
  style?: "radio" | "checkbox";
  /** whether this input should be enabled */
  enabled?: boolean;
  /** callback to parent specifying that label Text has been modified by the user */
  onLabelTextChanged?: (value: string) => void;
  /** callback to parent specifying that user wishes to delete this option */
  onObjectRemoved?: () => void;
  /** Placeholder to show if labelText is an empty string */
  labelTextPlaceholder?: string;
  /** checkbox content */
  boxContent:
    | {
        /** Whether it should be possible to check/ uncheck this box */
        type: "check";
        /** Whether this box is checked */
        checked?: boolean;
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
    enabled = true,
    labelText,
    onLabelTextChanged,
    onObjectRemoved,
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

  return (
    <Container enabled={enabled}>
      <CheckMark
        type={style}
        size={boxSize}
        onClick={handleCheckMarkClicked}
        enabled={boxContent.type === "check"}
      >
        {renderCheckMarkContent()}
      </CheckMark>
      <InputText
        readOnly={!enabled}
        placeholder={labelTextPlaceholder}
        maxLength={500}
        value={labelText}
        onChange={(event) => {
          if (onLabelTextChanged) onLabelTextChanged(event.target.value);
        }}
      />
      {enabled && <RemoveOptionIcon onClick={onObjectRemoved} />}
    </Container>
  );
};

export default EditableCheckBoxInput;
