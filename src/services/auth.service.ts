import { ApiResult, getApiResult, postApiResult } from "./apiRequestUtils";
import { SigninResponse, UserCredentials, UserData } from "./user.model";

/**
 * The Api is responsible for all communication with the Project's Apis and Backends. (GamGame)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every
 * frontend/ backend side).
 */
export class AuthService {
  public constructor(private apiUrl: string) {} // constructor

  /**
   * @description Request a JWT Token for a given user to perform further API calls to protected endpoints
   * @param username user's username
   * @param password user's personal password
   */
  public async performUserLogin(
    username: string,
    password: string
  ): Promise<ApiResult<SigninResponse>> {
    const url = `${this.apiUrl}/auth/signin`;
    const payload: UserCredentials = {
      username,
      password,
    };
    return postApiResult<UserCredentials, SigninResponse>(url, payload);
  } // performUserLogin

  public async retrieveCurrentUserData(): Promise<ApiResult<UserData>> {
    const url = `${this.apiUrl}/auth/me`;
    return getApiResult<UserData>(url);
  } // retrieveCurrentUserData
} // AuthService
