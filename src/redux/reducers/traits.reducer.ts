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
    id: number;
    name: string;
    desc: string;
    miscText?: string;
    miscTextApplyType?: MiscTextApplyType;

    effectiveACModifier?: number;
    effectiveHPMultiplier?: number;
    effectiveABModifier?: number;
    effectiveDCModifier?: number;

    effectiveDPRModifier?: number;
    effectiveDPRMultiplier?: number;
    effectiveDPRModifierString?: string;

    requires?: any;
    special?: SpecialTraitType;
    notReady?: boolean;
}

interface TraitArgs
{
    shortName: string;

    damage?: string;
    damageType?: string;
    weapon?: string;
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
        let id = tr.id;
        acc.byId[id] = tr;
        acc.allIds.push(id);
        return acc;
    }, results);
};

export function getAllTraits(state: TraitsState): Trait[]
{
    return state.allIds.map(id => state.byId[id]);
}
