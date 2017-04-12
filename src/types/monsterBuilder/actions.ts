import { ActionTemplate } from "types";

export interface ActionsState
{
    appliedActionTemplateIds: number[];
    actionArgs: ActionArgsMap;
}

export interface ActionArgsMap
{
    [key: number]: ActionArgs;
    length: number;
}

export interface ActionArgs
{
    [key: string]: ActionArg;
}

export interface ActionArg
{
    key: string;
    argType: ActionArgType;
    value: string | DamageArgs;

    inherited?: boolean;
}

export enum ActionArgType
{
    Text = 1,
    Number,
    DamageRoll,
    DamageType,
}

export interface DamageArgs
{
    diceCount: number;
    dieSize: number;
    usePrimaryStatBonus: boolean;
    miscBonus?: number;
}

export interface AttackArgs extends ActionArgs
{
    attackBonus: ActionArg;
}

export interface MonsterAction
{
    template: ActionTemplate;
    args: ActionArgs;
}
