import { useState } from "react";
import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  ImagePreview,
  InputFile,
  InputFileButton
} from "./cardStyles";

export interface ImageUploadCardProps {
  promptText: string;
  onChange?: (file: File | undefined) => void;
  onEnterPress?: () => void;
  initialSrc?: string;
  initialFile?: File;
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}

export const ImageUploadCard = (props: ImageUploadCardProps): JSX.Element => {

  const {
    promptText,
    requiredAlert,
    required,
    initialSrc,
    initialFile,
    onChange,
    onEnterPress
  } = props;

  const [file, setFile] = useState<File | undefined>(initialFile);
  const [image, setImage] = useState<string | undefined>(initialFile ? URL.createObjectURL(initialFile) : initialSrc);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || event.target.files.length == 0) {
      setFile(undefined);
      return;
    }
    setImage(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    if (onChange)
      onChange(event.target.files[0]);
  }

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <InputFileButton htmlFor='file-upload'>
          Choose image...
        </InputFileButton>
        <InputFile
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter' && onEnterPress) {
              onEnterPress();
            }
          }}
        />
        {file && <ImagePreview src={image} />}
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default ImageUploadCard;