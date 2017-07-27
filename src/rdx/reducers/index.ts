import * as Redux from "redux";

import { ActionTemplate, TraitTemplate } from "types";

import entitiesReducer, * as fromEntities from "./entities.reducer";
import uiReducer, * as fromUI from "./ui.reducer";

const rootReducer = Redux.combineReducers({
    entities: entitiesReducer,
    ui: uiReducer,
});

export interface GlobalState
{
    entities: fromEntities.EntitiesState;
    ui: fromUI.UIState;
}

export default rootReducer;

export interface NormalisedData<T>
{
    byId: {[key: number]: T};
    allIds: number[];
}

type IdAccessor<T> = (e: T) => number;

export function normalise<T>(items: T[], idAccessor: IdAccessor<T>): NormalisedData<T>
{
    const results: NormalisedData<T> = { byId: {}, allIds: [] };

    return items.reduce((acc, tr) => {
        const id = idAccessor(tr);
        acc.byId[id] = tr;
        acc.allIds.push(id);
        return acc;
    }, results);
}

export const getAllTraits = (state: GlobalState) =>
    fromEntities.getAllTraits(state.entities);

export const getAppliedTraitIds = (state: GlobalState) =>
    fromEntities.getAppliedTraitIds(state.entities);

export const getMonsterBuilderData = (state: GlobalState) =>
    fromEntities.getMonsterBuilderData(state.entities);

export const getTraitsForMonster = (state: GlobalState) =>
{
    const traits = getAllTraits(state);
    const appliedTraits = getAppliedTraitIds(state);

    return traits.filter(t => appliedTraits.indexOf(t.id) !== -1);
};

export const getTraitArgs = (state: GlobalState, trait: TraitTemplate) =>
    fromEntities.getTraitArgs(state.entities, trait);

export const getAllActions = (state: GlobalState) =>
    fromEntities.getAllActions(state.entities);

export const getAppliedActionIds = (state: GlobalState) =>
    fromEntities.getAppliedActionIds(state.entities);

export const getActionsForMonster = (state: GlobalState) =>
{
    const actions = getAllActions(state);
    const appliedActions = getAppliedActionIds(state);

    return actions.filter(a => appliedActions.indexOf(a.id) !== -1);
};

export const getActionArgs = (state: GlobalState, action: ActionTemplate) =>
    fromEntities.getActionArgs(state.entities, action);
