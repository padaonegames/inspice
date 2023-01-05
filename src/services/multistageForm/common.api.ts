import { api } from "../../store/api/api";
import {
  MultistageFormActivity,
} from "./../multistageFormActivity.model";

/**
 * Support API providing the endpoints required to perform basic CRUD operations
 * on multistage form activities. Operations specific to creation flows are delegated
 * to a separate API dedicated to managing edition commands.
 */
export const multistageFormActivityCommonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /** GET an activity definition by ID. */
    getMultistageFormActivityById: builder.query<
      MultistageFormActivity,
      string
    >({
      query: (activityId) => `multistage-form/activity/${activityId}`,
    }),
    /** DELETE an activity definition by ID. */
    deleteMultistageFormActivityById: builder.mutation<void, string>({
      query: (activityId) => ({
        url: `multistage-form/activity/${activityId}`,
        method: "DELETE",
      }),
    }),
    /** GET all activity definitions. */
    getMultistageFormActivities: builder.query<MultistageFormActivity[], void>({
      query: () => `multistage-form/activities`,
    }),
    /** GET all activity definitions created by currently authenticated user. */
    getMultistageFormActivitysByCurrentUser: builder.query<
      MultistageFormActivity[],
      void
    >({
      query: () => `multistage-form/user-activities`,
    }),
    /** CREATE a new activity definition. */
    requestNewMultistageFormActivity: builder.mutation<
      MultistageFormActivity,
      void
    >({
      query: () => ({ url: `multistage-form/new-activity`, method: "POST" }),
    }),
    /** UPDATE an activity definition with new data. */
    updateMultistageFormActivity: builder.mutation<
      MultistageFormActivity,
      MultistageFormActivity
    >({
      query: (activityDefinition) => ({
        url: `multistage-form/activity`,
        method: "PUT",
        body: { ...activityDefinition },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (rawResponse: { data: MultistageFormActivity }) =>
        rawResponse.data,
      // Pick out error and prevent nested properties in a hook or selector
      transformErrorResponse: (response) => response.data ?? response,
    }),
  }),
}); // multistageFormActivityCommonApi

export const {
  useGetMultistageFormActivitiesQuery,
  useGetMultistageFormActivityByIdQuery,
  useDeleteMultistageFormActivityByIdMutation,
  useGetMultistageFormActivitysByCurrentUserQuery,
  useUpdateMultistageFormActivityMutation,
  useRequestNewMultistageFormActivityMutation,
} = multistageFormActivityCommonApi;

export const { getMultistageFormActivityById } =
  multistageFormActivityCommonApi.endpoints;
