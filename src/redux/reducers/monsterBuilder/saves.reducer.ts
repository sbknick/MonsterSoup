import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/saves.types';
import * as Actions from '../../actions/monsterBuilder/saves.actions';

import { State as Attributes } from './attributes.reducer';
import { getAttributeOrdinal } from '../../../data/attributes';

const savesReducer: Redux.Reducer<State> = (state = initialState, action: Actions.SavesAction) =>
{
    var newState = Object.assign({}, state);
    var idx = getAttributeOrdinal(action.attr);
    var save = newState.saves[idx];

    switch (action.type)
    {
        // case types.SAVE_PROFICIENCY_ADD:
        //     save.hasProficiency = true;
        //     break;
        //
        // case types.SAVE_PROFICIENCY_REMOVE:
        //     save.hasProficiency = false;
        //     break;
        //
        // case types.SAVE_EXPERTISE_ADD:
        //     save.hasExpertise = true;
        //     break;
        //
        // case types.SAVE_EXPERTISE_REMOVE:
        //     save.hasExpertise = false;
        //     break;

        case types.SAVE_PROFICIENCY_TOGGLE:
            save.hasProficiency = !save.hasProficiency;
            if (!save.hasProficiency)
                save.hasExpertise = false;
            break;

        case types.SAVE_EXPERTISE_TOGGLE:
            if (save.hasProficiency)
                save.hasExpertise = !save.hasExpertise;
            break;

        case types.SAVE_BONUS_MODIFY:
            let act = <Actions.ModifySavesAction>action;
            save.miscBonus += act.amount;
            break;

        default:
            return state;
    }

    return newState;
}

export interface State
{
    saves: SaveState[];
};

export interface SaveState
{
    hasProficiency: boolean;
    hasExpertise: boolean;
    miscBonus: number;
}

const initialSaveState = () => ({ hasProficiency: false, hasExpertise: false, miscBonus: 0 });

const initialState: State = {
    saves: [ initialSaveState(), initialSaveState(), initialSaveState(), initialSaveState(), initialSaveState(), initialSaveState() ],
}

export default savesReducer;

export function getSaveState(state: State, attr: string) : SaveState
{
    var idx = getAttributeOrdinal(attr);
    return state.saves[idx];
}
