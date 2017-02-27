import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/proficiency.types';
import * as Actions from '../../actions/monsterBuilder/proficiency.actions';


const proficiencyReducer: Redux.Reducer<{}> = (state = initialState, action: Actions.ProficiencyAction) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.PROFICIENCY_MODIFY:
            newState.proficiencyBonus += action.amount;
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
    proficiencyBonus: 2
};

export default proficiencyReducer;

export const getProficiencyBonus = (state: State) =>
    state.proficiencyBonus;
