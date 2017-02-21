import * as Redux from 'redux';
import monsterBuilderReducer, { MonsterBuilderState } from './monster-builder';
import otherRootReducer, { GlobalState as GState }  from '../redux/reducers'

export const rootReducer = Redux.combineReducers({
  monsterBuilder: monsterBuilderReducer,
  otherRootReducer: otherRootReducer
});

export interface GlobalState
{
  monsterBuilder: MonsterBuilderState;
  otherRootReducer: GState;
}

export default rootReducer;
