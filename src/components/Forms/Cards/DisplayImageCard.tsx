import {
  DisplayImageFieldDefinition,
  ConsumableFieldProps,
} from "../../../services/multistageFormActivity.model";
import { ImagePreview, InputText } from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";

const preview_image =
  "https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/512/Preview-icon.png";

export interface DisplayImageCardProps
  extends ConsumableFieldProps<DisplayImageFieldDefinition, {}> {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // DisplayImageCardProps

export const DisplayImageCard = (props: DisplayImageCardProps): JSX.Element => {
  const { promptText = "", requiredAlert, required, fieldPayload } = props;

  const { src } = fieldPayload;

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <ImagePreview src={src} />
    </FormCard>
  );
}; // DisplayImageCard

export interface EditableDisplayImageCardContentProps
  extends EditableFieldProps<DisplayImageFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableDisplayImageCardContentProps

export const EditableDisplayImageCardContent = (
  props: EditableDisplayImageCardContentProps
): JSX.Element => {
  const { fieldPayload, onPayloadChanged } = props;

  const { src } = fieldPayload;

  const handleEditImageSource = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      src: value,
    });
  }; // handleEditImageSource

  const isValidURL = (link: string) => {
    var res = link.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }; // isValidURL

  return (
    <>
      <InputText
        readOnly={false}
        placeholder={"Image link"}
        maxLength={1000}
        textWidth={0.95}
        value={src}
        onChange={(event) => handleEditImageSource(event.target.value)}
      />
      <ImagePreview src={isValidURL(src) ? src : preview_image} />
    </>
  );
}; // EditableDisplayImageCardContent

export default DisplayImageCard;
