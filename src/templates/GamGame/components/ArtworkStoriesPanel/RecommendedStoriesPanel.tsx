import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAsyncRequest } from "../../../../services/useAsyncRequest";
import { gamGameApi } from "../../../../services";
import LoadingOverlay from "../../../../components/Layout/LoadingOverlay";
import { useTranslation } from "react-i18next";
import StoriesList from "./StoriesList";
import { useContext } from "react";
import { GamGameActivityContext } from "../../UserPerspective/Screen";
import ContainerCard from "../../../../components/Forms/Cards/ContainerCard";
import {
  DetailUpperPanel,
  DetailMainInfoPanel,
  ArtworkTitle,
  ArtworkListDottedLine,
  StepRoot,
} from "../generalStyles";

// /stories/:storyId/recommended-stories
export const RecommendedStoriesPanel = (): JSX.Element => {
  // artworks have already been collected at a higher step
  const { artworks, activity } = useContext(GamGameActivityContext);
  // what story are we refering to?
  const { storyId } = useParams();
  // what kind of recommendations do we want to fetch?
  const [searchParams, _] = useSearchParams();
  const relation = searchParams.get("relation");

  const { t } = useTranslation("gamGame");

  const navigate = useNavigate();

  // Fetch all stories included in the recommendation
  const fetchRecommendedStories = async () => {
    if (
      !storyId ||
      !relation ||
      !(relation === "opposite" || relation === "similar")
    )
      return Promise.reject();
    return gamGameApi.getGamGameStoryRecommendationsByEmotion(
      relation,
      storyId
    );
  };

  // perform an api query to fetch all stories that contain our given artwork
  const [fetchStoriesRequest] = useAsyncRequest(fetchRecommendedStories, []);

  // selected artwork cannot be found within our context
  if (!storyId) {
    return <>No stories found.</>;
  }

  // Request currently running
  if (fetchStoriesRequest.kind === "running") {
    return <LoadingOverlay message={t("fetchingRecommendedStories")} />;
  }

  // Request is done with, but didn't succeed
  if (
    !(
      fetchStoriesRequest.kind === "success" &&
      fetchStoriesRequest.result.kind === "ok"
    )
  ) {
    return <>{t("thereWasProblemWhenFetchingRecommendedStories")}</>;
  }

  // cache the result and then render found stories
  const stories = fetchStoriesRequest.result.data.filter(
    (s) => s.activityId === activity._id // only render stories that are associated to this activity
  );
  return (
    <StepRoot>
      <ContainerCard upperDecorator>
        <DetailUpperPanel>
          <DetailMainInfoPanel>
            <ArtworkTitle>
              {relation === "similar"
                ? t("similarStories")
                : t("oppositeStories")}
            </ArtworkTitle>
          </DetailMainInfoPanel>
        </DetailUpperPanel>

        <ArtworkListDottedLine />
        <StoriesList
          stories={stories}
          onStorySelected={(storyId) =>
            navigate(`./../../../stories/${storyId}`)
          }
          artworks={artworks}
        />
      </ContainerCard>
    </StepRoot>
  );
};

export default RecommendedStoriesPanel;
