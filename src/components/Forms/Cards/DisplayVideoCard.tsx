import {
  DisplayVideoFieldDefinition,
  ConsumableFieldProps,
} from "../../../services/multistageFormActivity.model";
import { InputText } from "./cardStyles";
import FormCard from "./FormCard";
import ReactPlayer from "react-player/lazy";
import { EditableFieldProps } from "./EditableFieldCard";

export interface DisplayVideoCardProps
  extends ConsumableFieldProps<DisplayVideoFieldDefinition, {}> {} // DisplayVideoCardProps

export const DisplayVideoCard = (props: DisplayVideoCardProps): JSX.Element => {
  const { fieldPayload, ...formProps } = props;

  const { src } = fieldPayload;

  return (
    <FormCard {...formProps}>
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
