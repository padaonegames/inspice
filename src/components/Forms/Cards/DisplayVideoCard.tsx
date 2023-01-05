import {
  DisplayVideoFieldDefinition,
  ConsumableFieldProps,
} from "../../../services/multistageFormActivity.model";
import { InputText } from "./cardStyles";
import FormCard from "./FormCard";
import ReactPlayer from "react-player/lazy";
import { EditableFieldProps } from "./EditableFieldCard";

const getVideoID = (link: string) => {
  var regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = link.match(regExp);

  if (match && match[2].length == 11) return match[2];
  else return "";
}; // getVideoID

export interface DisplayVideoCardProps
  extends ConsumableFieldProps<DisplayVideoFieldDefinition, {}> {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // DisplayVideoCardProps

export const DisplayVideoCard = (props: DisplayVideoCardProps): JSX.Element => {
  const { promptText = "", requiredAlert, required, fieldPayload } = props;

  const { src } = fieldPayload;

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <ReactPlayer
        url={src}
        style={{
          marginTop: "1em",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      />
    </FormCard>
  );
}; // DisplayVideoCard

export interface EditableDisplayVideoCardContentProps
  extends EditableFieldProps<DisplayVideoFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableDisplayVideoCardContentProps

export const EditableDisplayVideoCardContent = (
  props: EditableDisplayVideoCardContentProps
): JSX.Element => {
  const { fieldPayload, onPayloadChanged } = props;

  const { src } = fieldPayload;

  const handleEditVideoSource = (link: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({ src: link });
  }; // handleEditVideoSource

  return (
    <>
      <InputText
        placeholder={"Youtube video link"}
        value={src}
        textWidth={0.95}
        onChange={(event) => handleEditVideoSource(event.target.value)}
      />
      <ReactPlayer
        url={src}
        style={{
          marginTop: "1em",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      />
    </>
  );
}; // EditableDisplayVideoCardContent

export default DisplayVideoCard;
