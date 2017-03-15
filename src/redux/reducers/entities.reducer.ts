import * as Redux from "redux";

import { Trait } from "types";

import monsterBuilderReducer, * as fromMonsterBuilder from "./monsterBuilder";
import traitsReducer, * as fromTraits from "./traits.reducer";

export interface EntitiesState
{
    monsterBuilder: fromMonsterBuilder.MonsterBuilderState;
    traits: fromTraits.TraitsState;
}

const entitiesReducer = Redux.combineReducers({
    monsterBuilder: monsterBuilderReducer,
    traits: traitsReducer,
});
export default entitiesReducer;


// -- State Selectors --//

export const getMonsterBuilderData = (state: EntitiesState) =>
    state.monsterBuilder;

export const getAllTraits = (state: EntitiesState) =>
    fromTraits.getAllTraits(state.traits);

export const getAppliedTraitIds = (state: EntitiesState) =>
    fromMonsterBuilder.getAppliedTraitIds(state.monsterBuilder);

export const getTraitArgs = (state: EntitiesState, trait: Trait) =>
    fromMonsterBuilder.getTraitArgs(state.monsterBuilder, trait);
