import * as Redux from "redux";

import { ActionTemplate, TraitTemplate } from "src/types";

import actionsReducer, * as fromActions from "./actions.reducer";
import monsterBuilderReducer, * as fromMonsterBuilder from "./monsterBuilder";
import traitsReducer, * as fromTraits from "./traits.reducer";

export interface EntitiesState
{
    actions: fromActions.ActionsState;
    monsterBuilder: fromMonsterBuilder.MonsterBuilderState;
    traits: fromTraits.TraitsState;
}

const entitiesReducer = Redux.combineReducers({
    actions: actionsReducer,
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

export const getTraitArgs = (state: EntitiesState, trait: TraitTemplate) =>
    fromMonsterBuilder.getTraitArgs(state.monsterBuilder, trait);

export const getAllActions = (state: EntitiesState) =>
    fromActions.getAllActions(state.actions);

export const getAppliedActionIds = (state: EntitiesState) =>
    fromMonsterBuilder.getAppliedActionIds(state.monsterBuilder);

export const getActionArgs = (state: EntitiesState, action: ActionTemplate) =>
    fromMonsterBuilder.getActionArgs(state.monsterBuilder, action);
