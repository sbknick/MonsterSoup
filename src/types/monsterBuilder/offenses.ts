import { Action } from "./monsterActions";

export interface OffensesState
{
    primaryAttackStat: string;
    primarySpellStat: string;
    attackBonus: number;
    saveDCBonus: number;
    multiattack?: Multiattack;
    attacks: Action[];
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
