import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

/**
 * Versión tipada del hook `useDispatch` de Redux a utilizar en las distintas
 * secciones de la aplicación para poder importar el dispatcher sin necesidad
 * de andar preocupándonos de los tipos que utiliza por detrás.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
/**
 * Versión tipada del hook `useSelector` de Redux a utilizar en las distintas
 * secciones de la aplicación para poder importar el selector sin necesidad
 * de andar preocupándonos de los tipos que utiliza por detrás.
 *
 * El tipo en sí que usamos aquí para definir este hook viene en realidad
 * del proprio Redux y esencialmente rellena un tipo genérico para el hook
 * del selector con el tipo proporcionado por nosotros en esta declaración.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
