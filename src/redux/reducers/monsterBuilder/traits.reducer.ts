import * as Redux from "redux";

import * as Actions from "monsterBuilder/actions/traits.actions";
import * as types from "redux/types/monsterBuilder/traits.types";

import { TraitArgs, TraitsState } from "monsterBuilder/types";
import { Trait } from "types";

const TraitsReducer: Redux.Reducer<TraitsState> = (state = initialState, action: Actions.TraitsAction) =>
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

const initialState: TraitsState = {
    appliedTraitIds: [7],
    traitArgs: {},
};

export const getAppliedTraitIds = (state: TraitsState) =>
    state.appliedTraitIds;

export const getTraitArgs = (state: TraitsState, trait: Trait) =>
    state.traitArgs[trait.id];
