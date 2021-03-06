import { TraitTemplate } from "src/types";

export interface TraitsState
{
    appliedTraitIds: number[];
    traitArgs: TraitArgsMap;
}

interface TraitArgsMap
{
    [key: number]: TraitArgs;
}

export interface TraitArgs
{
    shortName: string;

    damageString?: string;
    damageType?: string;
    weapon?: string;
}

export interface MonsterTrait
{
    trait: TraitTemplate;
    traitArgs: TraitArgs;
}
