import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// internal functions
import configureStore from './store/configure-store';

// components
import Hello from './components/Hello';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById("example")
);
