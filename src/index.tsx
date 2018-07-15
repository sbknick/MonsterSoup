import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

// internal functions
import initStore from "./initStore";

// components
import MonsterStats from "src/components/monsterBuilder/MonsterStats";
import Nav from "src/components/Nav";

const store = initStore();

ReactDOM.render(
    (
        <Provider store={store}>
            <div>
                <Nav />
                <MonsterStats />
            </div>
        </Provider>
    ),
    document.getElementById("example"),
);
