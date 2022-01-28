import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  CompletedGamGameActivityDefinition,
  CompletedGamGameStoryDefinition,
  GamGameActivityDefinition,
  GamGameStoryDefinition,
} from './gamGameActivity.model';

export type ApiResult<T> =
  | { kind: 'ok', data: T }
  | ApiError;

export type ApiError =
  | { kind: 'axios-error', error: Error }
  | { kind: 'http-error', response: Response }
  | { kind: 'parse-error', errors: ParseError }
  | { kind: 'unhandled-error', error: Error }
  ;

export type ParseError =
  | 'InvalidJson'
  ;

/**
 * The Api is responsible for all communication with the Project's Apis and Backends. (GamGame)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class GamGameActivityService {

  public constructor(
    private apiUrl: string,
    private datasetUuid: string,
    private activityDefinitionsDatasetUuid: string,
    private storyDefinitionsDatasetUuid: string,
    private apiKey: string,
  ) { } // constructor

  /**
   * @description Retrieve a GAM Game activity by its id
   * @param activityId ID of the activity to retrieve
   */
  public async getGamGameActivityDefinitionById(activityId: string): Promise<ApiResult<GamGameActivityDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/activity/${activityId}`;
    return getApiResult<GamGameActivityDefinition[]>(url);
  } // getGamGameActivityDefinitionById

  /**
   * @description Retrieve all GAM Game activities
   */
  public async getGamGameActivityDefinitions(): Promise<ApiResult<GamGameActivityDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/activities`;
    return getApiResult<GamGameActivityDefinition[]>(url);
  } // getGamGameActivityDefinitions

  /**
   * @description Retrieve all GAM Game user-created story definitions
   */
  public async getGamGameStoryDefinitions(): Promise<ApiResult<GamGameStoryDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/stories`;
    return getApiResult<GamGameStoryDefinition[]>(url);
  } // getGamGameStoryDefinitions

  /**
   * @description Retrieve a GAM Game story by id
   * @param storyId Id of the story definition to fetch
   */
  public async getGamGameStoryDefinitionById(storyId: string): Promise<ApiResult<GamGameStoryDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/story/${storyId}`;
    return getApiResult<GamGameStoryDefinition[]>(url);
  } // getGamGameStoryDefinitionById

  /**
   * @description Retrieve all GAM Game stories belonging to a given activity
   * @param activityId Id of the story definition to fetch
   */
  public async getGamGameStoryDefinitionsByActivityId(activityId: string): Promise<ApiResult<GamGameStoryDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/activity/${activityId}/stories`;
    return getApiResult<GamGameStoryDefinition[]>(url);
  } // getGamGameStoryDefinitionsByActivityId

  /**
   * @description Retrieve all GAM Game stories containing a given artwork
   * @param artworkId Id of the artwork that the stories must contain
   */
  public async getGamGameStoryDefinitionsByArtworkId(artworkId: string): Promise<ApiResult<GamGameStoryDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/stories/query?artworkId=${artworkId}`;
    return getApiResult<GamGameStoryDefinition[]>(url);
  } // getGamGameStoryDefinitionsByArtworkId

  /**
   * @description Submit an Activity Definition to the persistence layer
   * @param activityDefinition Activity definition to submit
   */
  public async submitGamGameActivityDefinition(activityDefinition: CompletedGamGameActivityDefinition): Promise<ApiResult<GamGameActivityDefinition>> {
    const url = `${this.apiUrl}/gam-game/activity`;

    const apiDefinition: CompletedGamGameActivityDefinition = {
      ...activityDefinition,
      storyDefinitionsDatasetUuid: this.storyDefinitionsDatasetUuid,
    };

    return postApiResult<CompletedGamGameActivityDefinition, GamGameActivityDefinition>(url, apiDefinition);
  } // submitGamGameActivityDefinition

  /**
   * @description Submit a user created Story Definition to the persistence layer
   * @param storyDefinition Story definition to submit 
   */
  public async submitGamGameStoryDefinition(storyDefinition: CompletedGamGameStoryDefinition): Promise<ApiResult<GamGameStoryDefinition>> {
    const url = `${this.apiUrl}/gam-game/story`;

    const apiDefinition: CompletedGamGameStoryDefinition = {
      ...storyDefinition
    };

    return postApiResult<CompletedGamGameStoryDefinition, GamGameStoryDefinition>(url, apiDefinition);
  } // submitGamGameStoryDefinition
}

/**
 * Run the given request and (TODO) parse the response according to a given schema
 */
async function getApiResult<T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResult<T>> {
  let response: AxiosResponse<T>;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.get<T>(url, config);
  } catch (error: any) {
    if (error.response) {
      // if the error has a response, then this means that server responded
      // with an error status (4xx, 5xx), which leads us to categorize it 
      // as an http error
      return { kind: 'http-error', response: error.response };
    }
    else if (error.request) {
      // if an error were to happen where we have a request but no response, 
      // we can categorize it as an axios error (the request wasn't performed
      // correctly or the server did not respond at all).
      return { kind: 'axios-error', error: error };
    }
    else {
      // in any other case, we categorize this as an unhandled error
      return { kind: 'unhandled-error', error: error };
    }

  }

  // TODO: we should validate the data object here against our schema
  // As it is now, this is an unsafe type coercion
  return { kind: 'ok', data: (response.data as T) };
}


/**
 * Run the given request and (TODO) parse the response according to a given schema.
 * T refers to data type for the payload, whereas R refers to expected response type
 */
async function postApiResult<T, R>(url: string, payload: T, config: AxiosRequestConfig = {}): Promise<ApiResult<R>> {
  let response: R;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.post<T, R>(url, payload, config);
  } catch (error: any) {
    if (error.response) {
      // if the error has a response, then this means that server responded
      // with an error status (4xx, 5xx), which leads us to categorize it 
      // as an http error
      return { kind: 'http-error', response: error.response };
    }
    else if (error.request) {
      // if an error were to happen where we have a request but no response, 
      // we can categorize it as an axios error (the request wasn't performed
      // correctly or the server did not respond at all).
      return { kind: 'axios-error', error: error };
    }
    else {
      // in any other case, we categorize this as an unhandled error
      return { kind: 'unhandled-error', error: error };
    }

  }

  // TODO: we should validate the data object here against our schema
  // As it is now, this is an unsafe type coercion
  return { kind: 'ok', data: response };
}
