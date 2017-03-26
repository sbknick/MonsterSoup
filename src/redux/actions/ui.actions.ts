import * as Redux from "redux";

import * as types from "redux/types/ui";

export interface MonsterBuilderFieldsetCollapseToggleAction extends Redux.Action
{
    fieldsetKey: string;
}

export const toggleFieldsetCollapse: Redux.ActionCreator<MonsterBuilderFieldsetCollapseToggleAction> =
    (fieldsetKey: string) => ({ type: types.FIELDSET_COLLAPSE_TOGGLE, fieldsetKey });

export type UIActions = MonsterBuilderFieldsetCollapseToggleAction;
