import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import FindArtworkScreen from './screens/FindArtworkScreen';
import CreateGameScreen from './screens/CreateGameScreen';
import Header from './components/Header';
import { GlobalStyles } from './global/global';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles/>
      <Header/>
      <Switch>
        <Route path="/play">
          <FindArtworkScreen />
        </Route>
        <Route path="/create">
          <CreateGameScreen />
        </Route>
        <Route>
          <Redirect to='/create'/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
