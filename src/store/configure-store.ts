import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';

// import { RootState } from '../reducers.index';

import { RootState, rootReducer } from '../reducers/index';

function configureStore(initialState: RootState)
{
  const store = createStore<RootState>(
    rootReducer,
    initialState
  );

//_enableHotLoader(store);
  return store;
}

export default configureStore;
