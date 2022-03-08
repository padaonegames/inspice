import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import StepTitleCard from "../../../../../components/Forms/Cards/StepTitleCard";
import LoadingOverlay from "../../../../../components/Layout/LoadingOverlay";
import { gamArtworksService } from "../../../../../services";
import { ArtworkData } from "../../../../../services/artwork.model";
import { useAsyncRequest } from "../../../../../services/useAsyncRequest";
import { GamGameActivityContext } from "../../../UserPerspective/Screen";
import { ArtworkListDottedLine, StepRoot } from "../../generalStyles";
import ArtworksList from "../ArtworksList";

export const RecommendationsByEmotionsScreen = (): JSX.Element => {

  // activity artworks have already been collected at a higher step
  const { artworks } = useContext(GamGameActivityContext);

  const [searchParams] = useSearchParams();
  let artworksIncluded: string[] = [];
  try {
    artworksIncluded = JSON.parse(searchParams.get('artworksIncluded') ?? '') ?? [];
  } catch (error) {
    artworksIncluded = [];
  }
  const parsedRelation = searchParams.get('relation');
  let relation: 'opposite' | 'similar' = 'similar';
  if (parsedRelation === 'opposite' || parsedRelation === 'similar') relation = parsedRelation;

  const navigate = useNavigate();
  const location = useLocation();

  // extract activity Id from current location
  const startPos = '/gam-game/consumer/visit/'.length;
  const text = location.pathname.slice(startPos);
  const endPos = text.indexOf('/');
  const activityId = endPos < 0 ? text : text.slice(0, endPos);

  const handleRecommendedArtworkSelected = (artworkId: string) => {
    navigate(`/gam-game/consumer/visit/${activityId}/collection/${artworkId}/detail`);
  };

  const handleNextClicked = () => {
    if (relation === 'opposite') {
      navigate(`/gam-game/consumer/visit/${activityId}/home`);
    }
    else {
      navigate({
        pathname: location.pathname,
        search: `?${createSearchParams([
          ['relation', 'opposite'],
          ['artworksIncluded', JSON.stringify(artworksIncluded)]
        ])}`
      });
    }
  };

  const fetchRecommendations = async () => {
    const recommendations: ArtworkData[] = [];
    for (let artwork of artworksIncluded) {
      const response = await gamArtworksService.fetchRecommendationsByEmotion(relation, artwork);
      if (response.kind === 'ok') {
        for (let newArtwork of response.data) {
          if (recommendations.findIndex(elem => elem.id === newArtwork.id) < 0
            && artworks.findIndex(elem => elem.id === newArtwork.id) >= 0) {
            recommendations.push(newArtwork);
          }
        }
      }
    }
    return recommendations;
  };
  const [fetchRecommendationsRequest] = useAsyncRequest(fetchRecommendations, [location]);

  if (!(fetchRecommendationsRequest.kind === 'success')) {
    return <LoadingOverlay message='Fetching recommendations' />;
  }

  return (
    <RecommendationsStep
      artworks={fetchRecommendationsRequest.result}
      relation={relation}
      onArtworkSelected={handleRecommendedArtworkSelected}
      onNextClicked={handleNextClicked}
    />
  );
};

interface RecommendationsStepProps {
  /** artwork data to render recommended pieces */
  artworks: ArtworkData[];
  /** relation (opposite/ similar) to given artworks */
  relation: 'opposite' | 'similar';
  /** callback to parent specifying what to do when next button is clicked */
  onNextClicked?: () => void;
  /** callback to parent specifying what to do when recommended artwork is selected */
  onArtworkSelected?: (artworkId: string) => void;
}

export const RecommendationsStep = (props: RecommendationsStepProps): JSX.Element => {

  const {
    artworks,
    relation,
    onNextClicked,
    onArtworkSelected
  } = props;

  const { t } = useTranslation('gamGame');

  return (
    <StepRoot>
      <StepTitleCard
        stepTitle={relation === 'similar' ? t('similarArtworks') : t('oppositeArtworks')}
        stepDescription={t(`${relation}ArtworksDescription`)}
        onActionCliked={onNextClicked}
        actionName={relation === 'similar' ? t('next').toUpperCase() : t('finish').toUpperCase()}
        enableAction={true}
      >
        <ArtworkListDottedLine />
        <ArtworksList
          artworks={artworks}
          onArtworkSelected={onArtworkSelected}
        />
      </StepTitleCard>
    </StepRoot>
  );
};

export default RecommendationsStep;