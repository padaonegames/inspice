import { api } from "../store/api/api";

export const sessionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkUsernameSessionPairForActivityId: builder.query<
      boolean,
      { activityId: string; username: string; sessionName: string }
    >({
      query: ({ username, activityId, sessionName }) => ({
        url: `activity/validate-session`,
        method: "GET",
        params: { username, activityId, sessionName },
      }),
    }),
    checkSessionNameInUse: builder.query<
      boolean,
      { activityId: string; sessionName: string }
    >({
      query: ({ activityId, sessionName }) => ({
        url: `activity/session-exists`,
        method: "GET",
        params: {
          activityId,
          sessionName,
        },
      }),
    }),
    checkIsCurrentSessionValid: builder.query<boolean, void>({
      query: () => ({
        url: `activity/current-session-valid`,
        method: "GET",
      }),
    }),
  }),
}); // authApi

export const {
  useCheckUsernameSessionPairForActivityIdQuery,
  useLazyCheckUsernameSessionPairForActivityIdQuery,
  useCheckIsCurrentSessionValidQuery,
  useLazyCheckIsCurrentSessionValidQuery,
  useCheckSessionNameInUseQuery,
  useLazyCheckSessionNameInUseQuery,
} = sessionApi;
