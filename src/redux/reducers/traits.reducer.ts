import * as Redux from 'redux';
import { NormalisedData, normalise } from '.';

const TraitsReducer: Redux.Reducer<TraitsState> = (state = initialState, action: any) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case "FETCH_TRAITS_SUCCESS":
        newState = normalise<Trait>(action.Traits, tr => tr.Id);
            break;

        default:
            return state;
    }

    return newState;
};
export default TraitsReducer;

export type TraitsState = NormalisedData<Trait>;

var initialState: TraitsState = { byId: {}, allIds: [] }

export interface Trait
{
    Id: number;
    Name: string;
    Desc: string;
    EffectiveACModifier?: number;
    EffectiveHPMultiplier?: number;
    EffectiveABModifier?: number;
    EffectiveDCModifier?: number;
    EffectiveDPRModifier?: number;
    EffectiveDPRMultiplier?: number;
}

export function getAllTraits(state: TraitsState): Trait[]
{
    return state.allIds.map(id => state.byId[id]);
}
