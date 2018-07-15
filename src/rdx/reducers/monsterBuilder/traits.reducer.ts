import * as Redux from "redux";

import * as Actions from "src/rdx/actions/monsterBuilder/traits.actions";
import * as types from "src/rdx/types/monsterBuilder/traits.types";

import { TraitTemplate } from "src/types";
import { TraitsState } from "src/types/monsterBuilder";

const traitsReducer: Redux.Reducer<TraitsState> = (state = initialState, action: Actions.TraitsAction) =>
{
    const newState = {...state};

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

export default traitsReducer;

const initialState: TraitsState = {
    appliedTraitIds: [7],
    traitArgs: {},
};

export const getAppliedTraitIds = (state: TraitsState) =>
    state.appliedTraitIds;

export const getTraitArgs = (state: TraitsState, trait: TraitTemplate) =>
    state.traitArgs[trait.id];
