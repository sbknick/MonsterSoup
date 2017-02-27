import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/traits.types';
import * as Actions from '../../actions/monsterBuilder/traits.actions';

import { Trait } from '../traits.reducer';

const TraitsReducer: Redux.Reducer<State> = (state = initialState, action: Actions.TraitsAction) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.TRAIT_REMOVE:
            newState.appliedTraitIds = newState.appliedTraitIds.filter(tid => tid != action.traitId);
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
    traitArgs: {}
};

type TraitArgsMap = {[key: number] : TraitArgs};

export interface TraitArgs
{
    damageString?: string;
    damageType?: string;
    weapon?: string;
}

export const getAppliedTraitIds = (state: State) =>
    state.appliedTraitIds;

export const getTraitArgs = (state: State, trait: Trait) =>
    state.traitArgs[trait.id];
