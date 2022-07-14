import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { EscapeRoomActivityDefinition } from './escapeRoomActivity.model';

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
 * The Api is responsible for all communication with the Project's Apis and Backends.
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every 
 * frontend/ backend side).
 */
export class EscapeRoomActivityService {

  public constructor(
    private apiUrl: string
  ) { } // constructor

  /**
   * @description Retrieve a Escape Room activity by its id
   * @param activityId ID of the activity to retrieve
   */
  public async getEscapeRoomActivityDefinitionById(activityId: string): Promise<ApiResult<EscapeRoomActivityDefinition>> {
    const url = `${this.apiUrl}/escape-room/activity/${activityId}`;
    return getApiResult<EscapeRoomActivityDefinition>(url);
  } // getEscapeRoomActivityDefinitionById

  /**
   * @description Delete a Escape Room activity by its id
   * @param activityId ID of the activity to delete
   */
  public async deleteEscapeRoomActivityDefinitionById(activityId: string): Promise<ApiResult<EscapeRoomActivityDefinition[]>> {
    const url = `${this.apiUrl}/escape-room/activity/${activityId}`;
    return deleteApiResult<EscapeRoomActivityDefinition[]>(url);
  } // deleteEscapeRoomActivityDefinitionById

  /**
   * @description Retrieve all Escape Room activities
   */
  public async getEscapeRoomActivityDefinitions(): Promise<ApiResult<EscapeRoomActivityDefinition[]>> {
    const url = `${this.apiUrl}/escape-room/activities`;
    return getApiResult<EscapeRoomActivityDefinition[]>(url);
  } // getEscapeRoomActivityDefinitions

  /**
   * @description Retrieve all Escape Room user-created story definitions
   */
  public async getEscapeRoomActivityDefinitionsByCurrentUser(): Promise<ApiResult<EscapeRoomActivityDefinition[]>> {
    const url = `${this.apiUrl}/escape-room/user-activities`;
    return getApiResult<EscapeRoomActivityDefinition[]>(url);
  } // getEscapeRoomActivityDefinitionsByCurrentUser

  /**
   * @description Request a new Activity Definition on the persistence layer
   */
  public async requestNewEscapeRoomActivityDefinition(): Promise<ApiResult<EscapeRoomActivityDefinition>> {
    const url = `${this.apiUrl}/escape-room/new-activity`;
    return postApiResult<{}, EscapeRoomActivityDefinition>(url, {});
  } // requestNewEscapeRoomActivityDefinition

    /**
   * @description Update an Activity Definition on the persistence layer
   * @param activityDefinition Activity definition to update
   */
     public async updateEscapeRoomActivityDefinition(activityDefinition: EscapeRoomActivityDefinition): Promise<ApiResult<EscapeRoomActivityDefinition>> {
      const url = `${this.apiUrl}/escape-room/activity`;
  
      const apiDefinition: EscapeRoomActivityDefinition = {
        ...activityDefinition,
      };
  
      return putApiResult<EscapeRoomActivityDefinition, EscapeRoomActivityDefinition>(url, apiDefinition);
    } // updateEscapeRoomActivityDefinition

} // EscapeRoomActivityService


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
 * Run the given request and (TODO) parse the response according to a given schema
 */
async function deleteApiResult<T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResult<T>> {
  let response: AxiosResponse<T>;
  try {
    // we attempt to perform a DELETE request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.delete<T>(url, config);
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

/**
 * Run the given request and (TODO) parse the response according to a given schema.
 * T refers to data type for the payload, whereas R refers to expected response type
 */
async function putApiResult<T, R>(url: string, payload: T, config: AxiosRequestConfig = {}): Promise<ApiResult<R>> {
  let response: R;
  try {
    // we attempt to perform a PUT request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.put<T, R>(url, payload, config);
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
