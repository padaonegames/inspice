import {
  Root,
  CardPanel,
  PromptText,
  RequiredAsterisk,
  RequiredQuestionSpan,
  RequiredAlertIcon,
  ImagePreview,
  InputText
} from "./cardStyles";

export interface EmbedImageLinkCardProps {
  promptText: string;
  onChange?: (src: string | undefined) => void;
  onEnterPress?: () => void;
  src?: string;
  required?: boolean;
  /* True if user tried to submit the form without filling a required field */
  requiredAlert?: boolean;
}

export const EmbedImageLinkCard = (props: EmbedImageLinkCardProps): JSX.Element => {

  const {
    promptText,
    requiredAlert,
    required,
    src,
    onChange,
    onEnterPress
  } = props;

  return (
    <Root>
      <CardPanel requiredAlert={requiredAlert}>
        <PromptText>
          {promptText}{required && <RequiredAsterisk> *</RequiredAsterisk>}
        </PromptText>
        <InputText
          type='url'
          placeholder='Paste your image source url here...'
          value={src}
          onChange={event => {
            if (onChange) onChange(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter' && onEnterPress) {
              onEnterPress();
            }
          }}
        />
        {src && <ImagePreview src={src} />}
        {requiredAlert && (
          <RequiredQuestionSpan>
            <RequiredAlertIcon /> This question is required.
          </RequiredQuestionSpan>
        )}
      </CardPanel>
    </Root>
  );
};

export default EmbedImageLinkCard;