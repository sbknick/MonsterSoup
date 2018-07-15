import { ActionTemplate, Range } from "src/types";

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
    [key: string]: ActionArg | undefined;
}

export interface ActionArg
{
    key: string;
    argType: ActionArgType;
    value: string | DamageArgs | Range | null;

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
    recharge?: ActionArg;
}

export interface MonsterAction
{
    template: ActionTemplate;
    args: ActionArgs;
}
