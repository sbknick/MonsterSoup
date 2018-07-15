import * as Redux from "redux";

import * as Actions from "src/rdx/actions/monsterBuilder/offenses.actions";
import * as types from "src/rdx/types/monsterBuilder/offenses.types";

import { attributes } from "src/data";
import { OffensesState } from "src/types/monsterBuilder";
// import * as Types from "src/types/monsterBuilder";

export const offensesReducer: Redux.Reducer<OffensesState> = (state = initialState, action: Actions.OffensesAction) =>
{
    const newState = {...state};

    switch (action.type)
    {
        case types.PRIMARY_ATTACK_STAT_SET:
            {
                const { attr } = action as Actions.SetStatAction;
                newState.primaryAttackStat = attr;
            }
            break;

        case types.PRIMARY_SPELL_STAT_SET:
            {
                const { attr } = action as Actions.SetStatAction;
                newState.primarySpellStat = attr;
            }
            break;

        case types.MISC_ATTACK_BONUS_SET:
            {
                const { value } = action as Actions.SetValueAction;
                newState.miscAttackBonus = value;
            }
            break;

        case types.MISC_SAVE_DC_BONUS_SET:
            {
                const { value } = action as Actions.SetValueAction;
                newState.miscSaveDCBonus = value;
            }
            break;

        default:
            return state;
    }

    return newState;
};

const initialState: OffensesState = {
    primaryAttackStat: attributes[0],
    primarySpellStat: attributes[3],
    miscAttackBonus: 0,
    miscSaveDCBonus: 0,
};

export default offensesReducer;
