import * as Redux from 'redux';

import { Trait } from '../traits.reducer';

import descriptionReducer, * as fromDescription from './description.reducer';
import proficiencyReducer, * as fromProficiency from './proficiency.reducer';
import traitsReducer, * as fromTraits from './traits.reducer';

const monsterBuilderReducer = Redux.combineReducers({
    description: descriptionReducer,
    proficiency: proficiencyReducer,
    traits: traitsReducer
});

export type MonsterBuilderState = {
    description: fromDescription.State,
    proficiency: fromProficiency.State,
    traits: fromTraits.State
};

export default monsterBuilderReducer;

export const getDescription = (state: MonsterBuilderState) =>
    state.description;

export const getProficiencyBonus = (state: MonsterBuilderState) =>
    fromProficiency.getProficiencyBonus(state.proficiency);

export const getAppliedTraitIds = (state: MonsterBuilderState) =>
    fromTraits.getAppliedTraitIds(state.traits);

export const getTraitArgs = (state: MonsterBuilderState, trait: Trait) =>
    fromTraits.getTraitArgs(state.traits, trait);
