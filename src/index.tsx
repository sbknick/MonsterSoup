import * as React from "react";
import * as ReactDOM from "react-dom";
// import { fromJS } from 'immutable';
// import * as Immutable from 'immutable';

// import * as Redux from 'redux';
import configureStore from './store/configure-store';

import { Provider } from 'react-redux';

import Hello from './components/Hello';

// import { HelloReducer } from './reducers/HelloReducer';
// import * as Store from './store/Store';
// import {INTITIAL_HELLO_STATE} from './reducers/HelloReducer';

// // import CounterPage from './containers/CounterContainer';
// // import {RootState} from './reducers';
// //
// // const INITIAL_STATE: RootState = fromJS({
// //   counter: {count: 0}
// // });

// export interface HelloState
// {
//   compiler: string;
//   framework: string;
//   count: number;
// }
//
// type IncrementHelloAction = {
//   type: "INCREMENT"
// }
//
// type HelloAction = IncrementHelloAction;
//
// const INITIAL_HELLO_STATE = fromJS({
//   compiler: "",
//   framework: "",
//   count: 0
// });
//
// const HelloReducer: Redux.Reducer<HelloState> = (state = INITIAL_HELLO_STATE, action: HelloAction) =>
// {
//   if (action.type === "INCREMENT")
//   {
//     // return (state as any).update('count', count => state.count + 1);
//     // // var map: Immutable.Map<string, string>;
//     // // map.update(s => s.)
//     // return (state as any).set('count', state.count + 1);
//     // return Object.assign({}, state, {count: state.count + 1});
//     return state.update('count', (count: number) => count + 1);
//   }
//
//   return state;
// };

// const INITIAL_STATE = fromJS({
//   compiler: "TypeScript",
//   framework: "React",
//   count: 0
// });

// const store = configureStore(INITIAL_STATE);
// const store = Redux.createStore(HelloReducer, Store.DEFAULT_GLOBAL_STATE);
const store = configureStore();

  // <!--<Hello compiler="TypeScript" framework="React" />-->
ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById("example")
);
