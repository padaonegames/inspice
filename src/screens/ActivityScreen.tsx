import React from 'react';
import { Outlet } from 'react-router-dom';
import GuardedRoute from '../auth/GuardedRoute';
import Header from '../components/Layout/Header';
import { NavMenuElem } from '../components/Layout/SideMenu';

export interface ActivityScreenProps {
  activityTitle: string;
  guarded?: boolean;
  navigationEntries?: NavMenuElem[];
}

/**
 * Render an activity underneath a header component with the provided activity title.
 */
export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  activityTitle,
  guarded = false,
  navigationEntries = []
}) => {

  return (
    <>
      <Header
        activityTitle={activityTitle}
        navigationEntries={navigationEntries}
      />
      {guarded ? <GuardedRoute /> : <Outlet />}
    </>
  );
}

export default ActivityScreen;