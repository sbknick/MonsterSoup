import * as Redux from "redux";

import * as Actions from "monsterBuilder/actions/actions.actions";
import * as types from "redux/types/monsterBuilder/actions.types";

import { ActionArgs, ActionArgsMap, ActionArgType, ActionsState, AttackArgs } from "monsterBuilder/types";
import { ActionTemplate, ActionType, AttackTemplate, MonsterActionTemplate } from "types";

const monsterActionsReducer: Redux.Reducer<ActionsState> = (state = initialState, action: Actions.ActionsAction) =>
{
    const newState = {...state};

    switch (action.type)
    {
        case types.ACTION_APPLY:
            {
                const { actionTemplateId } = action;
                newState.appliedActionTemplateIds.push(actionTemplateId);
                if (!newState.actionArgs[actionTemplateId])
                {
                    newState.actionArgs[actionTemplateId] = {};
                }
            }
            break;

        case types.ACTION_REMOVE:
            {
                const idx = newState.appliedActionTemplateIds.indexOf(action.actionTemplateId);
                if (idx !== -1)
                {
                    newState.appliedActionTemplateIds = newState.appliedActionTemplateIds.splice(idx, 1);
                }
            }
            break;

        case types.ACTION_ARGS_SET:
            {
                const { actionTemplateId, args } = action as Actions.SetActionArgAction;
                newState.actionArgs[actionTemplateId] =
                    {...newState.actionArgs[actionTemplateId], ...args};
            }
            break;

        default:
            return state;
    }

    return newState;
};


export default monsterActionsReducer;

const attackArgs: AttackArgs = {
    attackBonus: { key: "attackBonus", argType: ActionArgType.Number, value: "+4" },
    shortName: { key: "shortName", argType: ActionArgType.Text, value: "Test Monstah" },
};

const actionArgsMap: ActionArgsMap = {
    2: attackArgs as ActionArgs,
    length: 1,
};

const initialState: ActionsState = {
    appliedActionTemplateIds: [2],
    actionArgs: actionArgsMap,
};

export const getAppliedActionIds = (state: ActionsState) =>
    state.appliedActionTemplateIds;

export const getActionArgs = (state: ActionsState, action: ActionTemplate) =>
    state.actionArgs[action.id];
