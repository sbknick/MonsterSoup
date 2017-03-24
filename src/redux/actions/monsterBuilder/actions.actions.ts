import * as Redux from "redux";

import * as types from "redux/types/monsterBuilder/actions.types";

import { ActionArgs } from "monsterBuilder/types";

interface ActionsActionPayload
{
    actionTemplateId: number;
}

export const applyAction: Redux.ActionCreator<ActionsActionPayload> =
    (actionTemplateId: number) => ({ type: types.ACTION_APPLY, actionTemplateId });

export const removeAction: Redux.ActionCreator<ActionsActionPayload> =
    (actionTemplateId: number) => ({ type: types.ACTION_REMOVE, actionTemplateId });

interface ActionsArgActionPayload extends ActionsActionPayload
{
    args: ActionArgs;
}

export const setActionArg: Redux.ActionCreator<ActionsArgActionPayload> =
    (actionTemplateId: number, args: ActionArgs) => ({ type: types.ACTION_ARGS_SET, actionTemplateId, args });

export type ActionApplyRemoveAction = Redux.Action & ActionsActionPayload;
export type SetActionArgAction = Redux.Action & ActionsArgActionPayload;

export type ActionsAction = ActionApplyRemoveAction
                          | SetActionArgAction;
