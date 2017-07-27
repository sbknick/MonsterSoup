import * as Redux from "redux";

import defaultTraits from "data/traits";
import { NormalisedData } from "rdx/reducers";
import { TraitTemplate } from "types";

const traitsReducer: Redux.Reducer<TraitsState> =
(state = initialState, action: {type: string, traits: TraitTemplate[]}) =>
{
    if (state.allIds.length === 0)
    {
        state = normalise(defaultTraits);
    }

    let newState = {...state};

    switch (action.type)
    {
        case "TRAITS_FETCH_SUCCESS":
            newState = normalise(action.traits);
            break;

        default:
            return state;
    }

    return newState;
};

export default traitsReducer;

export type TraitsState = NormalisedData<TraitTemplate>;

const initialState: TraitsState = { byId: {}, allIds: [] };

function normalise(items: TraitTemplate[]): NormalisedData<TraitTemplate>
{
    const results: NormalisedData<TraitTemplate> = { byId: {}, allIds: [] };

    return items.reduce((acc, tr) => {
        const id = tr.id;
        acc.byId[id] = tr;
        acc.allIds.push(id);
        return acc;
    }, results);
}

export function getAllTraits(state: TraitsState): TraitTemplate[]
{
    return state.allIds.map(id => state.byId[id]);
}
