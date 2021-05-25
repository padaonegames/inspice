import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetArtworkByIdResponse } from './commonDefinitions';

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
export class Api {

  /**
   * We will eventually need more than just one apiUrl to distinguish between persistence,
   * recommendation, personalization, user management and so on.
   */
  public constructor(
    private apiUrl: string,
  ) { }


  /**
   * Retrieve an artwork by its id
   */
  public async getArtworkById(artworkId: string): Promise<ApiResult<GetArtworkByIdResponse>> {
    const url = `${this.apiUrl}/artwork/${artworkId}`;
    return getApiResult<GetArtworkByIdResponse>(url);
  }
}

/**
 * Run the given request and (TODO) parse the response according to a given schema
 */
async function getApiResult<T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResult<T>> {
  let response: AxiosResponse<GetArtworkByIdResponse>;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.get<GetArtworkByIdResponse>(url, config)
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
