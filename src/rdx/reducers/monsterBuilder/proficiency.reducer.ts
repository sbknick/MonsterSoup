import * as Redux from "redux";

import * as Actions from "src/rdx/actions/monsterBuilder/proficiency.actions";
import * as types from "src/rdx/types/monsterBuilder/proficiency.types";


const proficiencyReducer: Redux.Reducer<{ proficiencyBonus: number }> =
(state = initialState, action: Actions.ProficiencyAction) =>
{
    const MIN_PROFICIENCY = 2;
    const MAX_PROFICIENCY = 9;

    const newState = {...state};

    switch (action.type)
    {
        case types.PROFICIENCY_MODIFY:
            newState.proficiencyBonus += action.amount;
            newState.proficiencyBonus = Math.min(MAX_PROFICIENCY, Math.max(MIN_PROFICIENCY, newState.proficiencyBonus));
            break;

        default:
            return state;
    }

    return newState;
};


export interface State
{
    proficiencyBonus: number;
}

const initialState: State = {
    proficiencyBonus: 2,
};

export default proficiencyReducer;

export const getProficiencyBonus = (state: State) =>
    state.proficiencyBonus;
