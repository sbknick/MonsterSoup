import * as Redux from "redux";

const descriptionReducer: Redux.Reducer<State> = (state = initialState, action: any) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case "SHORT_NAME_SET":
            newState.shortName = action.ShortName;
            break;

        case "SHORT_NAME_CLEAR":
            newState = initialState;
            break;

        default:
            return state;
    }

    return newState;
}

export default descriptionReducer;

export interface State
{
    shortName?: string;
    flavorText?: string;
}

const initialState: State = { shortName: "the creature" };
