import * as Redux from "redux";

import defaultActions from "data/actions";
import { NormalisedData } from "rdx/reducers";
import { ActionTemplate } from "types";

const actionsReducer: Redux.Reducer<ActionsState> =
(state = initialState, action: {type: string, actionTemplates: ActionTemplate[]}) =>
{
    if (state.allIds.length === 0)
    {
        state = normalise(defaultActions);
    }

    switch (action.type)
    {
        case "ACTION_TEMPLATES_FETCH_SUCCESS":
            return normalise(action.actionTemplates);

        default:
            return state;
    }
};

export default actionsReducer;

export type ActionsState = NormalisedData<ActionTemplate>;

const initialState: ActionsState = { byId: {}, allIds: [] };

function normalise(items: ActionTemplate[]): NormalisedData<ActionTemplate>
{
    const results: NormalisedData<ActionTemplate> = { byId: {}, allIds: [] };

    return items.reduce((acc, tr) => {
        const id = tr.id;
        acc.byId[id] = tr;
        acc.allIds.push(id);
        return acc;
    }, results);
};

export function getAllActions(state: ActionsState): ActionTemplate[]
{
    return state.allIds.map(id => state.byId[id]);
}
