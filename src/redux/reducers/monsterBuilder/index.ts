import * as Redux from 'redux';

import { Trait } from '../traits.reducer';

import attributesReducer, * as fromAttributes from './attributes.reducer';
import defensesReducer, * as fromDefenses from './defenses.reducer';
import descriptionReducer, * as fromDescription from './description.reducer';
import proficiencyReducer, * as fromProficiency from './proficiency.reducer';
import savesReducer, * as fromSaves from './saves.reducer';
import traitsReducer, * as fromTraits from './traits.reducer';

const monsterBuilderReducer = Redux.combineReducers({
    attributes: attributesReducer,
    defenses: defensesReducer,
    description: descriptionReducer,
    proficiency: proficiencyReducer,
    saves: savesReducer,
    traits: traitsReducer
});

export type MonsterBuilderState = {
    attributes: fromAttributes.State,
    defenses: fromDefenses.State,
    description: fromDescription.State,
    proficiency: fromProficiency.State,
    saves: fromSaves.State,
    traits: fromTraits.State
};

export default monsterBuilderReducer;

export const getAttributes = (state: MonsterBuilderState) =>
    state.attributes;

export const getAttributeScore = (state: MonsterBuilderState, attr: string) =>
    fromAttributes.getAttributeScore(state.attributes, attr);

export const getDescription = (state: MonsterBuilderState) =>
    state.description;

export const getProficiencyBonus = (state: MonsterBuilderState) =>
    fromProficiency.getProficiencyBonus(state.proficiency);

export const getSaves = (state: MonsterBuilderState) =>
    state.proficiency;

export const getSaveState = (state: MonsterBuilderState, attr: string) =>
    fromSaves.getSaveState(state.saves, attr);

//-- Traits --//
export const getAppliedTraitIds = (state: MonsterBuilderState) =>
    fromTraits.getAppliedTraitIds(state.traits);

export const getTraitArgs = (state: MonsterBuilderState, trait: Trait) =>
    fromTraits.getTraitArgs(state.traits, trait);
