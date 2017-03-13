import * as Redux from "redux";

import defaultTraits from "data/traits";
import { NormalisedData } from "redux/reducers";
import { Trait } from "types";

const traitsReducer: Redux.Reducer<TraitsState> = (state = initialState, action: any) =>
{
    if (state.allIds.length === 0)
    {
        state = normalise(defaultTraits);
    }

    let newState = Object.assign({}, state);

    switch (action.type)
    {
        case "FETCH_TRAITS_SUCCESS":
            newState = normalise(action.Traits);
            break;

        default:
            return state;
    }

    return newState;
};
export default traitsReducer;

export type TraitsState = NormalisedData<Trait>;

const initialState: TraitsState = { byId: {}, allIds: [] };

function normalise(items: Trait[]): NormalisedData<Trait>
{
    const results: NormalisedData<Trait> = { byId: {}, allIds: [] };

    return items.reduce((acc, tr) => {
        const id = tr.id;
        acc.byId[id] = tr;
        acc.allIds.push(id);
        return acc;
    }, results);
};

export function getAllTraits(state: TraitsState): Trait[]
{
    return state.allIds.map(id => state.byId[id]);
}
