import * as Redux from "redux";

import * as types from "src/rdx/types/monsterStats/actions.types";

import { ActionArgType, DamageArgs } from "src/types/monsterStats";

interface ActionsActionPayload
{
    actionTemplateId: number;
}

export const applyAction: Redux.ActionCreator<ActionsActionPayload> =
    (actionTemplateId: number) => ({ type: types.ACTION_APPLY, actionTemplateId });

export const removeAction: Redux.ActionCreator<ActionsActionPayload> =
    (actionTemplateId: number) => ({ type: types.ACTION_REMOVE, actionTemplateId });


// interface ActionsArgActionPayload extends ActionsActionPayload
// {
//     args: ActionArgs;
// }
//
// export const setActionArgs: Redux.ActionCreator<ActionsArgActionPayload> =
//     (actionTemplateId: number, args: ActionArgs) => ({ type: types.ACTION_ARGS_SET, actionTemplateId, args });


interface ActionsArgActionPayload extends ActionsActionPayload
{
    arg: string;
    argType: ActionArgType;
    value: string | DamageArgs;
}

export const setActionArg: Redux.ActionCreator<ActionsArgActionPayload> =
    (actionTemplateId: number, arg: string, argType: ActionArgType, value: string) =>
        ({ type: types.ACTION_ARG_SET, actionTemplateId, arg, argType, value });


interface ActionsArgTypeActionPayload extends ActionsActionPayload
{
    arg: string;
    argType: ActionArgType;
}

export const setActionArgType: Redux.ActionCreator<ActionsArgTypeActionPayload> =
    (actionTemplateId: number, arg: string, argType: ActionArgType) =>
        ({ type: types.ACTION_ARG_TYPE_SET, actionTemplateId, arg, argType });


export type ActionApplyRemoveAction = Redux.Action & ActionsActionPayload;
export type SetActionArgAction = Redux.Action & ActionsArgActionPayload;
export type SetActionArgTypeAction = Redux.Action & ActionsArgTypeActionPayload;

export type ActionsAction = ActionApplyRemoveAction
                          | SetActionArgAction;
