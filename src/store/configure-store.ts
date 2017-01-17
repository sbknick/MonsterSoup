import * as Redux from 'redux';
import rootReducer from '../reducers/index';

function configureStore()
{
  const store = Redux.createStore(
    rootReducer
  );

//_enableHotLoader(store);
  return store;
}

export default configureStore;
