import {
  DisplayImageFieldDefinition,
  ConsumableFieldProps,
  DisplayImageSizing,
  availableImageSizings,
} from "../../../services/multistageFormActivity.model";
import CheckBoxInput from "../CheckBoxInput";
import {
  CheckboxList,
  CheckboxOption,
  ImagePreview,
  InputText,
} from "./cardStyles";
import { EditableFieldProps } from "./EditableFieldCard";
import FormCard from "./FormCard";
import MultipleChoiceCard from "./MultipleChoiceCard";

const preview_image =
  "https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/512/Preview-icon.png";

export interface DisplayImageCardProps
  extends ConsumableFieldProps<DisplayImageFieldDefinition, {}> {} // DisplayImageCardProps

export const DisplayImageCard = (props: DisplayImageCardProps): JSX.Element => {
  const { fieldPayload, ...formProps } = props;

  const { src, sizing } = fieldPayload;

  return (
    <FormCard {...formProps}>
      <ImagePreview src={src} sizing={sizing} />
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

  const { src, sizing = "medium" } = fieldPayload;

  const handleEditImageSource = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      src: value,
    });
  }; // handleEditImageSource

  const handleEditImageSizing = (value: DisplayImageSizing) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      sizing: value,
    });
  }; // handleEditImageSizing

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
      <ImagePreview
        src={isValidURL(src) ? src : preview_image}
        sizing={sizing}
      />
      {isValidURL(src) && (
        <MultipleChoiceCard
          promptText="Select a size for this image:"
          required
          fieldPayload={{ answers: [...availableImageSizings], maxAnswers: 1 }}
          response={{
            selectedResponses: [
              sizing === "small" ? 0 : sizing === "medium" ? 1 : 2,
            ],
          }}
          onResponseChanged={(res) =>
            handleEditImageSizing(
              res.selectedResponses.length > 0
                ? availableImageSizings[res.selectedResponses[0]]
                : "medium"
            )
          }
        />
      )}
    </>
  );
}; // EditableDisplayImageCardContent

export default DisplayImageCard;
