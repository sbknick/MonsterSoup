// import * as Immutable from 'immutable';
import * as Redux from 'redux';
// import { Reducer } from 'redux';
import * as Store from '../store/Store';

// interface HelloState
// {
//   compiler: string;
//   framework: string;
//   count: number;
// }

type IncrementHelloAction = {
  type: "INCREMENT"
}

type HelloAction = IncrementHelloAction;

// type HelloStateMap = HelloState | Immutable.Map;

// export const INITIAL_HELLO_STATE = Immutable.fromJS({
//   compiler: "POOP",
//   framework: "",
//   count: 0
// });

// Store.DEFAULT_HELLO_STATE

const HelloReducer: Redux.Reducer<Store.GlobalState> = (state: Store.GlobalState = Store.DEFAULT_GLOBAL_STATE, action: HelloAction) =>
{
  if (state == null)
  return state;

  let helloState = state.helloState;
  if (action.type === "INCREMENT")
  {
    return Object.assign({}, state, {helloState: <Store.HelloState>{
      compiler: helloState.compiler,
      framework: helloState.framework,
      count: helloState.count + 1
    }});
    // return state.update('helloState', (hello: HelloState) =>
    // ({
    //   compiler: hello.compiler,
    //   framework: hello.framework,
    //   count: hello.count + 1
    // }));
  }

  return state;
};

export default HelloReducer;
