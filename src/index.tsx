import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { setupStore } from './app/store';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App data-testid='app' />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
