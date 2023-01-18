import { ThemeStore } from "./theme/ThemeStore";
import Theme from "./theme/Theme";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// screen imports
import PlayTreasureHuntScreen from "./templates/FindArtwork/PlayTreasureHunt/Screen";
import CreateTreasureHuntScreen from "./templates/FindArtwork/CreateTreasureHunt/Screen";
import CreateFindArtworkActivityScreen from "./templates/FindArtwork/CreateActivity/Screen";
import BrowseDefinitionsScreen from "./screens/BrowseDefinitionsScreen";
import ExploreActivityScreen from "./templates/FindArtwork/ExploreActivity/Screen";
import { ActivityScreen } from "./screens/ActivityScreen";

// components
import HomeComponent from "./templates/Viewpoints/HomeComponent";
import ViewpointsResultsComponent from "./templates/Viewpoints/ViewpointsResultsComponent";
import AnswerViewpointComponent from "./templates/Viewpoints/AnswerViewpointComponent";
import CreateGamGameActivityScreen from "./templates/GamGame/CreateActivity/Screen";
import GamGameUserMenuScreen from "./templates/GamGame/UserPerspective/Screen";
import { TemplateDashboard } from "./templates/TemplateDashboard/Screen";
import LoginScreen from "./templates/Auth/Login/LoginScreen";
import { MncnCatalogueBrowsingScreen } from "./templates/NaturalScienceCatalogue/BrowseCatalogue/Screen";
import { MncnViewArtifactScreen } from "./templates/NaturalScienceCatalogue/Artifact/ViewArtifactScreen";
import {
  EditMultistageFormActivityScreen,
  GenerateNewMultistageFormActivityScreen,
} from "./templates/MultistageForm/CreateActivity/Screen";
import {
  EditEscapeRoomScreen,
  GenerateNewEscapeRoomActivityScreen,
} from "./templates/EscapeRoomAuthoring/Screen";
import SessionLoginScreen from "./templates/Auth/SessionLogin/SessionLoginScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import ConsumeMultistageFormScreen from "./templates/MultistageForm/ConsumeForm/Screen";
import ViewMultistageFormResponsesScreen from "./templates/MultistageForm/ViewResponses/Screen";

/**
 * Main entrypoint for our React application within which all other components
 * will be rendered.
 */
export const App = (): JSX.Element => {
  return (
    <Suspense fallback="loading">
      <ThemeStore>
        <Theme>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="dashboard"
                  element={
                    <ActivityScreen
                      guarded
                      availableLanguages={["en"]}
                      activityTitle="Dashboard"
                    />
                  }
                >
                  <Route path="" element={<TemplateDashboard />} />
                </Route>
                <Route
                  path="mncn-collection"
                  element={
                    <ActivityScreen
                      availableLanguages={["es"]}
                      activityTitle="MNCN - Colección"
                    />
                  }
                >
                  <Route
                    path="browse"
                    element={<MncnCatalogueBrowsingScreen />}
                  />
                  <Route
                    path="artifact/:id"
                    element={<MncnViewArtifactScreen />}
                  />
                </Route>
                <Route
                  path="viewpoints"
                  element={
                    <ActivityScreen
                      availableLanguages={["en"]}
                      activityTitle="IMMA - Viewpoints"
                    />
                  }
                >
                  <Route path="consumer">
                    <Route path="browse" element={<HomeComponent />} />
                    <Route
                      path="results"
                      element={<ViewpointsResultsComponent />}
                    />
                    <Route
                      path="answer/:id"
                      element={<AnswerViewpointComponent />}
                    />
                    <Route path="" element={<Navigate replace to="browse" />} />
                  </Route>
                  <Route path="" element={<Navigate replace to="consumer" />} />
                </Route>
                <Route
                  path="find-artwork"
                  element={
                    <ActivityScreen
                      availableLanguages={["en"]}
                      activityTitle="IMMA - Find Artworks"
                    />
                  }
                >
                  <Route path="consumer">
                    <Route
                      path="play/:id"
                      element={<PlayTreasureHuntScreen />}
                    />
                    <Route
                      path="create/:id"
                      element={<CreateTreasureHuntScreen />}
                    />
                    <Route
                      path="explore/:id"
                      element={<ExploreActivityScreen />}
                    />
                  </Route>
                  <Route path="curator">
                    <Route
                      path="create"
                      element={<CreateFindArtworkActivityScreen />}
                    />
                  </Route>
                  <Route path="browse" element={<BrowseDefinitionsScreen />} />
                  <Route path="" element={<Navigate replace to="browse" />} />
                </Route>
                <Route path="gam-game">
                  <Route path="consumer">
                    <Route
                      path="visit/:activityId/*"
                      element={<GamGameUserMenuScreen />}
                    />
                  </Route>
                  <Route
                    path="curator"
                    element={
                      <ActivityScreen
                        onHeaderIconClicked={() => window.open("/dashboard")}
                        availableLanguages={["it", "en"]}
                        /*guarded*/ activityTitle="GAM - GAM Game"
                      />
                    }
                  >
                    <Route
                      path="create"
                      element={<CreateGamGameActivityScreen />}
                    />
                  </Route>
                </Route>
                <Route path="escape-room">
                  <Route
                    path="curator/create/:activityId"
                    element={<EditEscapeRoomScreen />}
                  />
                  <Route
                    path="curator/new-activity"
                    element={
                      <ActivityScreen
                        guarded
                        availableLanguages={["en", "es"]}
                        activityTitle="Escape Room Creation"
                      />
                    }
                  >
                    <Route
                      path=""
                      element={<GenerateNewEscapeRoomActivityScreen />}
                    />
                  </Route>
                </Route>
                <Route path="multistage-form">
                  <Route
                    path="consumer"
                    element={
                      <ActivityScreen
                        sessionGuarded
                        availableLanguages={["en"]}
                        activityTitle="Multistage Form Consumption"
                      />
                    }
                  >
                    <Route
                      path="view/:activityId/*"
                      element={<ConsumeMultistageFormScreen />}
                    />
                  </Route>
                  <Route
                    path="curator"
                    element={
                      <ActivityScreen
                        guarded
                        availableLanguages={["en"]}
                        activityTitle="Multistage Form"
                        onHeaderIconClicked={() => window.open("/dashboard")}
                      />
                    }
                  >
                    <Route
                      path="create/:activityId/*"
                      element={<EditMultistageFormActivityScreen />}
                    />
                    <Route
                      path="view-responses/:activityId/*"
                      element={<ViewMultistageFormResponsesScreen />}
                    />
                    <Route
                      path="new-activity"
                      element={<GenerateNewMultistageFormActivityScreen />}
                    />
                  </Route>
                </Route>
                <Route path="/login" element={<LoginScreen />} />
                <Route
                  path="/session-login/:activityId"
                  element={<SessionLoginScreen />}
                />
                <Route
                  path="/"
                  element={<Navigate replace to="/dashboard" />}
                />
                <Route
                  path="*"
                  element={<Navigate replace to="/dashboard" />}
                />
              </Routes>
            </BrowserRouter>
          </Provider>
        </Theme>
      </ThemeStore>
    </Suspense>
  );
};

export default App;
