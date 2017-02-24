import * as Redux from 'redux';
import { NormalisedData } from '../reducers';
import defaultTraits from '../../data/traits';

const TraitsReducer: Redux.Reducer<TraitsState> = (state = initialState, action: any) =>
{
    if (state.allIds.length == 0)
    {
        state = normalise(defaultTraits);
    }

    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case "FETCH_TRAITS_SUCCESS":
            newState = normalise(action.Traits);
            break;

        default:
            return state;
    }

    return newState;
};
export default TraitsReducer;

export type TraitsState = NormalisedData<Trait>;

var initialState: TraitsState = { byId: {}, allIds: [] };

export class Trait
{
    Id: number;
    Name: string;
    Desc: string;
    MiscText?: string;
    MiscTextApplyType?: MiscTextApplyType;

    EffectiveACModifier?: number;
    EffectiveHPMultiplier?: number;
    EffectiveABModifier?: number;
    EffectiveDCModifier?: number;

    EffectiveDPRModifier?: number;
    EffectiveDPRMultiplier?: number;
    EffectiveDPRModifierString?: string;

    Requires?: any;
    Special?: SpecialTraitType;
    NotReady?: boolean;
}

interface TraitArgs
{
    ShortName: string;

    Damage?: string;
    DamageType?: string;
    Weapon?: string;
}

export enum MiscTextApplyType
{
    ToDamageText = 1,
}

export enum SpecialTraitType
{
    Brute = 1,
}

function normalise(items: Trait[]) : NormalisedData<Trait>
{
    var results: NormalisedData<Trait> = { byId: {}, allIds: [] };

    return items.reduce((acc, tr) => {
        let id = tr.Id;
        acc.byId[id] = tr;
        acc.allIds.push(id);
        return acc;
    }, results);
};

export function getAllTraits(state: TraitsState): Trait[]
{
    return state.allIds.map(id => state.byId[id]);
}
