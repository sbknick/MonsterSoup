import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/attributes.types';
import * as Actions from '../../actions/monsterBuilder/attributes.actions';

const attributesReducer: Redux.Reducer<State> = (state: State = initialState, action: Actions.AttributesAction) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.ATTRIBUTE_MODIFY:
            (newState as any)[action.attr] += action.value;
            break;

        case types.ATTRIBUTE_SET:
            (newState as any)[action.attr] = action.value;
            break;

        default:
            return state;
    }

    return newState;
}

export default attributesReducer;

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
