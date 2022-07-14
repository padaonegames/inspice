import { EditableFieldProps, DisplayImageFieldDefinition } from "../../../services/multistageFormActivity.model";
import { ImagePreview, InputText } from "./cardStyles";
import FormCard from "./FormCard";
import { AbstractFormFactory } from "./FormFactory";

const preview_image = "https://icons.iconarchive.com/icons/ccard3dev/dynamic-yosemite/512/Preview-icon.png"

export interface DisplayImageCardProps extends DisplayImageFieldDefinition {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // MultipleChoiceCardProps

export const DisplayImageCard = (props: DisplayImageCardProps): JSX.Element => {

  const {
    promptText = '',
    requiredAlert,
    required,
    src
  } = props;

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <ImagePreview src={src}/>
    </FormCard>
  );
}; // DisplayImageCard


export interface EditableDisplayImageCardContentProps extends EditableFieldProps<DisplayImageFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableMultipleChoiceCardContentProps

export const EditableDisplayImageCardContent = (props: EditableDisplayImageCardContentProps): JSX.Element => {

  const {
    fieldPayload,
    addNewOptionLabel = 'New option',
    onPayloadChanged
  } = props;

  const {
    src,
  } = fieldPayload;

  const handleEditImageSource = (value: string) => {
    if (!onPayloadChanged) return;
    onPayloadChanged({
      ...fieldPayload,
      src: value
    })
  }; // handleEditOption

  const isValidURL = (link: string) => {
    var res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };  // isValidURL

  return (
    <>
      <InputText
        readOnly={false}
        placeholder={'Image source'}
        maxLength={1000}
        value={src}
        onChange={event => handleEditImageSource(event.target.value)}
      />
      <ImagePreview src={isValidURL(src) ? src : preview_image} />
    </>
  );
}; // EditableDisplayImageCardContent

export const displayImageCardFactory: AbstractFormFactory<DisplayImageFieldDefinition> = {
  userFormComponent: (useFormPayload) => (
    <DisplayImageCard
      {...useFormPayload}
    />
  ),
  formEditingComponent: (editingFormProps) => (
    <EditableDisplayImageCardContent
      {...editingFormProps}
    />
  ),
  defaultFormDefinition: {
    src: '',
  }
}; // DisplayImageCardFactory


export default DisplayImageCard;