import * as Redux from 'redux';
import monsterBuilderReducer, { MonsterBuilderState } from './monster-builder';
import otherRootReducer, { GlobalState as GState, getAllTraits as superGetAllTraits, getAppliedTraitIds as superGetAppliedTraitIds }  from '../redux/reducers'

export const rootReducer = Redux.combineReducers({
  monsterBuilder: monsterBuilderReducer,
  otherRootReducer: otherRootReducer
});

export interface GlobalState
{
  monsterBuilder: MonsterBuilderState;
  otherRootReducer: GState;
}


export const getAllTraits = (state: GlobalState) =>
    superGetAllTraits(state.otherRootReducer);

export default rootReducer;

export const getAppliedTraitIds = (state: GlobalState) =>
    superGetAppliedTraitIds(state.otherRootReducer);
