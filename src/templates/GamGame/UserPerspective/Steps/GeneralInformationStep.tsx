import { useTranslation } from 'react-i18next';
import StepTitleCard from '../../../../components/Forms/Cards/StepTitleCard';
import { StepRoot } from '../../components/generalStyles';

export const GeneralInformationStep = (): JSX.Element => {

  const { t } = useTranslation('gamGame');

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={t('basicInformation')}
        stepDescription={t('welcomeToGamGame')}
      />
    </StepRoot>
  );
}

export default GeneralInformationStep;