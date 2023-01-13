import { api } from "../store/api/api";
import { SigninResponse, UserData } from "./user.model";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    performUserLogin: builder.mutation<
      SigninResponse,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: `auth/signin`,
        method: "POST",
        body: { username, password },
      }),
    }),
    retrieveCurrentUserData: builder.query<UserData, void>({
      query: () => `/auth/me`,
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (rawResponse: { data: UserData }) => rawResponse.data,
      // Pick out error and prevent nested properties in a hook or selector
      transformErrorResponse: (response) => response.data ?? response,
    }),
  }),
}); // authApi

export const { usePerformUserLoginMutation, useRetrieveCurrentUserDataQuery } =
  authApi;
