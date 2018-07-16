import * as Redux from "redux";
import * as Actions from "src/rdx/actions/monsterStats/attributes.actions";
import * as types from "src/rdx/types/monsterStats/attributes.types";

import { AttributesState } from "src/types/monsterStats";
// import { AttributesState } from "src/types/monsterStats";

const attributesReducer: Redux.Reducer<AttributesState> = (state = initialState, action: Actions.AttributesAction) =>
{
    const newState = {...state};
    let newValue = 0;

    switch (action.type)
    {
        case types.ATTRIBUTE_MODIFY:
            newValue = (newState as any)[action.attr] + action.value;
            break;

        case types.ATTRIBUTE_SET:
            newValue = action.value;
            break;

        default:
            return state;
    }

    newValue = Math.max(newValue, 1);
    (newState as any)[action.attr] = newValue;

    return newState;
};

export default attributesReducer;

// export interface State
// {
//     Str: number;
//     Dex: number;
//     Con: number;
//     Int: number;
//     Wis: number;
//     Cha: number;
// }

const initialState: AttributesState = {
    Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10,
};

export function getAttributeScore(state: AttributesState, attr: string)
{
    return (state as any)[attr];
}
