import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './i18n';
import { initializeServices } from './services';
import { initTracker } from './services/initTrackers';
import { trackPageView, trackSelfDescribingEvent } from '@snowplow/browser-tracker';
import axios from 'axios';
// import { initMockAdapter } from './services/mockAdapter';

/*
if (process.env.NODE_ENV === 'development') {
  initMockAdapter();
}
*/

/**
 * Initializes React Application by starting up its services and rendering
 * the main single-page application component into a root node in the DOM.
 * 
 * @remarks Exporting this method is not strictly necessary, but it is convenient
 * to provide typedoc with an entrypoint to generate our project's documentation.
 * From here, everything that is referenced will be (recursively) added to our project's
 * docs.
 * 
 * @author Pablo Gutiérrez, 2021
 */
export const startApp = () => {
  initializeServices();

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

// initializes application. 
startApp();

initTracker('tracker', 'http://localhost:8000', 'prado-demo');
trackPageView();
console.log('tracking page view');

trackSelfDescribingEvent({
  event: {
    schema: 'iglu:com.acme_company/viewed_product/jsonschema/1-0-0',
    data: {
        productId: 'ASO01043',
        category: 'Dresses',
        brand: 'ACME',
        returning: true,
        price: 49.95,
        sizes: ['xs', 's', 'l', 'xl', 'xxl'],
        availableSince: new Date(2013,3,7)
    }
  }
});