import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

// internal functions
import initStore from "./initStore";

// components
import MonsterBuilder from "src/components/monsterBuilder/MonsterBuilder";
import Nav from "src/components/Nav";

const store = initStore();

ReactDOM.render(
    (
        <Provider store={store}>
            <div>
                <Nav />
                <MonsterBuilder />
            </div>
        </Provider>
    ),
    document.getElementById("example"),
);
