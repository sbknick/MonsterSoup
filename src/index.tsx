import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// internal functions
import configureStore from './store/configure-store';

// components
import Hello from './components/Hello';
import MonsterStats from './components/MonsterStats';

const store = configureStore();

ReactDOM.render(
  (
    <div>
      <Provider store={store}>
        <Hello />
      </Provider>

      <MonsterStats monsterName="Test Monster" />
    </div>
  ),
  document.getElementById("example")
);
