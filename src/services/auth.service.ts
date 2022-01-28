import axios, { AxiosRequestConfig } from 'axios';
import { SigninResponse, UserCredentials } from './user.model';

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
export class AuthService {

  public constructor(
    private apiUrl: string,
  ) { } // constructor

  /**
   * @description Request a JWT Token for a given user to perform further API calls to protected endpoints
   * @param username user's username
   * @param password user's personal password
   */
  public async performUserLogin(username: string, password: string): Promise<ApiResult<SigninResponse>> {
    const url = `${this.apiUrl}/auth/signin`;
    const payload: UserCredentials = {
      username, password
    };
    return postApiResult<UserCredentials, SigninResponse>(url, payload);
  } // performUserLogin
}

/**
 * Run the given request and (TODO) parse the response according to a given schema.
 * T refers to data type for the payload, whereas R refers to expected response type
 */
async function postApiResult<T, R>(url: string, payload: T, config: AxiosRequestConfig = {}): Promise<ApiResult<R>> {
  let response: any;
  try {
    // we attempt to perform a GET request to the specified url and save the
    // corresponding response within the response variable.
    response = await axios.post<T, R>(url, payload, config);
    if ('data' in response) {
      response = response['data'];
    }
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
