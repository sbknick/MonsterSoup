import * as Redux from 'redux';

import * as types from '../../types/monsterBuilder/proficiency.types';

interface ProficiencyActionPayload
{
    amount: number;
}

export const ModifyProficiency: Redux.ActionCreator<ProficiencyActionPayload> =
    (amount: number) =>
    {
            return { type: types.MODIFY_PROFICIENCY, amount: amount };
    };

export type ProficiencyAction = Redux.Action & ProficiencyActionPayload;
