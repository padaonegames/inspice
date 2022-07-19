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
  InputFileButton,
} from "./cardStyles";

export interface ImageUploadCardProps {
  /** Main text rendered on top of the component as a prompt for the user, indicating what they must upload. */
  promptText: string;
  /** Callback to use whenever the value of the input field is changed. */
  onChange?: (file: File | undefined) => void;
  /** Callback to use whenever the enter key is pressed while the component is focused. */
  onEnterPress?: () => void;
  /** Default file path that will be loaded on the page before the user uploads any file. */
  initialSrc?: string;
  /** Default file that will be uploaded on the page before the user uploads any file. */
  initialFile?: File;
  /** Whether this field is considered required within the overall form (used to display an asterisk). */
  required?: boolean;
  /* True if user tried to submit the form without filling a required field. */
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
    onEnterPress,
  } = props;

  const [file, setFile] = useState<File | undefined>(initialFile);
  const [image, setImage] = useState<string | undefined>(
    initialFile ? URL.createObjectURL(initialFile) : initialSrc
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !event.target ||
      !event.target.files ||
      event.target.files.length == 0
    ) {
      setFile(undefined);
      return;
    }
    setImage(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    if (onChange) onChange(event.target.files[0]);
  };

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}
          {required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <InputFileButton htmlFor="file-upload">Choose image...</InputFileButton>
        <InputFile
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter" && onEnterPress) {
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
