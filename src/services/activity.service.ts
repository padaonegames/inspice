import { ActivitySession, NewActivitySession } from "./activity.model";
import {
  getApiResult,
  deleteApiResult,
  postApiResult,
  ApiResult,
  putApiResult,
} from "./apiRequestUtils";

/**
 * The Api is responsible for all communication with the Project's Apis and Backends. ()
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every
 * frontend/ backend side).
 */
export class ActivityService {
  public constructor(private apiUrl: string) {} // constructor

  /**
   * @description Request the creation of a given number of user ids
   * @param sessionId id of the session to which we wish to add new usernames
   * @param usernameQuantity number of usernames to generate for this session
   */
  public async requestUsernamesForSessionWithId(
    sessionId: string,
    usernameQuantity: number
  ): Promise<ApiResult<void>> {
    const url = `${this.apiUrl}/activity/request-session-usernames`;

    const config = {
      params: {
        sessionId,
        usernameQuantity,
      },
    };
    return putApiResult<void, void>(url, undefined, config);
  } // requestUsernamesForSessionWithId

  /**
   * @description Retrieve all activity sessions associated to activity with given id.
   * @param activityId id of the activity
   */
  public async getSessionDefinitionsByActivityId(
    activityId: string
  ): Promise<ApiResult<ActivitySession[]>> {
    const url = `${this.apiUrl}/activity/sessions`;

    const config = {
      params: {
        activityId,
      },
    };
    return getApiResult<ActivitySession[]>(url, config);
  } // getSessionDefinitionsByActivityId

  /**
   * @description Check whether given combination of username and sessionId is registered for activity with specified id
   * @param activityId id of the activity
   * @param username username to check
   * @param sessionName name of the session that needs to be checked (unique within activity)
   */
  public async checkUsernameSessionPairForActivityId(
    activityId: string,
    username: string,
    sessionName: string
  ): Promise<ApiResult<boolean>> {
    const url = `${this.apiUrl}/activity/validate-session`;

    const config = {
      params: {
        activityId,
        username,
        sessionName,
      },
    };
    return getApiResult<boolean>(url, config);
  } // checkUsernameSessionPairForActivityId

  /**
   * @description Check whether given session name exists for current activity
   * @param activityId id of the activity
   * @param sessionName name of the session that needs to be checked
   */
  public async checkSessionNameInUse(
    activityId: string,
    sessionName: string
  ): Promise<ApiResult<boolean>> {
    const url = `${this.apiUrl}/activity/session-exists`;

    const config = {
      params: {
        activityId,
        sessionName,
      },
    };
    return getApiResult<boolean>(url, config);
  } // checkSessionNameInUse

  /**
   * @description Check whether current session is valid (from headers)
   */
  public async isCurrentSessionValid(): Promise<ApiResult<boolean>> {
    const url = `${this.apiUrl}/activity/current-session-valid`;
    return getApiResult<boolean>(url);
  } // isCurrentSessionValid

  public async requestNewSessionWithNameForActivityWithId(
    sessionName: string,
    activityId: string
  ): Promise<ApiResult<ActivitySession>> {
    const url = `${this.apiUrl}/activity/session`;

    const newActivitySession: NewActivitySession = {
      sessionName,
      activityId,
    };
    return postApiResult<NewActivitySession, ActivitySession>(
      url,
      newActivitySession
    );
  }
} // ActivityService
