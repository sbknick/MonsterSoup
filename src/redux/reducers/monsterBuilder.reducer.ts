import * as Redux from 'redux';

const MonsterBuilderReducer: Redux.Reducer<MonsterBuilderState> = (state = initialState, action: any) =>
{
    let newState = Object.assign({}, state) as MonsterBuilderState;

    switch (action.type)
    {
        case "MODIFY_PROFICIENCY":
            newState.Proficiency += action.Value;
            break;

        default:
            return state;
    }

    return newState;
}

export default MonsterBuilderReducer;

export type MonsterBuilderState =
{
    Proficiency: number;
    Offenses: any;
    Defenses: any;
}

var initialState: MonsterBuilderState = {
    Proficiency: 2,
    Offenses: {},
    Defenses: {}
}
