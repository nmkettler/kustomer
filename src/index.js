import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import "reset-css";
import 'normalize.css';

import store from './store';
import App from './App';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<Root />, document.getElementById('root'));
