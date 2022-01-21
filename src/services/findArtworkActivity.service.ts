import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CompletedFindArtworkActivityDefinition, CompletedTreasureHuntDefinition, FindArtworkActivityDefinition, GetFindArtworkActivityDefinitionByIdResponse, GetTreasureHuntDefinitionByIdResponse, SubmitFindArtworkActivityDefinitionResponse, SubmitTreasureHuntDefinitionResponse } from './findArtworkActivity.model';

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
 * The Api is responsible for all communication with the Project's Apis and Backends. (Artworks)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class FindArtworkActivityService {

  public constructor(
    private apiUrl: string,
    private datasetUuid: string,
    private activityDefinitionsDatasetUuid: string,
    private huntDefinitionsDatasetUuid: string,
    private apiKey: string,
  ) { }

  /**
   * Retrieve an activity by its id
   */
  public async getFindArtworkActivityDefinitionById(activityId: string): Promise<ApiResult<GetFindArtworkActivityDefinitionByIdResponse>> {
    const url = `${this.apiUrl}/object/${this.activityDefinitionsDatasetUuid}`;

    const query = `{ "_id": "${activityId}" }`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
      params: {
        query: query
      }
    };
    return getApiResult<GetFindArtworkActivityDefinitionByIdResponse>(url, opts);
  }

  /**
 * Retrieve all activities
 */
  public async getFindArtworkActivityDefinitions(): Promise<ApiResult<FindArtworkActivityDefinition[]>> {
    const url = `${this.apiUrl}/object/${this.activityDefinitionsDatasetUuid}`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
    };
    return getApiResult<FindArtworkActivityDefinition[]>(url, opts);
  }

  /**
* Retrieve all treasure hunts
*/
  public async getTreasureHuntDefinitions(): Promise<ApiResult<GetTreasureHuntDefinitionByIdResponse>> {
    const url = `${this.apiUrl}/object/${this.huntDefinitionsDatasetUuid}`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
    };
    return getApiResult<GetTreasureHuntDefinitionByIdResponse>(url, opts);
  }

  /**
 * Retrieve a treasure hunt by its id
 */
  public async getTreasureHuntDefinitionById(treasureHuntId: string): Promise<ApiResult<GetTreasureHuntDefinitionByIdResponse>> {
    const url = `${this.apiUrl}/object/${this.huntDefinitionsDatasetUuid}`;

    const query = `{ "_id": "${treasureHuntId}" }`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
      params: {
        query: query
      }
    };
    return getApiResult<GetTreasureHuntDefinitionByIdResponse>(url, opts);
  }


  /**
* Retrieve all treasure hunts belonging to a given activity
*/
  public async getTreasureHuntDefinitionsByActivityId(activityId: string): Promise<ApiResult<GetTreasureHuntDefinitionByIdResponse>> {
    const url = `${this.apiUrl}/object/${this.huntDefinitionsDatasetUuid}`;

    const query = `{ "activityId": "${activityId}" }`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
      params: {
        query: query
      }
    };
    return getApiResult<GetTreasureHuntDefinitionByIdResponse>(url, opts);
  }

  /**
   * Submit an Activity Definition to the persistence layer
   */
  public async submitFindArtworkActivityDefinition(activityDefinition: CompletedFindArtworkActivityDefinition):
    Promise<ApiResult<SubmitFindArtworkActivityDefinitionResponse>> {
    const url = `${this.apiUrl}/object/${this.activityDefinitionsDatasetUuid}`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
    };

    const apiDefinition: CompletedFindArtworkActivityDefinition = {
      ...activityDefinition,
      huntDefinitionsDatasetUuid: this.huntDefinitionsDatasetUuid,
      artworksDatasetUuid: this.datasetUuid,
    };

    return postApiResult<CompletedFindArtworkActivityDefinition, SubmitFindArtworkActivityDefinitionResponse>
      (url, apiDefinition, opts);
  }

  public async submitTreasureHuntDefinition(treasureHuntDefinition: CompletedTreasureHuntDefinition):
    Promise<ApiResult<SubmitTreasureHuntDefinitionResponse>> {
    const url = `${this.apiUrl}/object/${this.huntDefinitionsDatasetUuid}`;

    const opts: AxiosRequestConfig = {
      auth: {
        username: this.apiKey,
        password: this.apiKey
      },
    };

    const apiDefinition: CompletedTreasureHuntDefinition = {
      ...treasureHuntDefinition
    };

    return postApiResult<CompletedTreasureHuntDefinition, SubmitTreasureHuntDefinitionResponse>
      (url, apiDefinition, opts);
  }

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