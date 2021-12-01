import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';

export interface ActivityScreenProps {
  activityTitle: string;
}

/**
 * Render an activity underneath a header component with the provided activity title.
 */
export const ActivityScreen: React.FC<ActivityScreenProps> = ({ activityTitle }) => {

  return (
    <>
      <Header activityTitle={activityTitle} />
      <Outlet />
    </>
  );
}

export default ActivityScreen;