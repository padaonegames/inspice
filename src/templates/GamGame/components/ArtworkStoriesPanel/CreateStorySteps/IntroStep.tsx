import { useTranslation } from "react-i18next";
import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import { ArtworkListDottedLine, ProgressButton, StepRoot } from "../../generalStyles";

interface IntroStepProps {
  /** callback to parent component specifying that the user has clicked on the begin button */
  onBeginClicked?: () => void;
}

export const IntroStep = (props: IntroStepProps): JSX.Element => {

  const { onBeginClicked } = props;

  const { t } = useTranslation('gamGame');

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={t('newGamGameStory')}
        stepDescription={t('createGamGameStoryDescription')}
      >
        <ArtworkListDottedLine />
        <ProgressButton
          style={{ alignSelf: 'center' }}
          enabled
          onClick={onBeginClicked}
        >
          {t('begin').toUpperCase()}
        </ProgressButton>
      </StepTitleCard>
    </StepRoot>
  );
};

export default IntroStep;