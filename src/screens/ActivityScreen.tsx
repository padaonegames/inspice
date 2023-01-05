import React from "react";
import { Outlet } from "react-router-dom";
import GuardedRoute from "../auth/GuardedRoute";
import SessionProtectedRoute from "../auth/SessionProtectedRoute";
import Header, { HeaderAction } from "../components/Layout/Header";
import { NavigationWarning, NavMenuElem } from "../components/Layout/SideMenu";

export interface ActivityScreenProps {
  /** whether a user must have a valid username-password to access the flow */
  guarded?: boolean;
  /** whether a user must provide a valid combination of sessionId and username to access the flow */
  sessionGuarded?: boolean;
  /** Name of the Activity */
  activityTitle?: string;
  /** ID of the activity, if any */
  activityId?: string;
  /** Navigation Entries to be rendered within the associated side menu for the current template */
  navigationEntries?: NavMenuElem[];
  /** Guards to warn user about a possible loss of progress when transitioning from a given route */
  navigationWarnings?: NavigationWarning[];
  /** actions that can be performed from the header at all times during the activity */
  headerActions?: HeaderAction[];
} // ActivityScreenProps

/**
 * Render an activity underneath a header component with the provided activity title.
 */
export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  activityTitle,
  guarded = false,
  activityId,
  sessionGuarded = false,
  navigationEntries = [],
  navigationWarnings = [],
  headerActions = [],
}) => {
  const sideMenuMode = guarded
    ? "system-user"
    : sessionGuarded
    ? "session-user"
    : "none";

  return (
    <>
      <Header
        activityTitle={activityTitle}
        navigationEntries={navigationEntries}
        navigationWarnings={navigationWarnings}
        sideMenuMode={sideMenuMode}
        headerActions={headerActions}
      />
      {guarded ? (
        <GuardedRoute />
      ) : sessionGuarded && activityId ? (
        <SessionProtectedRoute activityId={activityId} />
      ) : (
        <Outlet />
      )}
    </>
  );
}; // ActivityScreen

export default ActivityScreen;
