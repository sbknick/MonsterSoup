// import { fromJS } from 'immutable';
import * as Immutable from 'immutable';
import * as Const from './constants';


type IncrementCounterAction = {
  type: Const.INCREMENT_COUNTER,
  by: number
};
export function IncrementCounterAction(by: number): IncrementCounterAction
{
  return Immutable.fromJS(
  {
    type: Const.INCREMENT_COUNTER,
    by: by
  });
};

type DecrementCounterAction = {
  type: Const.DECREMENT_COUNTER,
  by: number
};
export function DecrementCounterAction(by: number): DecrementCounterAction
{
  return Immutable.fromJS(
  {
    type: Const.DECREMENT_COUNTER,
    by: by
  });
};

type OtherAction = { type: '' };
export function OtherAction() : OtherAction { return { type: '' } };

export type CounterAction = IncrementCounterAction | DecrementCounterAction | OtherAction;
