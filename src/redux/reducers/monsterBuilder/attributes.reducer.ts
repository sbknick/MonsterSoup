import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/attributes.types';
import * as Actions from '../../actions/monsterBuilder/attributes.actions';

const AttributesReducer: Redux.Reducer<State> = (state: State = initialState, action: Actions.AttributesAction) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.MODIFY_ATTRIBUTE:
            (newState as any)[action.attr] += action.value;
            break;

        case types.SET_ATTRIBUTE:
            (newState as any)[action.attr] = action.value;
            break;

        default:
            return state;
    }

    return newState;
}

export default AttributesReducer;

export interface State
{
    Str: number;
    Dex: number;
    Con: number;
    Int: number;
    Wis: number;
    Cha: number;
}

const initialState: State = {
    Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10
};
