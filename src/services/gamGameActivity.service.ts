import {
  ApiResult,
  deleteApiResult,
  getApiResult,
  postApiResult,
  putApiResult,
} from "./apiRequestUtils";
import {
  CompletedGamGameActivityDefinition,
  GamGameActivityDefinition,
  GamGameStoryDefinitionData,
  InProgressGamGameStoryDefinitionData,
} from "./gamGameActivity.model";

/**
 * The Api is responsible for all communication with the Project's Apis and Backends. (GamGame)
 * Ideally, we should incorporate a schema validator to all requests to ensure that
 * the data that gets fetched from the endpoints strictly matches the structures defined
 * in the specification (which ought to be included as a JSON schema elsewhere in every
 * frontend/ backend side).
 */
export class GamGameActivityService {
  public constructor(private apiUrl: string) {} // constructor

  /**
   * @description Retrieve a GAM Game activity by its id
   * @param activityId ID of the activity to retrieve
   */
  public async getGamGameActivityDefinitionById(
    activityId: string
  ): Promise<ApiResult<GamGameActivityDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/activity/${activityId}`;
    return getApiResult<GamGameActivityDefinition[]>(url);
  } // getGamGameActivityDefinitionById

  /**
   * @description Delete a GAM Game activity by its id
   * @param activityId ID of the activity to delete
   */
  public async deleteGamGameActivityDefinitionById(
    activityId: string
  ): Promise<ApiResult<GamGameActivityDefinition[]>> {
    const url = `${this.apiUrl}/gam-game/activity/${activityId}`;
    return deleteApiResult<GamGameActivityDefinition[]>(url);
  } // deleteGamGameActivityDefinitionById

  /**
   * @description Delete a GAM Game story by its id
   * @param storyId ID of the activity to delete
   */
  public async deleteGamGameStoryDefinitionById(
    storyId: string
  ): Promise<ApiResult<GamGameStoryDefinitionData[]>> {
    const url = `${this.apiUrl}/gam-game/story/${storyId}`;
    return deleteApiResult<GamGameStoryDefinitionData[]>(url);
  } // deleteGamGameStoryDefinitionById

  /**
   * @description Retrieve all GAM Game activities
   */
  public async getGamGameActivityDefinitions(): Promise<
    ApiResult<GamGameActivityDefinition[]>
  > {
    const url = `${this.apiUrl}/gam-game/activities`;
    return getApiResult<GamGameActivityDefinition[]>(url);
  } // getGamGameActivityDefinitions

  /**
   * @description Retrieve all GAM Game user-created story definitions
   */
  public async getGamGameStoryDefinitions(): Promise<
    ApiResult<GamGameStoryDefinitionData[]>
  > {
    const url = `${this.apiUrl}/gam-game/stories`;
    return getApiResult<GamGameStoryDefinitionData[]>(url);
  } // getGamGameStoryDefinitions

  public async getGamGameStoryRecommendationsByEmotion(
    relation: "opposite" | "similar",
    storyId: string
  ): Promise<ApiResult<GamGameStoryDefinitionData[]>> {
    const url = `${this.apiUrl}/gam-game/stories/story-recommendations?relation=${relation}&storyId=${storyId}`;
    return getApiResult<GamGameStoryDefinitionData[]>(url);
  } // getGamGameStoryRecommendationsByEmotion

  /**
   * @description Retrieve all GAM Game user-created story definitions
   */
  public async getGamGameStoryDefinitionsByCurrentUser(): Promise<
    ApiResult<GamGameStoryDefinitionData[]>
  > {
    const url = `${this.apiUrl}/gam-game/stories/user-stories`;
    return getApiResult<GamGameStoryDefinitionData[]>(url);
  } // getGamGameStoryDefinitionsByCurrentUser

  /**
   * @description Retrieve a GAM Game story by id
   * @param storyId Id of the story definition to fetch
   */
  public async getGamGameStoryDefinitionById(
    storyId: string
  ): Promise<ApiResult<GamGameStoryDefinitionData[]>> {
    const url = `${this.apiUrl}/gam-game/story/${storyId}`;
    return getApiResult<GamGameStoryDefinitionData[]>(url);
  } // getGamGameStoryDefinitionById

  /**
   * @description Set the like status of given story
   * @param storyId Id of the story to like or dislike
   * @param likeStatus whether to like or dislike story
   */
  public async setStoryLikedStatus(
    storyId: string,
    likeStatus: boolean
  ): Promise<ApiResult<void>> {
    const url = `${this.apiUrl}/gam-game/stories/set-story-like-status?storyId=${storyId}&likeStatus=${likeStatus}`;
    return putApiResult<void, void>(url, undefined);
  } // getGamGameStoryDefinitionById

  /**
   * @description Retrieve all GAM Game stories belonging to a given activity
   * @param activityId Id of the story definition to fetch
   */
  public async getGamGameStoryDefinitionsByActivityId(
    activityId: string
  ): Promise<ApiResult<GamGameStoryDefinitionData[]>> {
    const url = `${this.apiUrl}/gam-game/activity/${activityId}/stories`;
    return getApiResult<GamGameStoryDefinitionData[]>(url);
  } // getGamGameStoryDefinitionsByActivityId

  /**
   * @description Retrieve all GAM Game stories containing a given artwork
   * @param artworkId Id of the artwork that the stories must contain
   */
  public async getGamGameStoryDefinitionsByArtworkId(
    artworkId: string
  ): Promise<ApiResult<GamGameStoryDefinitionData[]>> {
    const url = `${this.apiUrl}/gam-game/stories/query?artworkId=${artworkId}`;
    return getApiResult<GamGameStoryDefinitionData[]>(url);
  } // getGamGameStoryDefinitionsByArtworkId

  /**
   * @description Submit an Activity Definition to the persistence layer
   * @param activityDefinition Activity definition to submit
   */
  public async submitGamGameActivityDefinition(
    activityDefinition: CompletedGamGameActivityDefinition
  ): Promise<ApiResult<GamGameActivityDefinition>> {
    const url = `${this.apiUrl}/gam-game/activity`;

    const apiDefinition: CompletedGamGameActivityDefinition = {
      ...activityDefinition,
    };

    return postApiResult<
      CompletedGamGameActivityDefinition,
      GamGameActivityDefinition
    >(url, apiDefinition);
  } // submitGamGameActivityDefinition

  /**
   * @description Update an Activity Definition from the persistence layer
   * @param activityDefinition Activity definition to update
   */
  public async updateGamGameActivityDefinition(
    activityDefinition: GamGameActivityDefinition
  ): Promise<ApiResult<GamGameActivityDefinition>> {
    const url = `${this.apiUrl}/gam-game/activity`;

    return putApiResult<GamGameActivityDefinition, GamGameActivityDefinition>(
      url,
      activityDefinition
    );
  } // updateGamGameActivityDefinition

  /**
   * @description Submit a user created Story Definition to the persistence layer
   * @param storyDefinition Story definition to submit
   */
  public async submitGamGameStoryDefinition(
    storyDefinition: InProgressGamGameStoryDefinitionData
  ): Promise<ApiResult<GamGameStoryDefinitionData>> {
    const url = `${this.apiUrl}/gam-game/story`;

    return postApiResult<
      InProgressGamGameStoryDefinitionData,
      GamGameStoryDefinitionData
    >(url, storyDefinition);
  } // submitGamGameStoryDefinition
}
