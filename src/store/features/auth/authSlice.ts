import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../../../services/user.model";
import { RootState } from "../../store";

interface AuthState {
  /** Data object for currently authenticated user (or undefined if not authenticated) */
  userData: UserData | undefined;
  /** API JWT token for current session */
  accessToken: string | undefined;
} // AuthState

/**
 * Tratamos de extraer un objeto de autenticación previo de localStorage
 * por si quedara alguna sesión abierta de antes. TODO: Validar que el formato
 * de lo que recuperamos es verdaderamente un AuthState. A partir de ello,
 * generamos un estado inicial para la slice.
 */
const storedState = localStorage.getItem("auth");
const initialState: AuthState = storedState
  ? JSON.parse(storedState)
  : {
      userData: undefined,
      accessToken: undefined,
    };

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { userData, accessToken },
      }: PayloadAction<{
        userData: UserData | undefined;
        accessToken: string | undefined;
      }>
    ) => {
      // Si cualquiera de los dos campos de autenticación resultara ser
      // nulo, nos aseguramos de borrar el otro (no tiene sentido tener
      // un token sin usuario o viceversa).
      if (!accessToken || !userData) {
        state.accessToken = undefined;
        state.userData = undefined;

        /**
         * Esto está aquí para que sigan funcionando casos de uso que todavía no
         * estén implementados usando las store de Redux como el GAM Game o el
         * Escape Room. En los demás, las APIs ya se encargan automáticamente de
         * añadir estas cabeceras cuando es necesario.
         */
        axios.defaults.headers.common["Authorization"] = null;
      } else {
        state.accessToken = accessToken;
        state.userData = userData;

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
      state.userData = accessToken ? userData : undefined;
      state.accessToken = userData ? accessToken : undefined;
    },
  },
});

export const { setCredentials } = slice.actions;

/**
 * Custom middleware de la store de redux que nos permitirá persistir en localStorage
 * el estado de autenticación cada vez que se aplique una acción que actúe sobre la
 * slice correspondiente en la store.
 */
export const authMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    // Nos guardamos el resultado del dispatch de la acción en cuestión de forma auxiliar
    // antes de proceder con el guardado, ya que lo que queremos almacenar en localStorage
    // es el valor del estado DESPUÉS de aplicar action.
    const result = next(action);

    // las acciones declaradas dentro de nuestro createSlice de forma implícita a partir de
    // los elementos listados como reducers pueden ser accedidas y utilizadas para comprobar
    // si un objeto posee el mismo tipo. Esto nos permite tomar las acciones que queramos interceptar
    // y detectarlas sin necesidad de tener que preocuparnos de su contenido o tipos.
    if (setCredentials.match(action)) {
      // la acción que hemos recibido se corresponde con una de las que nos interesa interceptar
      // por lo que es el momento de usar el resultado y persistirlo en memoria local.
      const authState = store.getState().auth; // estado de autenticación
      localStorage.setItem("auth", JSON.stringify(authState));
    }
    // como esto es un middleware, necesitamos devolver el resultado que nos hemos guardado
    // para continuar con la cadena de llamadas. En particular este return devolverá el flujo
    // de ejecución al middleware que se llamara de forma immediatamente anterior a este.
    return result;
  }; // authMiddleware

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.userData;
export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.accessToken;
