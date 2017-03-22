import * as Redux from "redux";

import { ActionTemplate, TraitTemplate } from "types";

import actionsReducer, * as fromActions from "./actions.reducer";
import attributesReducer, * as fromAttributes from "./attributes.reducer";
import defensesReducer, * as fromDefenses from "./defenses.reducer";
import descriptionReducer, * as fromDescription from "./description.reducer";
import offensesReducer, * as fromOffenses from "./offenses.reducer";
import proficiencyReducer, * as fromProficiency from "./proficiency.reducer";
import savesReducer, * as fromSaves from "./saves.reducer";
import traitsReducer, * as fromTraits from "./traits.reducer";

import { ActionsState, AttributesState, DefensesState, OffensesState, SavesState,
         TraitsState } from "monsterBuilder/types";

const monsterBuilderReducer = Redux.combineReducers({
    actions: actionsReducer,
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
    actions: ActionsState;
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

export const getTraitArgs = (state: MonsterBuilderState, trait: TraitTemplate) =>
    fromTraits.getTraitArgs(state.traits, trait);

// -- Actions -- //
export const getAppliedActionIds = (state: MonsterBuilderState) =>
    fromActions.getAppliedActionIds(state.actions);

export const getActionArgs = (state: MonsterBuilderState, action: ActionTemplate) =>
    fromActions.getActionArgs(state.actions, action);
