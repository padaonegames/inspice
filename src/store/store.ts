import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./api/api";
import authReducer, { authMiddleware } from "./features/auth/authSlice";
import sessionReducer, {
  sessionMiddleware,
} from "./features/session/sessionSlice";
import multistageFormConsumptionReducer from "./features/multistageForm/multistageFormConsumptionSlice";
import multistageFormCreationReducer from "./features/multistageForm/multistageFormCreationSlice";

/**
 * Definición del rootReducer de nuestra store a partir de las slices de los ficheros
 * correspondientes a cada pieza del estado.
 *
 * Esto se puede especificar directamente sin hacer uso de combineReducers,
 * pero separarlo nos permite declarar el tipo de RootState sin hacer una referencia
 * explícita a la store. Esto es importante en el caso en que queramos añadir custom
 * middleware como `authMiddleware`, de cara a evitar dependencias circulares en el tipado.
 * Más concretamente, el middleware se define en base a `RootState`, que a su vez depende
 * de `store`, que debe incluir `authMiddleware`. Separando el tipado en `rootReducer` resolvemos
 * esta dependencia circular.
 */
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  session: sessionReducer,
  multistageFormCreation: multistageFormCreationReducer,
  multistageFormConsumption: multistageFormConsumptionReducer,
}); // rootReducer

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authMiddleware)
      .concat(sessionMiddleware)
      .concat(api.middleware),
});

setupListeners(store.dispatch);

/**
 * Vamos a exportar un par de tipos desde aquí para poder
 * referenciarlos más adelante en distintos lugares de la aplicación
 * en los que puedan resultar útiles. Inferir estos tipos directamente
 * desde la store de Redux implica que estos se irán actualizando correctamente
 * según vayamos añadiendo más slices o modificaciones a los middlewares.
 */
/**
 * Tipo del estado global de la aplicación según la store de Redux.
 */
export type RootState = ReturnType<typeof rootReducer>;
/**
 * Tipo del dispatch de Redux sobre la store global de la aplicación.
 */
export type AppDispatch = typeof store.dispatch;
export default store;
