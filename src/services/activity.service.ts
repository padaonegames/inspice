import { ActivitySession } from "./activity.model";
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
} // ActivityService
