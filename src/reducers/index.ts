// import { combineReducers } from 'redux';
// import { CounterReducer, CounterState } from './reducers';
// import * as Redux from 'redux';
//
// // const rootReducer = combineReducers({
// //   CounterReducer
// // });
//
// export interface RootState {
//   counterState: CounterState;
// };
//
//
// export const rootReducer = Redux.combineReducers<RootState>({
//   ['counterReducer']: CounterReducer
// });
//
// // export default rootReducer;

import * as Redux from 'redux';
import HelloReducer from '../reducers/HelloReducer';

const rootReducer = Redux.combineReducers({
  HelloReducer
});

export default rootReducer;
