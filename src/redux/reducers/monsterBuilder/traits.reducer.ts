import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/traits.types';
import * as Actions from '../../actions/monsterBuilder/traits.actions';

import { Trait } from '../traits.reducer';

const TraitsReducer: Redux.Reducer<State> = (state = initialState, action: Actions.TraitsAction) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.REMOVE_TRAIT:
            newState.AppliedTraitIds = newState.AppliedTraitIds.filter(tid => tid != action.traitId);
            break;

        case types.APPLY_TRAIT:
            newState.AppliedTraitIds.push(action.traitId);
            break;

        default:
            return state;
    }

    return newState;
};

export default TraitsReducer;

export interface State
{
    AppliedTraitIds: number[];
    TraitArgs: TraitArgsMap;
}

const initialState: State = {
    AppliedTraitIds: [7],
    TraitArgs: {}
};

type TraitArgsMap = {[key: number] : TraitArgs};

export interface TraitArgs
{
    damageString?: string;
    damageType?: string;
    weapon?: string;
}

export const getAppliedTraitIds = (state: State) =>
    state.AppliedTraitIds;

export const getTraitArgs = (state: State, trait: Trait) =>
    state.TraitArgs[trait.Id];
