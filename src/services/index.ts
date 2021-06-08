import { Api } from "./api";
import { ArtworkFieldMapping } from "./commonDefinitions";

export let api: Api;

/**
 * For the time being we fetch the relevant fields from the initialize services function provided here.
 * create-react-app enforces that all fields within the .env file start with REACT_APP_ (otheriwise
 * they are not included in process.env).
 */
export const initializeServices = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://api2.mksmart.org';
  const datasetUuid = process.env.REACT_APP_DATASET_UUID || 'd6a1d487-63bb-4eb4-993c-b707248aeca5';
  const apiKey = process.env.REACT_APP_API_KEY || '';
  const mappingMode = (process.env.REACT_APP_MAPPING_MODE as 'JSON' | 'RDF') || 'RDF';
  
  if (mappingMode === 'JSON') {
    const mapping: ArtworkFieldMapping = {
      author: process.env.REACT_APP_MAP_AUTHOR || 'author',
      title: process.env.REACT_APP_MAP_TITLE || 'title',
      location: process.env.REACT_APP_MAP_LOCATION || 'location',
      id: process.env.REACT_APP_MAP_ID || 'id',
      date: process.env.REACT_APP_MAP_DATE || 'date',
      info: process.env.REACT_APP_MAP_INFO || 'info',
      src: process.env.REACT_APP_MAP_SRC || 'src',
    };

    api = new Api(apiUrl, datasetUuid, apiKey, { mode: 'JSON', mapping });
  }

  else {
    api = new Api(apiUrl, datasetUuid, apiKey, { mode: 'RDF' });
  }
  
};