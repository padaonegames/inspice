import { EditableFieldProps, DisplayVideoFieldDefinition } from "../../../services/multistageFormActivity.model";
import { ImagePreview, InputText } from "./cardStyles";
import FormCard from "./FormCard";
import { AbstractFormFactory } from "./FormFactory";
import YouTube, { YouTubeProps } from 'react-youtube';
import { isValidElement } from "react";
import { isFunction } from "lodash";
import styled from "styled-components";


const getVideoID = (link: string) => {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = link.match(regExp);

  if (match && match[2].length == 11)      return match[2];
  else                                     return '';
} //getVideoID


export interface DisplayVideoCardProps extends DisplayVideoFieldDefinition {
  /** Prompt for the user to fill in this field */
  promptText?: string;
  /** Whether this field should always be filled in by the user */
  required?: boolean;
  /** whether to modify the appearance of this card to reflect that the user tried to submit the form without entering a value for this field */
  requiredAlert?: boolean;
} // MultipleChoiceCardProps

export const DisplayVideoCard = (props: DisplayVideoCardProps): JSX.Element => {

  const {
    promptText = '',
    requiredAlert,
    required,
    src
  } = props;

  const playerOptions: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  return (
    <FormCard
      promptText={promptText}
      required={required}
      requiredAlert={requiredAlert}
    >
      <YouTube videoId={getVideoID(src)} opts={playerOptions} onReady={onPlayerReady} style={{ marginLeft: "auto", marginRight: "auto", display: "block"}} />
    </FormCard>
  );
}; // DisplayImageCard


export interface EditableDisplayVideoCardContentProps extends EditableFieldProps<DisplayVideoFieldDefinition> {
  /** text to display for the add new option label. */
  addNewOptionLabel?: string;
} // EditableMultipleChoiceCardContentProps

export const EditableDisplayVideoCardContent = (props: EditableDisplayVideoCardContentProps): JSX.Element => {

  const {
    fieldPayload,
    addNewOptionLabel = 'New option',
    onPayloadChanged
  } = props;

  const {
    src
  } = fieldPayload;

  const playerOptions: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
  };

  const isValidURL = (link: string) => {
    var res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };  // isValidURL

  const handleEditVideoSource = (link: string) => {
    if (!onPayloadChanged) return;

    let ID = isValidURL(link) ? getVideoID(link) : '';
    onPayloadChanged({
      ...fieldPayload,
      src: link
    })
  }; // handleEditVideoSource

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  } // onPlayerReady

  return (
    <>
      <InputText
        placeholder={'Youtube video link'}
        value={src}
        onChange={event => handleEditVideoSource(event.target.value)}
      />
        <YouTube videoId={getVideoID(src)} opts={playerOptions} onReady={onPlayerReady} style={{ marginLeft: "auto", marginRight: "auto", display: "block"}}/>
    </>
  );
}; // EditableDisplayImageCardContent

export const displayVideoCardFactory: AbstractFormFactory<DisplayVideoFieldDefinition> = {
  userFormComponent: (useFormPayload) => (
    <DisplayVideoCard
      {...useFormPayload}
    />
  ),
  formEditingComponent: (editingFormProps) => (
    <EditableDisplayVideoCardContent
      {...editingFormProps}
    />
  ),
  defaultFormDefinition: {
    src: ''
  }
}; // DisplayVideoCardFactory


export default DisplayVideoCard;