import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { setupStore } from './app/store';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      {/* Github pages does not support BrowserRouter so we must use HashRouter instead.
      https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing */}
      <HashRouter>
        <App data-testid='app' />
      </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
);
