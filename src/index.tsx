import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./i18n";
import { initializeServices } from "./services";
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

  /**
   * https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
   * Actualización de cómo renderizar el nodo inicial tras el cambio de React 17 a React 18.
   */
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

startApp();
