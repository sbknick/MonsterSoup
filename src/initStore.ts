import * as Redux from "redux";

import rootReducer from "src/rdx/reducers";

function initStore()
{
    const store = Redux.createStore(
        rootReducer,
    );

    // _enableHotLoader(store);
    return store;
}

export default initStore;
