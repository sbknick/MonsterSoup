import * as Redux from 'redux';

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

type IncrementHelloAction = {
  type: "INCREMENT"
}

type HelloAction = IncrementHelloAction;

const HelloReducer: Redux.Reducer<HelloState> = (state: HelloState = DEFAULT_STATE, action: HelloAction) =>
{
  if (action.type === "INCREMENT")
  {
    return Object.assign({}, state, {count: state.count + 1});
  }

  return state;
};

export default HelloReducer;
