import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import HomeComponent from '../Viewpoints/HomeComponent';
import AnswerViewpointsComponent from '../Viewpoints/AnswerViewpointComponent';
import ViewpointsResultsComponent from '../Viewpoints/ViewpointsResultsComponent';


const ViewpointsScreen: React.FC = () => {

  return (
    <Route
      path='/viewpoints'
      render={({ match: { url } }) => (
        <>
          <Route path={`${url}/consumer/browse`}>
            <HomeComponent />
          </Route>
          <Route path={`${url}/consumer/results`}>
            <ViewpointsResultsComponent />
          </Route>
          <Route path={`${url}/consumer/answer/:id`}>
            <AnswerViewpointsComponent />
          </Route>
          <Route>
            <Redirect to={`${url}/consumer/browse`} />
          </Route>
        </>
      )}
    >
    </Route>
  );
}

export default ViewpointsScreen;