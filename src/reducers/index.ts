import * as Redux from 'redux';
import { HelloReducer, HelloState } from '../reducers/HelloReducer';


export const rootReducer = Redux.combineReducers({
  HelloReducer
});

export interface HelloReducerState
{
  HelloReducer: HelloState;
}

export default rootReducer;
