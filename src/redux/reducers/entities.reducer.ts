import * as Redux from 'redux';
// import Types from '../types';

import MonsterBuilderReducer, { MonsterBuilderState } from './monsterBuilder.reducer';
import TraitsReducer, * as fromTraits from './traits.reducer';

export type EntitiesState =
{
    monsterBuilder: MonsterBuilderState,
    traits: fromTraits.TraitsState
}

var entitiesReducer = Redux.combineReducers({
    monsterBuilder: MonsterBuilderReducer,
    traits: TraitsReducer
});
export default entitiesReducer;


//-- State Selectors --//

export const getMonsterBuilderData = (state: EntitiesState) =>
    state.monsterBuilder;

export const getAllTraits = (state: EntitiesState) =>
    fromTraits.getAllTraits(state.traits);
