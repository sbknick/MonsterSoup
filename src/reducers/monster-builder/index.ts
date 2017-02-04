import * as Redux from 'redux';
import AttributesReducer, { AttributesState } from './attributes.reducer';
import DefensesReducer, { DefensesState } from './defenses.reducer';

export const monsterBuilderReducer = Redux.combineReducers({
    attributes: AttributesReducer,
    defenses: DefensesReducer
});

export interface MonsterBuilderState
{
    attributes: AttributesState,
    defenses: DefensesState
}

export default monsterBuilderReducer;
