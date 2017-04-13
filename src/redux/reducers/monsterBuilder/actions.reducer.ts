import * as Redux from "redux";

import * as Actions from "monsterBuilder/actions/actions.actions";
import * as types from "redux/types/monsterBuilder/actions.types";

import { ActionArgs, ActionArgsMap, ActionArgType, ActionsState, AttackArgs } from "monsterBuilder/types";
import { ActionTemplate, ActionType, AttackTemplate, MonsterActionTemplate } from "types";

const t1 = {
    type: types.ACTION_APPLY,
    action: (newState: ActionsState, action: Actions.ActionApplyRemoveAction) =>
    {
        const { actionTemplateId } = action;
        newState.appliedActionTemplateIds.push(actionTemplateId);
        if (!newState.actionArgs[actionTemplateId])
        {
            newState.actionArgs[actionTemplateId] = {};
        }
    },
};

// const lookup: {[key: string]: (newState: ActionsState, action: Actions.ActionsAction) => void} = {
//     [types.ACTION_APPLY]:
//     (newState: ActionsState, action: Actions.ActionApplyRemoveAction) =>
//     {
//         const { actionTemplateId } = action;
//         newState.appliedActionTemplateIds.push(actionTemplateId);
//         if (!newState.actionArgs[actionTemplateId])
//         {
//             newState.actionArgs[actionTemplateId] = {};
//         }
//     },
// };

const monsterActionsReducer: Redux.Reducer<ActionsState> = (state = initialState, action: Actions.ActionsAction) =>
{
    const newState = {...state};

    // lookup[action.type](newState, action);

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

        case types.ACTION_ARG_SET:
            {
                const { actionTemplateId, arg, argType, value } = action as Actions.SetActionArgAction;
                const ar = newState.actionArgs[actionTemplateId];
                ar[arg] = {
                    key: arg,
                    argType,
                    value,
                };
            }
            break;

        case types.ACTION_ARG_TYPE_SET:
            {
                const { actionTemplateId, arg, argType } = action as Actions.SetActionArgTypeAction;
                const ar = newState.actionArgs[actionTemplateId];
                ar[arg] = {
                    key: arg,
                    argType,
                    value: ar[arg] ? ar[arg].value : null,
                };
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
    shortName: { key: "shortName", argType: ActionArgType.Text, value: "Test Monstah", inherited: true },
    damage: { key: "damage", argType: ActionArgType.DamageRoll , value: {
        diceCount: 2,
        dieSize: 6,
        usePrimaryStatBonus: true,
    } },
    damageType: { key: "damageType", argType: ActionArgType.DamageType, value: "8" }, // 8: Piercing
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
