import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// internal functions
import configureStore from './store/configure-store';

// components
import Nav from './components/Nav';
import MonsterBuilder from './components/monster-builder/MonsterBuilder';

const store = configureStore();

ReactDOM.render(
    (
        <Provider store={store}>
            <div>
                <Nav />
                <MonsterBuilder monsterName="Test Monster" />
            </div>
        </Provider>
    ),
    document.getElementById("example")
);
