import * as Redux from "redux";

import { Trait } from "types";

import attributesReducer, * as fromAttributes from "./attributes.reducer";
import defensesReducer, * as fromDefenses from "./defenses.reducer";
import descriptionReducer, * as fromDescription from "./description.reducer";
import offensesReducer, * as fromOffenses from "./offenses.reducer";
import proficiencyReducer, * as fromProficiency from "./proficiency.reducer";
import savesReducer, * as fromSaves from "./saves.reducer";
import traitsReducer, * as fromTraits from "./traits.reducer";

import { AttributesState, DefensesState, OffensesState, SavesState, TraitsState } from "monsterBuilder/types";

const monsterBuilderReducer = Redux.combineReducers({
    attributes: attributesReducer,
    defenses: defensesReducer,
    description: descriptionReducer,
    offenses: offensesReducer,
    proficiency: proficiencyReducer,
    saves: savesReducer,
    traits: traitsReducer,
});

export interface MonsterBuilderState
{
    attributes: AttributesState;
    defenses: DefensesState;
    offenses: OffensesState;
    description: fromDescription.State;
    proficiency: fromProficiency.State;
    saves: SavesState;
    traits: TraitsState;
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

// -- Traits -- //
export const getAppliedTraitIds = (state: MonsterBuilderState) =>
    fromTraits.getAppliedTraitIds(state.traits);

export const getTraitArgs = (state: MonsterBuilderState, trait: Trait) =>
    fromTraits.getTraitArgs(state.traits, trait);
