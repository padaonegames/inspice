import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.REACT_APP_SERVER_API_URL ??
      "http://testinspice.padaonegames.com/api"
    }`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        // tenemos un token de acceso almacenado dentro de la slice
        // de autenticación de nuestra store, podemos utilizarlo para
        // inyectar una cabecera de authorization con esquema Bearer,
        // que es lo que espera el servidor en los endpoints protegidos
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      const sessionData = (getState() as RootState).session;
      if (
        sessionData.activityId &&
        sessionData.sessionName &&
        sessionData.username
      ) {
        headers.set("inspice-activity", sessionData.activityId);
        headers.set("inspice-session", sessionData.sessionName);
        headers.set("inspice-username", sessionData.username);
      }
      console.log(headers);
    },
  }),
  endpoints: () => ({}),
}); // api
