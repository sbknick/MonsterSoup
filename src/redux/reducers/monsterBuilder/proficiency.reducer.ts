import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/proficiency.types';
import * as Actions from '../../actions/monsterBuilder/proficiency.actions';


const proficiencyReducer: Redux.Reducer<{}> = (state = initialState, action: Actions.ProficiencyAction) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.MODIFY_PROFICIENCY:
            newState.ProficiencyBonus += action.amount;
            break;

        default:
            return state;
    }

    return newState;
};


export interface State
{
    ProficiencyBonus: number;
}

const initialState: State = {
    ProficiencyBonus: 2
};

export default proficiencyReducer;

export const getProficiencyBonus = (state: State) =>
    state.ProficiencyBonus;
