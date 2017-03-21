import * as Redux from "redux";

import * as Actions from "monsterBuilder/actions/offenses.actions";
import * as types from "redux/types/monsterBuilder/offenses.types";

import { attributes } from "data";
import { OffensesState } from "monsterBuilder/types";
import * as Types from "monsterBuilder/types";

export const offensesReducer: Redux.Reducer<OffensesState> = (state = initialState, action: Actions.OffensesAction) =>
{
    switch (action.type)
    {
        default:
            return state;
    }
};

const initialState: OffensesState = {
    primaryAttackStat: attributes[0],
    primarySpellStat: attributes[3],
    attackBonus: 0,
    saveDCBonus: 0,
    actions: [],
};

export default offensesReducer;
