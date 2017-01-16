// import { createStore, compose } from 'redux';
import * as Redux from 'redux';
// import { fromJS } from 'immutable';

import * as Store from '../store/Store';

// import { RootState } from '../reducers.index';

import rootReducer from '../reducers/index';
import HelloReducer from '../reducers/HelloReducer';

function configureStore()
{
  const store = Redux.createStore(
    HelloReducer,
    Store.DEFAULT_GLOBAL_STATE
  );

//_enableHotLoader(store);
  return store;
}

export default configureStore;
