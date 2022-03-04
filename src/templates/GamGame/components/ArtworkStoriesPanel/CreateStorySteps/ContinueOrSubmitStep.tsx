import { useTranslation } from "react-i18next";
import styled from "styled-components";
import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import { ArtworkListDottedLine, ProgressButton, StepRoot } from "../../generalStyles";

interface ContinueOrSubmitStepProps {
  /** callback to parent component specifying that the user has decided to continue with the story */
  onContinueClicked?: () => void;
  /** callback to parent component specifying that the user has decided to submit the story */
  onSubmitClicked?: () => void;
}

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const HorizontalSeparator = styled.span`
  margin: 0 0.5em;
`;

export const ContinueOrSubmitStep = (props: ContinueOrSubmitStepProps): JSX.Element => {

  const { t } = useTranslation('gamGame');
  const { onContinueClicked, onSubmitClicked } = props;

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={t('keepAddingParts')}
        stepDescription={t('wouldYouLikeToAddAnAdditionalArtworkToStory')}
      >
        <ArtworkListDottedLine />
        <ButtonsContainer>
          <ProgressButton
            style={{ alignSelf: 'center', backgroundColor: '#f5b1a3' }}
            enabled
            onClick={onSubmitClicked}
          >
            {t('submit')}
          </ProgressButton>
          <HorizontalSeparator />
          <ProgressButton
            style={{ alignSelf: 'center' }}
            enabled
            onClick={onContinueClicked}
          >
            {t('continue')}
          </ProgressButton>
        </ButtonsContainer>
      </StepTitleCard>
    </StepRoot>
  );
};

export default ContinueOrSubmitStep;