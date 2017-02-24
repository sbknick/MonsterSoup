import * as Redux from 'redux';

import entitiesReducer, * as fromEntities from './entities.reducer';
import uiReducer, * as fromUI from './ui.reducer';

const rootReducer = Redux.combineReducers({
    entities: entitiesReducer,
    ui: uiReducer
});

export type GlobalState = {
    entities: fromEntities.EntitiesState,
    ui: fromUI.UIState
};

export default rootReducer;

export type NormalisedData<T> =
{
    byId: {[key: number]: T},
    allIds: number[]
};

type IdAccessor<T> = (e: T) => number;

export function normalise<T>(items: T[], idAccessor: IdAccessor<T>) : NormalisedData<T>
{
    var results: NormalisedData<T> = { byId: {}, allIds: [] };

    return items.reduce((acc, tr) => {
        let id = idAccessor(tr);
        acc.byId[id] = tr;
        acc.allIds.push(id);
        return acc;
    }, results);
};

export const getAllTraits = (state: GlobalState) =>
    fromEntities.getAllTraits(state.entities);

export const getAppliedTraitIds = (state: GlobalState) =>
    fromEntities.getAppliedTraitIds(state.entities);
