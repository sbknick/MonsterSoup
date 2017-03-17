
export interface OffensesState
{
    primaryAttackStat: string;
    primarySpellStat: string;
    attackBonus: number;
    saveDCBonus: number;
    multiattack?: Multiattack;
    attacks: Attack[];
}

export interface Attack extends Action
{
    reach?: number;
    rangeAccurate?: number;
    rangeMax?: number;
    damageDiceCount?: number;
    damageDieSize?: number;
    damageBonus?: number;
    damageType?: string;
}

export interface Action
{
    name: string;
    description: string;
}

export interface Multiattack
{
    [idx: number]: MultiattackItem;
}

interface MultiattackItem
{
    attackName: string;
    count: number;
}
