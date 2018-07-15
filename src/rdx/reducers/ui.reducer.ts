import * as Redux from "redux";

import * as types from "src/rdx/types/ui";

export interface FieldsetState
{
    decollapsed: {[key: string]: boolean};
}

const initialState: FieldsetState = {
    // decollapsed: {"Offensive CR": true, "Actions": true},
    decollapsed: {},
};

const fieldsetReducer: Redux.Reducer<FieldsetState> = (state = initialState, action: any) =>
{
    const newState = {...state};

    switch (action.type)
    {
        case types.FIELDSET_COLLAPSE_TOGGLE:
            newState.decollapsed[action.fieldsetKey] =
                !newState.decollapsed[action.fieldsetKey];
            break;

        default:
            return state;
    }

    return newState;
};

export default Redux.combineReducers({
    fieldset: fieldsetReducer,
});

export interface UIState
{
    fieldset: FieldsetState;
}
