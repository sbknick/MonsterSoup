import * as Redux from 'redux';
import { HelloState } from '../reducers/HelloReducer';

// IncrementAction(x)
export const INCREMENT: "INCREMENT" = "INCREMENT";
export type IncrementAction = Redux.Action & {
  value: number
};
export function Increment(value: number) : IncrementAction
{
    return ({
      type: INCREMENT,
      value: value
    });
}

// DecremenAction()
export const DECREMENT: "DECREMENT" = "DECREMENT";
const DecrementAction: Redux.Action = {
  type: DECREMENT
};
export function Decrement(): Redux.Action
{
  return DecrementAction;
}

export type HelloAction = Redux.Action | IncrementAction;
export default HelloAction;
