import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GuardedRoute from "../auth/GuardedRoute";
import SessionProtectedRoute from "../auth/SessionProtectedRoute";
import Header, { HeaderAction } from "../components/Layout/Header";
import { NavigationWarning, NavMenuElem } from "../components/Layout/SideMenu";

const Root = styled.div`
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
`;

export interface ActivityScreenProps {
  /** whether a user must have a valid username-password to access the flow */
  guarded?: boolean;
  /** whether a user must provide a valid combination of sessionId and username to access the flow */
  sessionGuarded?: boolean;
  /** Name of the Activity */
  activityTitle?: string;
  /** Navigation Entries to be rendered within the associated side menu for the current template */
  navigationEntries?: NavMenuElem[];
  /** Guards to warn user about a possible loss of progress when transitioning from a given route */
  navigationWarnings?: NavigationWarning[];
  /** actions that can be performed from the header at all times during the activity */
  headerActions?: HeaderAction[];
  /** languages that can be selected by the user during the activity */
  availableLanguages?: string[];
  /** callback to parent specifying what to do when page icon is clicked */
  onHeaderIconClicked?: () => void;
} // ActivityScreenProps

/**
 * Render an activity underneath a header component with the provided activity title.
 */
export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  activityTitle,
  guarded = false,
  sessionGuarded = false,
  navigationEntries = [],
  navigationWarnings = [],
  headerActions = [],
  availableLanguages = [],
  onHeaderIconClicked,
}) => {
  const sideMenuMode = guarded
    ? "system-user"
    : sessionGuarded
    ? "session-user"
    : "none";

  return (
    <Root>
      <Header
        availableLanguages={availableLanguages}
        activityTitle={activityTitle}
        navigationEntries={navigationEntries}
        navigationWarnings={navigationWarnings}
        sideMenuMode={sideMenuMode}
        headerActions={headerActions}
        onHeaderIconClicked={onHeaderIconClicked}
      />
      {guarded ? (
        <GuardedRoute />
      ) : sessionGuarded ? (
        <SessionProtectedRoute />
      ) : (
        <Outlet />
      )}
    </Root>
  );
}; // ActivityScreen

export default ActivityScreen;
