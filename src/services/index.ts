import { Api } from "./api";
import { ArtworksService } from "./artworksService";
import { ArtworkFieldMapping } from "./commonDefinitions";

export let api: Api;
export let artworksService: ArtworksService;

/**
 * For the time being we fetch the relevant fields from the initialize services function provided here.
 * create-react-app enforces that all fields within the .env file start with REACT_APP_ (otheriwise
 * they are not included in process.env).
 */
export const initializeServices = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://api2.mksmart.org';
  const datasetUuid = process.env.REACT_APP_DATASET_UUID || 'd6a1d487-63bb-4eb4-993c-b707248aeca5';
  const apiKey = process.env.REACT_APP_API_KEY || '';
  const activityDefinitionsDatasetUuid = process.env.REACT_APP_ACTIVITY_DEFINITIONS_DATASET_UUID || '0f286b7d-87cd-4453-8dc9-b6dc54320429';
  const huntDefinitionsDatasetUuid = process.env.REACT_APP_HUNT_DEFINITIONS_DATASET_UUID || 'a5c0f5fd-7fc7-461f-b276-fddb7ede99d6';

  const mapping: ArtworkFieldMapping = {
    author: process.env.REACT_APP_MAP_AUTHOR?.split(';') || ['author'],
    title: process.env.REACT_APP_MAP_TITLE?.split(';') || ['title'],
    location: process.env.REACT_APP_MAP_LOCATION?.split(';') || ['location'],
    id: process.env.REACT_APP_MAP_ID?.split(';') || ['id'],
    date: process.env.REACT_APP_MAP_DATE?.split(';') || ['date'],
    info: process.env.REACT_APP_MAP_INFO?.split(';') || ['info'],
    src: process.env.REACT_APP_MAP_SRC?.split(';') || ['src'],
  };

  api = new Api(apiUrl, datasetUuid, activityDefinitionsDatasetUuid, huntDefinitionsDatasetUuid, apiKey, mapping);
  artworksService = new ArtworksService(apiUrl, datasetUuid, apiKey, mapping);
};