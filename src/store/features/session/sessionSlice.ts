import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

export interface SessionState {
  /** username for currently session-authenticated user, if any */
  username: string | undefined;
  /** Session ID for current session, if any */
  sessionName: string | undefined;
  /** activity ID for current activity, if any */
  activityId: string | undefined;
} // SessionState

/**
 * Tratamos de extraer un objeto de sesión previo de localStorage
 * por si quedara alguna sesión abierta de antes. TODO: Validar que el formato
 * de lo que recuperamos es verdaderamente un SessionState. A partir de ello,
 * generamos un estado inicial para la slice.
 */
const storedState = localStorage.getItem("session");
const initialState: SessionState = storedState
  ? JSON.parse(storedState)
  : {
      username: undefined,
      sessionName: undefined,
      activityId: undefined,
    };

if (!storedState) {
  // Esto está aquí para que sigan funcionando los casos de uso anteriores,
  // como el GAM Game, hasta que tengan sus apis pasadas a RTK Query.
  // En todos los demás casos, es la propia api de RTK query la que se encarga
  // de inyectar estas cabeceras de forma automática si se cuenta con esta información.
  axios.defaults.headers.common["inspice-session"] = null;
  axios.defaults.headers.common["inspice-activity"] = null;
  axios.defaults.headers.common["inspice-username"] = null;
} else {
  axios.defaults.headers.common["inspice-session"] = initialState.sessionName;
  axios.defaults.headers.common["inspice-activity"] = initialState.activityId;
  axios.defaults.headers.common["inspice-username"] = initialState.username;
}

const slice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setSession: (
      state,
      {
        payload: { username, sessionName, activityId },
      }: PayloadAction<SessionState>
    ) => {
      // Si cualquiera de los tres campos de sesión resultara ser
      // nulo, nos aseguramos de borrar el otro (no tiene sentido tener
      // un dato de sesión sin los demás).
      if (!username || !sessionName || !activityId) {
        state.activityId = undefined;
        state.sessionName = undefined;
        state.username = undefined;

        // Esto está aquí para que sigan funcionando los casos de uso anteriores,
        // como el GAM Game, hasta que tengan sus apis pasadas a RTK Query.
        // En todos los demás casos, es la propia api de RTK query la que se encarga
        // de inyectar estas cabeceras de forma automática si se cuenta con esta información.
        axios.defaults.headers.common["inspice-session"] = null;
        axios.defaults.headers.common["inspice-activity"] = null;
        axios.defaults.headers.common["inspice-username"] = null;
      } else {
        state.activityId = activityId;
        state.sessionName = sessionName;
        state.username = username;

        axios.defaults.headers.common["inspice-session"] = sessionName;
        axios.defaults.headers.common["inspice-activity"] = activityId;
        axios.defaults.headers.common["inspice-username"] = username;
      }
    },
  },
});

export const { setSession } = slice.actions;

/**
 * Custom middleware de la store de redux que nos permitirá persistir en localStorage
 * el estado de sesión cada vez que se aplique una acción que actúe sobre la
 * slice correspondiente en la store.
 */
export const sessionMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    // Nos guardamos el resultado del dispatch de la acción en cuestión de forma auxiliar
    // antes de proceder con el guardado, ya que lo que queremos almacenar en localStorage
    // es el valor del estado DESPUÉS de aplicar action.
    const result = next(action);

    // las acciones declaradas dentro de nuestro createSlice de forma implícita a partir de
    // los elementos listados como reducers pueden ser accedidas y utilizadas para comprobar
    // si un objeto posee el mismo tipo. Esto nos permite tomar las acciones que queramos interceptar
    // y detectarlas sin necesidad de tener que preocuparnos de su contenido o tipos.
    if (setSession.match(action)) {
      // la acción que hemos recibido se corresponde con una de las que nos interesa interceptar
      // por lo que es el momento de usar el resultado y persistirlo en memoria local.
      const sessionState = store.getState().session; // estado de sesión
      localStorage.setItem("session", JSON.stringify(sessionState));
    }
    // como esto es un middleware, necesitamos devolver el resultado que nos hemos guardado
    // para continuar con la cadena de llamadas. En particular este return devolverá el flujo
    // de ejecución al middleware que se llamara de forma immediatamente anterior a este.
    return result;
  }; // sessionMiddleware

export default slice.reducer;

export const selectSessionUsername = (state: RootState) =>
  state.session.username;
export const selectSessionName = (state: RootState) =>
  state.session.sessionName;
export const selectSessionActivityId = (state: RootState) =>
  state.session.activityId;
