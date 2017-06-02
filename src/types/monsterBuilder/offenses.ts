import { MonsterAction } from "./actions";

export interface OffensesState
{
    primaryAttackStat: string;
    primarySpellStat: string;
    miscAttackBonus: number;
    miscSaveDCBonus: number;
    multiattack?: Multiattack;
    // actions: MonsterAction[];
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
