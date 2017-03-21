import * as Redux from "redux";

import * as Actions from "monsterBuilder/actions/traits.actions";
import * as types from "redux/types/monsterBuilder/traits.types";

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
