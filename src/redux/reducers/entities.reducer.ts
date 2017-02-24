import * as Redux from 'redux';
// import Types from '../types';

import monsterBuilderReducer, * as fromMonsterBuilder from './monsterBuilder';
import TraitsReducer, * as fromTraits from './traits.reducer';

export type EntitiesState =
{
    monsterBuilder: fromMonsterBuilder.MonsterBuilderState,
    traits: fromTraits.TraitsState
}

var entitiesReducer = Redux.combineReducers({
    monsterBuilder: monsterBuilderReducer,
    traits: TraitsReducer
});
export default entitiesReducer;


//-- State Selectors --//

export const getMonsterBuilderData = (state: EntitiesState) =>
    state.monsterBuilder;

export const getAllTraits = (state: EntitiesState) =>
    fromTraits.getAllTraits(state.traits);

export const getAppliedTraitIds = (state: EntitiesState) =>
    fromMonsterBuilder.getAppliedTraitIds(state.monsterBuilder);
