import { useState } from "react";
import { useTranslation } from "react-i18next";
import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import { ArtworkData } from "../../../../../services/artwork.model";
import { GamGameStoryPart } from "../../../../../services/gamGameActivity.model";
import { ArtworkListDottedLine, StepRoot } from "../../generalStyles";
import ArtworksList from "../ArtworksList";

interface RecommendationsStepProps {
  /** parts of the story that were submitted in the previous step */
  storyParts: GamGameStoryPart[];
  /** artwork data to render recommended pieces */
  artworks: ArtworkData[];
  /** callback to parent informing about user ending the recommendation flow */
  onEndRecommendations?: () => void;
  /** callback to parent informing about an artwork being selected */
  onArtworkSelected?: (artworkId: string) => void;
}

export const RecommendationsStep = (props: RecommendationsStepProps): JSX.Element => {

  const {
    storyParts,
    artworks,
    onEndRecommendations,
    onArtworkSelected
  } = props;

  const { t } = useTranslation('gamGame');

  const [stage, setStage] = useState<'similar' | 'opposite'>('similar');

  const handleNextClicked = () => {
    if (stage === 'similar') {
      setStage('opposite');
    }
    else {
      if (onEndRecommendations) {
        onEndRecommendations();
      }
    }
  }

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={stage === 'similar' ? t('similarArtworks') : t('oppositeArtworks')}
        stepDescription={t(`${stage}ArtworksDescription`)}
        onActionCliked={handleNextClicked}
        actionName={stage === 'similar' ? t('next').toUpperCase() : t('finish').toUpperCase()}
        enableAction={true}
      >
        <ArtworkListDottedLine />
        <ArtworksList
          artworks={artworks.filter((_, i) => i % 3 === (stage === 'similar' ? 0 : 1))}
          onArtworkSelected={onArtworkSelected}
        />
      </StepTitleCard>
    </StepRoot>
  );
};

export default RecommendationsStep;