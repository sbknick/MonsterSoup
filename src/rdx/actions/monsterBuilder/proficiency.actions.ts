import * as Redux from 'redux';

import * as types from '../../types/monsterBuilder/proficiency.types';

interface ProficiencyActionPayload
{
    amount: number;
}

export const modifyProficiency: Redux.ActionCreator<ProficiencyActionPayload> =
    (amount: number) => ({ type: types.PROFICIENCY_MODIFY, amount: amount });

export type ProficiencyAction = Redux.Action & ProficiencyActionPayload;
