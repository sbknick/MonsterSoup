import * as Redux from "redux";

import * as Actions from "monsterBuilder/actions/traits.actions";
import * as types from "redux/types/monsterBuilder/traits.types";

import { TraitArgs } from "monsterBuilder/types";
import { Trait } from "types";

const TraitsReducer: Redux.Reducer<State> = (state = initialState, action: Actions.TraitsAction) =>
{
    const newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.TRAIT_REMOVE:
            newState.appliedTraitIds = newState.appliedTraitIds.filter(tid => tid !== action.traitId);
            break;

        case types.TRAIT_APPLY:
            newState.appliedTraitIds.push(action.traitId);
            break;

        default:
            return state;
    }

    return newState;
};

export default TraitsReducer;

export interface State
{
    appliedTraitIds: number[];
    traitArgs: TraitArgsMap;
}

const initialState: State = {
    appliedTraitIds: [7],
    traitArgs: {},
};

interface TraitArgsMap
{
    [key: number]: TraitArgs;
};

export const getAppliedTraitIds = (state: State) =>
    state.appliedTraitIds;

export const getTraitArgs = (state: State, trait: Trait) =>
    state.traitArgs[trait.id];
