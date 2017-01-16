
// import { ReducersMapObject } from 'redux';
// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/constants';
import * as Const from '../actions/constants';
import { List, fromJS } from 'immutable';
import { Store, Reducer, Action } from 'redux';
import * as Redux from 'redux';

import { CounterAction } from '../actions/counter-actions';

/// Actions

// type IncrementCounterAction = {
//   type: Const.INCREMENT_COUNTER,
//   by: number
// };
// export function IncrementCounterAction(by: number): IncrementCounterAction
// {
//   return fromJS(
//   {
//     type: Const.INCREMENT_COUNTER,
//     by: by
//   });
// };
//
// type DecrementCounterAction = {
//   type: Const.DECREMENT_COUNTER,
//   by: number
// };
// export function DecrementCounterAction(by: number): DecrementCounterAction
// {
//   return fromJS(
//   {
//     type: Const.DECREMENT_COUNTER,
//     by: by
//   });
// };
//
// export type OtherAction = { type: '' };
// export const OtherAction : OtherAction = { type: '' };
//
// type CounterAction = IncrementCounterAction | DecrementCounterAction | OtherAction;

export interface CounterState
{
  readonly count: number;
  update(state: any):any;
}

const INITIAL_STATE: CounterState = fromJS({
  count: 0
});

/// Reducer

export function CounterReducer(state: CounterState = INITIAL_STATE, action: CounterAction)
{
  switch(action.type)
  {
    case Const.INCREMENT_COUNTER:
      return state.update({count: state.count + action.by});

    case Const.DECREMENT_COUNTER:
      return state.update({count: state.count - action.by});

    default:
      return state;
  }
}
