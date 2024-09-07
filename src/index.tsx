import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@client/App';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store';

const rootElement = document.getElementById('app');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
