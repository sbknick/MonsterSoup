import * as Redux from 'redux';
import * as Actions from '../actions/HelloActions';

export interface HelloState
{
  compiler: string;
  framework: string;
  count: number;
}

const DEFAULT_STATE: HelloState = {
  compiler: "Muy Complicado",
  framework: "Framy Worko",
  count: -2
};

// type IncrementHelloAction = {
//   type: "INCREMENT"
// }

// type HelloAction = IncrementHelloAction;

export const HelloReducer: Redux.Reducer<HelloState> = (state: HelloState  = DEFAULT_STATE, action: Actions.HelloAction) =>
{
  switch (action.type)
  {
    case Actions.INCREMENT:
      let incr = action as Actions.IncrementAction;
      return Object.assign({}, state, {count: state.count + incr.value});

    case Actions.DECREMENT:
      return Object.assign({}, state, {count: state.count - 1});
  }


  return state;
};

export default HelloReducer;
