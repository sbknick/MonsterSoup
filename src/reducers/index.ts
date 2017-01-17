import * as Redux from 'redux';
import HelloReducer from '../reducers/HelloReducer';

const rootReducer = Redux.combineReducers({
  HelloReducer
});

export default rootReducer;
