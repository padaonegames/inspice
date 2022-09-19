import { useContext } from "react";
import {
  createSearchParams,
  Navigate,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SessionAuthContext } from "./SessionAuthStore";

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
  const { username, sessionName, activityId, setUsernameSessionActivity } =
    useContext(SessionAuthContext);

  // To know where to redirect the user to after successful logins.
  // This also acts as a state, meaning that this component will be rerendered
  // after every internal route change.
  const location = useLocation();

  // try to retrieve sessionName and username from url query params.
  // we can then use this information to perform an automated login
  const [searchParams, _] = useSearchParams();
  const pSessionName = searchParams.get("sessionName");
  const pUsername = searchParams.get("username");

  if (username && sessionName && activityId) {
    // we have all the information we need to go ahead, render outlet.
    // This is of course assuming that the triple is valid and registered server-side.
    // We can assume this since we are directly checking the validity of the triple every
    // time we perform a change BUT if for some reason a triple became obsolete, we would
    // eventually receive an unauthorized error code when performing an arbitrary request to the
    // API. If this is the case, then we must ensure that the session auth context removes
    // all data from local storage, internal state and headers... TODO.
    return <Outlet />;
  }

  setUsernameSessionActivity({
    activityId: undefined,
    sessionName: undefined,
    username: undefined,
  });

  const loginParams =
    pSessionName && pUsername
      ? `?${createSearchParams({
          sessionName: pSessionName,
          username: pUsername,
        }).toString()}`
      : undefined;

  // no token to begin with, redirect to login with current state
  return (
    <Navigate
      to={`/session-login/${routeActivityId}${loginParams ?? ""}`}
      state={location.pathname}
    />
  );
};

export default SessionProtectedRoute;
