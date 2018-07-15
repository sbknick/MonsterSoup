import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

// internal functions
import initStore from "./initStore";

// components
import MonsterBuilder from "src/components/monsterBuilder/MonsterBuilder";

const store = initStore();

ReactDOM.render(
    (
        <Provider store={store}>
            <MonsterBuilder />
        </Provider>
    ),
    document.getElementById("example"),
);
