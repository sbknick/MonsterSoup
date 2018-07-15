import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// internal functions
import initStore from "./initStore";

// components
import MonsterBuilder from "src/components/monsterBuilder/MonsterBuilder";

const store = initStore();

ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <MonsterBuilder />
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById("example"),
);
