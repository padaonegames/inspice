import { useEffect } from "react";
import {
  createSearchParams,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import LoadingOverlay from "../components/Layout/LoadingOverlay";
import { useCheckIsCurrentSessionValidQuery } from "../services/session.api";
import {
  selectSessionActivityId,
  selectSessionName,
  selectSessionUsername,
  setSession,
} from "../store/features/session/sessionSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface SessionProtectedRouteProps {
  /** Id of the activity guarded by this component */
  activityId: string;
} // SessionProtectedRouteProps

/**
 * Wrapper guard for a react router outlet to allow for automatic redirection to session login
 * page whenever current session authentication context becomes undefined.
 */
export const SessionProtectedRoute = (
  props: SessionProtectedRouteProps
): JSX.Element => {
  const { activityId: routeActivityId } = props;

  const dispatch = useAppDispatch();
  const activityId = useAppSelector(selectSessionActivityId);

  // To know where to redirect the user to after successful logins.
  // This also acts as a state, meaning that this component will be rerendered
  // after every internal route change.
  const location = useLocation();
  const navigate = useNavigate();

  // try to retrieve sessionName and username from url query params.
  // we can then use this information to perform an automated login
  const [searchParams, _] = useSearchParams();
  const pSessionName = searchParams.get("sessionName");
  const pUsername = searchParams.get("username");

  const {
    data: isCurrentSessionValid,
    isFetching,
    isSuccess,
    isError,
  } = useCheckIsCurrentSessionValidQuery(undefined, {
    skip: activityId !== routeActivityId,
  });

  useEffect(() => {
    if (isError || (isSuccess && !isCurrentSessionValid)) {
      // si ha habido algún error o nuestra sesión actual no era válida,
      // es necesario redirigir al usuario a la pantalla de login de sesión
      // y anular cualquier tipo de credencial que podamos tener almacenada en la store.
      dispatch(
        setSession({
          activityId: undefined,
          sessionName: undefined,
          username: undefined,
        })
      );
      // la redirección la haremos de forma declarativa abajo mediante un componente <Navigate/>
    }
  }, [isCurrentSessionValid, isSuccess, isError, dispatch, setSession]);

  if (isFetching) {
    return <LoadingOverlay message="Checking current session" />;
  }

  if (isSuccess && isCurrentSessionValid) {
    // we have all the information we need to go ahead, render outlet.
    // This is of course assuming that the triple is valid and registered server-side.
    // We can assume this since we are directly checking the validity of the triple every
    // time we perform a change BUT if for some reason a triple became obsolete, we would
    // eventually receive an unauthorized error code when performing an arbitrary request to the
    // API. If this is the case, then we must ensure that the session auth context removes
    // all data from local storage, internal state and headers... TODO.
    return <Outlet />;
  }

  // si no hay una sesión válida, redirigimos a la ruta de login de sesión para conseguirla.
  const loginParams =
    pSessionName && pUsername
      ? `?${createSearchParams({
          sessionName: pSessionName,
          username: pUsername,
        }).toString()}`
      : undefined;
  return (
    <Navigate
      to={`/session-login/${routeActivityId}${loginParams ?? ""}`}
      state={location.pathname}
    />
  );
};

export default SessionProtectedRoute;
