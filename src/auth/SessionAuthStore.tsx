import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { activityService } from "../services";

/**
 * This component provides access to a wrapping context that
 * contains information relative to the currently authenticated
 * user as well as a helper method to access and modify this information
 * dynamically from any child by using the useContext hook from a child component.
 */
interface ISessionAuthContext {
  /** username for currently session-authenticated user, if any */
  username: string | undefined | null;
  /** Session ID for current session, if any */
  sessionName: string | undefined | null;
  /** activity ID for current activity, if any */
  activityId: string | undefined | null;
  /** Helper method to modify currently authenticated username, its session ID and its activity ID from useContext hook */
  setUsernameSessionActivity: (data: SessionAuthStoreState) => void;
} // ISessionAuthContext

const SessionAuthContext = React.createContext<ISessionAuthContext>({
  username: undefined,
  sessionName: undefined,
  activityId: undefined,
  setUsernameSessionActivity: (_) => {},
}); // SessionAuthContext

interface SessionAuthStoreState {
  /** username for currently session-authenticated user, if any */
  username: string | undefined | null;
  /** Session ID for current session, if any */
  sessionName: string | undefined | null;
  /** activity ID for current activity, if any */
  activityId: string | undefined | null;
} // SessionAuthStoreState

/**
 * Wrapper over an SessionAuthContext provider to provide helper methods and state management for user handling operations to children.
 * Preserves authentication data between sessions by keeping it within a localStorage variable.
 */
const SessionAuthStore: React.FC = ({ children }) => {
  // Store State (username and session/activity Id)
  const [state, setState] = useState<SessionAuthStoreState>({
    username: undefined,
    sessionName: undefined,
    activityId: undefined,
  });

  // We wrap this function in a useCallback so that it doesn't trigger
  // a re-render every time that the useEffect is triggered.
  /**
   * Validate provided token by performing a ```retrieveCurrentUserData``` request
   * against the corresponding authentication endpoint on server. If token is valid,
   * then this call will result in the default axios' Authorization header being set
   * to the token in Bearer-scheme format and the state of the store being updated with
   * both the provided token and the user data retrieved from server. In any other case,
   * state will be reverted to ```userData``` and ```accessToken``` being set to ```undefined``` and
   * the default axios' Authorization header being set to ```null```.
   *
   * @param token Token to use to retrieve current user's data.
   */
  const validateUsernameSessionActivityAndUpdateSessionData = useCallback(
    async (data: SessionAuthStoreState) => {
      console.log(data);
      console.log(axios.defaults.headers.common);
      const { username, sessionName, activityId } = data;
      if (!username || !sessionName || !activityId) {
        // reset state to undefined fields.
        axios.defaults.headers.common["inspice-session"] = null;
        axios.defaults.headers.common["inspice-activity"] = null;
        axios.defaults.headers.common["inspice-username"] = null;
        setSessionAuthState({
          username: undefined,
          sessionName: undefined,
          activityId: undefined,
        });
        return;
      }
      // verify if given username-session-activity triple is valid
      try {
        axios.defaults.headers.common["inspice-session"] = sessionName;
        axios.defaults.headers.common["inspice-activity"] = activityId;
        axios.defaults.headers.common["inspice-username"] = username;
        const response = await activityService.isCurrentSessionValid();

        // Only set full user data if a successful response is received from server.
        if (response.kind === "ok" && response.data) {
          setSessionAuthState({
            username,
            sessionName,
            activityId,
          });
        } else {
          // request was successful, but combination was not registered on server,
          // meaning that our session login was not valid. Remove authorization headers
          // and any previous user Data
          setSessionAuthState({
            username: undefined,
            sessionName: undefined,
            activityId: undefined,
          });
          axios.defaults.headers.common["inspice-session"] = null;
          axios.defaults.headers.common["inspice-activity"] = null;
          axios.defaults.headers.common["inspice-username"] = null;
        }
      } catch (err) {
        // There was an error while fetching user data.
        // remove username and sessionName
        setSessionAuthState({
          username: undefined,
          sessionName: undefined,
          activityId: undefined,
        });
        axios.defaults.headers.common["inspice-session"] = null;
        axios.defaults.headers.common["inspice-activity"] = null;
        axios.defaults.headers.common["inspice-username"] = null;
      }
      return;
    },
    []
  ); // validateUsernameSessionActivityAndUpdateSessionData;

  useEffect(() => {
    // Look for previously existing values in local storage and attempt to
    // validate current user session from them.
    const prevUsername = localStorage.getItem("username");
    const sessionName = localStorage.getItem("sessionName");
    const activityId = localStorage.getItem("activityId");
    validateUsernameSessionActivityAndUpdateSessionData({
      username: prevUsername,
      sessionName,
      activityId,
    });
  }, [validateUsernameSessionActivityAndUpdateSessionData]);

  /**
   * Set a session token/data in authentication context and save it to browser's localStorage.
   * If token is set to undefined, remove access token from localStorage entries.
   * @param token
   */
  const setSessionAuthState = (newState: SessionAuthStoreState) => {
    const { sessionName, username, activityId } = newState;

    const setLocalStorageOrRemove = (key: string, value: any) => {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    }; // setLocalStorageOrRemove

    setLocalStorageOrRemove("sessionName", sessionName);
    setLocalStorageOrRemove("username", username);
    setLocalStorageOrRemove("activityId", activityId);
    setState(newState);
  }; // setSessionAuthState

  return (
    <SessionAuthContext.Provider
      value={{
        username: state.username,
        sessionName: state.sessionName,
        activityId: state.activityId,
        setUsernameSessionActivity:
          validateUsernameSessionActivityAndUpdateSessionData,
      }}
    >
      {children}
    </SessionAuthContext.Provider>
  );
}; // SessionAuthStore

export { SessionAuthStore, SessionAuthContext };
