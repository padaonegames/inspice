import React from 'react';
import { Outlet } from 'react-router-dom';
import GuardedRoute from '../auth/GuardedRoute';
import Header from '../components/Layout/Header';
import { NavigationWarning, NavMenuElem } from '../components/Layout/SideMenu';

export interface ActivityScreenProps {
  guarded?: boolean;
  /** Name of the Activity */
  activityTitle?: string;
  /** Navigation Entries to be rendered within the associated side menu for the current template */
  navigationEntries?: NavMenuElem[];
  /** Guards to warn user about a possible loss of progress when transitioning from a given route */
  navigationWarnings?: NavigationWarning[];
}

/**
 * Render an activity underneath a header component with the provided activity title.
 */
export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  activityTitle,
  guarded = false,
  navigationEntries = [],
  navigationWarnings = []
}) => {

  return (
    <>
      <Header
        activityTitle={activityTitle}
        navigationEntries={navigationEntries}
        navigationWarnings={navigationWarnings}
      />
      {guarded ? <GuardedRoute /> : <Outlet />}
    </>
  );
}

export default ActivityScreen;