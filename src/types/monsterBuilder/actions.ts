import { ActionTemplate } from "types";

export interface ActionsState
{
    appliedActionTemplateIds: number[];
    actionArgs: ActionArgsMap;
}

export interface ActionArgsMap
{
    [key: number]: ActionArgs;
}

export interface ActionArgs
{
    shortName: string;

    [key: string]: string;
}

export interface MonsterAction
{
    template: ActionTemplate;
    args: ActionArgs;
}
