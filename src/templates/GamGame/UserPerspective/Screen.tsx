import { createContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useAsyncRequest } from "../../../services/useAsyncRequest";
import {
  artworksService,
  gamArtworksService,
  gamGameApi,
} from "../../../services";
import LoadingOverlay from "../../../components/Layout/LoadingOverlay";
import { ArtworkData } from "../../../services/artwork.model";
import { GamGameActivityDefinition } from "../../../services/gamGameActivity.model";
import GeneralInformationStep from "./Steps/GeneralInformationStep";
import CollectionStep from "./Steps/CollectionStep";
import ScanQrStep from "./Steps/ScanQrStep";
import InspectArtworkStep from "./Steps/InspectArtworkStep";
import { Navigate, Route, Routes } from "react-router-dom";
import ArtworkStoriesPanel from "../components/ArtworkStoriesPanel/ArtworkStoriesPanel";
import GeneralArtworkDetail from "../components/GeneralArtworkDetail";
import {
  NavigationWarning,
  NavMenuElem,
} from "../../../components/Layout/SideMenu";
import ActivityScreen from "../../../screens/ActivityScreen";
import { QrCode } from "styled-icons/remix-line";
import { Home } from "@styled-icons/boxicons-regular/Home";
import { Gallery } from "@styled-icons/remix-line/Gallery";
import { Books } from "@styled-icons/icomoon/Books";
import { FeatherAlt } from "@styled-icons/fa-solid/FeatherAlt";
import MyStoriesStep from "./Steps/MyStoriesStep";
import CreateStoryFlow from "../components/ArtworkStoriesPanel/CreateStoryFlow";
import StoryViewStep from "./Steps/StoryViewStep";
import { useTranslation } from "react-i18next";
import { RecommendationsByEmotionsScreen } from "../components/ArtworkStoriesPanel/CreateStorySteps/RecommendationsStep";
import RecommendedStoriesPanel from "../components/ArtworkStoriesPanel/RecommendedStoriesPanel";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

/**
 * Screen used to manage the flow of a user navigating through the application.
 * (Gam Game)
 */
//------------------------------------------------------------------
//             FIRST STAGE: Fetch activity definition
//------------------------------------------------------------------
export const GamGameUserMenuScreen = () => {
  // fetch id from url
  let { id } = useParams() as { id: string };

  //-----------------------------------------------
  //          Fetch Activity Definition
  //-----------------------------------------------

  // Fetch activity definition from server by url params' id
  const fetchActivityDefinition = async () => {
    return await gamGameApi.getGamGameActivityDefinitionById(id);
  };

  // Make request on first render
  const [fetchActivityDefinitionStatus] = useAsyncRequest(
    fetchActivityDefinition,
    []
  );

  if (
    !(
      fetchActivityDefinitionStatus.kind === "success" &&
      fetchActivityDefinitionStatus.result.kind === "ok"
    )
  ) {
    return <LoadingOverlay message="Fetching activity definition" />;
  }

  // cache the value of our activityDefinition after it is found.
  const activityDefinition = fetchActivityDefinitionStatus.result.data[0];
  return <LoadActivityArtworks activityDefinition={activityDefinition} />;
};

//------------------------------------------------------------------
//                 SECOND STAGE: Fetch artworks
//------------------------------------------------------------------
interface LoadActivityArtworksProps {
  activityDefinition: GamGameActivityDefinition;
}

const LoadActivityArtworks = ({
  activityDefinition,
}: LoadActivityArtworksProps): JSX.Element => {
  //-----------------------------------------------
  //          Fetch Activity Artworks
  //-----------------------------------------------

  // Use activity's definition to request the corresponding artworks from server
  const fetchActivityArtworks = async () => {
    return gamArtworksService.fetchArtworksById(activityDefinition.artworks);
  };

  // Make request only after having a valid activity definition.
  const [fetchActivityArtworksStatus] = useAsyncRequest(
    fetchActivityArtworks,
    []
  );

  if (
    !(
      fetchActivityArtworksStatus.kind === "success" &&
      fetchActivityArtworksStatus.result.kind === "ok"
    )
  ) {
    return <LoadingOverlay message="Fetching activity artworks" />;
  }

  // cache the value of our activityArtworks after they are fetched.
  const artworks = fetchActivityArtworksStatus.result.data;

  console.log(artworks);

  return (
    <GamGameUserFlow
      activityDefinition={activityDefinition}
      artworks={artworks}
      artworkCount={artworks.length}
    />
  );
};

//------------------------------------------------------------------
//               THIRD STAGE: User Flow
//------------------------------------------------------------------
interface GamGameUserFlowProps {
  activityDefinition: GamGameActivityDefinition;
  artworks: ArtworkData[];
  artworkCount: number;
}

export interface IGamGameActivityContext {
  activity: GamGameActivityDefinition;
  artworks: ArtworkData[];
}

export const GamGameActivityContext = createContext<IGamGameActivityContext>({
  artworks: [],
  activity: {
    _id: "",
    activityType: "GAM Game",
    activityTitle: "",
    activityAuthor: "",
    artworksDatasetUuid: "",
    storyDefinitionsDatasetUuid: "",
    beginsOn: new Date(),
    endsOn: new Date(),
    minArtworks: 0,
    maxArtworks: 0,
    artworks: [],
    allowedResponseTypes: [],
  },
});

const GamGameUserFlow = ({
  activityDefinition,
  artworks,
  artworkCount,
}: GamGameUserFlowProps): JSX.Element => {
  const { t } = useTranslation("gamGame");

  console.log(activityDefinition);

  const gamGameNavigationConfig: NavMenuElem[] = [
    {
      title: t("home"),
      to: "home",
      icon: Home,
    },
    {
      title: t("collection"),
      to: "collection",
      icon: Gallery,
    },
    {
      title: t("scanQr"),
      to: "scan-qr",
      icon: QrCode,
    },
    {
      title: t("createStory"),
      to: "stories/create",
      icon: FeatherAlt,
    },
    {
      title: t("myStories"),
      to: "my-stories",
      icon: Books,
    },
  ];

  const gamGameNavigationWarnings: NavigationWarning[] = [
    {
      from: "stories/create",
      warningText: t("areYouSureYouWantToExitStoryCreation"),
    },
  ];

  return (
    <Root>
      <GamGameActivityContext.Provider
        value={{ artworks, activity: activityDefinition }}
      >
        <Routes>
          <Route
            path=""
            element={
              <ActivityScreen
                sessionGuarded
                activityId={activityDefinition._id}
                activityTitle="GAM - GAM Game"
                navigationEntries={gamGameNavigationConfig}
                navigationWarnings={gamGameNavigationWarnings}
              />
            }
          >
            <Route path="home" element={<GeneralInformationStep />} />
            <Route path="collection" element={<CollectionStep />} />

            <Route path="stories/:storyId" element={<StoryViewStep />} />
            <Route
              path="stories/:storyId/recommend-stories"
              element={<RecommendedStoriesPanel />}
            />
            <Route path="stories/create" element={<CreateStoryFlow />} />
            <Route
              path="collection/:artworkId/*"
              element={<InspectArtworkStep />}
            >
              <Route
                path="detail"
                element={<GeneralArtworkDetail artworks={artworks} />}
              />
              <Route path="stories" element={<ArtworkStoriesPanel />} />
              <Route path="" element={<Navigate replace to="detail" />} />
            </Route>
            <Route path="scan-qr" element={<ScanQrStep />} />
            <Route path="my-stories" element={<MyStoriesStep />} />
            <Route
              path="recommendations"
              element={<RecommendationsByEmotionsScreen />}
            />
            <Route path="" element={<Navigate replace to="home" />} />
          </Route>
        </Routes>
      </GamGameActivityContext.Provider>
    </Root>
  );
};

export default GamGameUserMenuScreen;
