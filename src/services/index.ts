import { FindArtworkActivityService } from "./findArtworkActivity.service";
import { ArtworksService } from "./artworks.service";
import { ArtworkFieldMapping } from "./artwork.model";
import { ViewpointsArtworksService } from "./viewpointsArtworks.service";
import { ViewpointsQuestionsService } from "./viewpointsQuestions.service";
import { ViewpointsResponseService } from "./viewpointsResponse.service";
import { GamGameActivityService } from "./gamGameActivity.service";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { GamArtworksService } from "./gamArtworks.service";
import { MncnArtifactService } from "./mncnArtifact.service";

export let api: FindArtworkActivityService;
export let artworksService: ArtworksService;
export let gamArtworksService: GamArtworksService;
export let viewpointsArtworksService: ViewpointsArtworksService;
export let viewpointsQuestionsService: ViewpointsQuestionsService;
export let viewpointsResponseService: ViewpointsResponseService;
export let gamGameApi: GamGameActivityService;
export let userService: UserService;
export let authService: AuthService;
export let mncnArtifactService: MncnArtifactService;

/**
 * For the time being we fetch the relevant fields from the initialize services function provided here.
 * create-react-app enforces that all fields within the .env file start with REACT_APP_ (otheriwise
 * they are not included in process.env).
 */
export const initializeServices = () => {
  const apiUrl = /* process.env.REACT_APP_API_URL || */ 'https://api2.mksmart.org';
  const datasetUuid = /* process.env.REACT_APP_DATASET_UUID || */ 'f9e601f0-06e6-4733-a791-ec42f3aab80e';
  const apiKey = process.env.REACT_APP_API_KEY || '';
  const activityDefinitionsDatasetUuid = /* process.env.REACT_APP_ACTIVITY_DEFINITIONS_DATASET_UUID || */ '0f286b7d-87cd-4453-8dc9-b6dc54320429';
  const huntDefinitionsDatasetUuid = /* process.env.REACT_APP_HUNT_DEFINITIONS_DATASET_UUID || */ 'a5c0f5fd-7fc7-461f-b276-fddb7ede99d6';
  const gamGameActivityDefinitionsDatasetUuid = /* process.env.REACT_APP_GAM_GAME_ACTIVITY_DEFINITIONS_DATASET_UUID || */ '0ed38d67-7afb-440d-93b3-afe660072700';
  const gamGameStoryDefinitionsDatasetUuid = /* process.env.REACT_APP_GAM_GAME_STORY_DEFINITIONS_DATASET_UUID || */ '816c8fb3-6c73-4405-bf71-b1c765c4a79e';

  const mapping: ArtworkFieldMapping = {
    author: process.env.REACT_APP_MAP_AUTHOR?.split(';') || ['author'],
    title: process.env.REACT_APP_MAP_TITLE?.split(';') || ['title'],
    location: process.env.REACT_APP_MAP_LOCATION?.split(';') || ['location'],
    id: process.env.REACT_APP_MAP_ID?.split(';') || ['id'],
    date: process.env.REACT_APP_MAP_DATE?.split(';') || ['date'],
    info: process.env.REACT_APP_MAP_INFO?.split(';') || ['info'],
    src: process.env.REACT_APP_MAP_SRC?.split(';') || ['src'],
  };

  api = new FindArtworkActivityService(apiUrl, datasetUuid, activityDefinitionsDatasetUuid, huntDefinitionsDatasetUuid, apiKey);
  artworksService = new ArtworksService(apiUrl, datasetUuid, apiKey, mapping);
  viewpointsArtworksService = new ViewpointsArtworksService();
  viewpointsQuestionsService = new ViewpointsQuestionsService();
  viewpointsResponseService = new ViewpointsResponseService();

  const inspiceServerApi = process.env.REACT_APP_SERVER_API_URL || 'http://testinspice.padaonegames.com/api';
  gamGameApi = new GamGameActivityService(inspiceServerApi);
  userService = new UserService(inspiceServerApi);
  authService = new AuthService(inspiceServerApi);
  gamArtworksService = new GamArtworksService(inspiceServerApi);
  mncnArtifactService = new MncnArtifactService(inspiceServerApi);
};