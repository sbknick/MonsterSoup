import * as Redux from "redux";

// import * as Actions from "monsterBuilder/actions/actions.actions";
// import * as types from "redux/types/monsterBuilder/actions.types";

import { ActionsState } from "monsterBuilder/types";
import { ActionTemplate, ActionType, AttackTemplate, MonsterActionTemplate } from "types";

const monsterActionsReducer: Redux.Reducer<ActionsState> = (state = initialState, action: any) =>
{
    switch (action.type)
    {
        default:
            return state;
    }
};


export default monsterActionsReducer;

const initialState: ActionsState = {
    appliedActionTemplateIds: [],
    actionArgs: {},
};

export const getAppliedActionIds = (state: ActionsState) =>
    state.appliedActionTemplateIds;

export const getActionArgs = (state: ActionsState, action: ActionTemplate) =>
    state.actionArgs[action.id];
