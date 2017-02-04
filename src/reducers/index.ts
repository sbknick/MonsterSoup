import * as Redux from 'redux';
import monsterBuilderReducer, { MonsterBuilderState } from './monster-builder';

export const rootReducer = Redux.combineReducers({
  monsterBuilder: monsterBuilderReducer
});

export interface GlobalState
{
  monsterBuilder: MonsterBuilderState;
}

export default rootReducer;
