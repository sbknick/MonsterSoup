import * as Redux from "redux";

import * as Actions from "rdx/actions/monsterBuilder/saves.actions";
import * as types from "rdx/types/monsterBuilder/saves.types";

import { getAttributeOrdinal } from "data/attributes";
import { SavesState, SavesStateSingle } from "types/monsterBuilder";

const savesReducer: Redux.Reducer<SavesState> = (state = initialState, action: Actions.SavesAction) =>
{
    const newState = {...state};
    const idx = getAttributeOrdinal(action.attr);
    const save = newState.saves[idx];

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
            {
                const { amount } = action as Actions.ModifySavesAction;
                save.miscBonus += amount;
            }
            break;

        default:
            return state;
    }

    return newState;
};

// export interface State
// {
//     saves: SaveState[];
// };

// export interface SaveState
// {
//     hasProficiency: boolean;
//     hasExpertise: boolean;
//     miscBonus: number;
// }

const initialSaveState = () => ({ hasProficiency: false, hasExpertise: false, miscBonus: 0 });

const initialState: SavesState = {
    saves: [
        initialSaveState(),
        initialSaveState(),
        initialSaveState(),
        initialSaveState(),
        initialSaveState(),
        initialSaveState(),
    ],
};

export default savesReducer;

export function getSaveState(state: SavesState, attr: string): SavesStateSingle
{
    const idx = getAttributeOrdinal(attr);
    return state.saves[idx];
}
