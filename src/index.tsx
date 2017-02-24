import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// internal functions
import initStore from './initStore';

// components
import Nav from './components/Nav';
import MonsterBuilder from './components/monsterBuilder/MonsterBuilder';

const store = initStore();

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
