import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  ImagePreview,
  InputText,
} from "./cardStyles";
import FormCard from "./FormCard";

export interface EmbedImageLinkCardProps {
  promptText: string;
  onChange?: (src: string | undefined) => void;
  onEnterPress?: () => void;
  src?: string;
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}

export const EmbedImageLinkCard = (
  props: EmbedImageLinkCardProps
): JSX.Element => {
  const { src, onChange, onEnterPress, ...formProps } =
    props;

  return (
    <FormCard {...formProps}>
      <InputText
        type="url"
        placeholder="Paste your image source url here..."
        value={src}
        onChange={(event) => {
          if (onChange) onChange(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter" && onEnterPress) {
            onEnterPress();
          }
        }}
      />
      {src && <ImagePreview src={src} />}
    </FormCard>
  );
};

export default EmbedImageLinkCard;
