import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './containers/App/index';
import store from './store';
import './assets/index.css';
import './assets/spacing.css';
import './assets/fontsize.css';

const NextApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
export default NextApp;
