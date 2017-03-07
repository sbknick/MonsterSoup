import * as Redux from 'redux';
import * as types from '../../types/monsterBuilder/defenses.types';
import * as Actions from '../../actions/monsterBuilder/defenses.actions';

export const defensesReducer: Redux.Reducer<State> = (state = initialState, action: Actions.DefensesAction) =>
{
    var newState = Object.assign({}, state);

    switch (action.type)
    {
        case types.HIT_DICE_COUNT_SET:
            let act = <Actions.HitDiceModifyAction>action; // let act = action as Actions.
            newState.hitDice[act.idx].hitDiceCount = act.value;
            break;

        case types.HIT_DIE_SIZE_SET:
            act = <Actions.HitDiceModifyAction>action;
            newState.hitDice[act.idx].hitDieSize = act.value;
            if (act.idx == 0)
            {
                newState.sizeOverridden = true;
            }
            break;

        case types.HIT_DIE_ADD_NEW:
            newState.hitDice.push(initialState.hitDice[0]);
            break;

        case types.HIT_DIE_REMOVE:
            let idxact = <Actions.HitDieRemoveAction>action;

            if (newState.hitDice.length == 1)
                throw new RangeError();

            newState.hitDice.splice(idxact.idx, 1);

            if (idxact.idx == 0 && !newState.sizeOverridden)
            {
                newState.hitDice[0].hitDieSize = sizeDieSize(newState.size);
            }
            break;

        case types.SIZE_SET:
            let valact = <Actions.SizeSetAction>action;
            if (newState.size != valact.value)
            {
                newState.size = valact.value;
                if (newState.sizeOverridden)
                {
                    newState.hitDice[0].hitDieSize = sizeDieSize(valact.value);
                }
            }
            break;

        case types.SIZE_OVERRIDE_TOGGLE:
            if (newState.sizeOverridden)
            {
                newState.sizeOverridden = false;
                newState.hitDice[0].hitDieSize = sizeDieSize(newState.size);
            }
            else
            {
                newState.sizeOverridden = true;
            }
            break;

        case types.TEMP_AC_SET:
            valact = <Actions.TempACSetAction>action;
            newState.tempAC = valact.value;
            break;

        default:
            return state;
    }

    return state;
};

function sizeDieSize(size: Size)
{
    switch (size)
    {
        case Size.Tiny: return 4;
        case Size.Small: return 6;
        case Size.Medium: return 8;
        case Size.Large: return 10;
        case Size.Huge: return 12;
        case Size.Gargantuan: return 20;
        default: return 0;
    }
}

export enum Size
{
    Tiny = 1,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan
}

export interface HitDice
{
    hitDiceCount: number;
    hitDieSize: number;
}

export interface State
{
    size: Size;
    sizeOverridden: boolean;
    hitDice: HitDice[];

    tempAC: number;
}

const initialState: State = {
    size: Size.Medium,
    sizeOverridden: false,
    hitDice: [{
        hitDiceCount: 2,
        hitDieSize: 8,
    }],
    tempAC: 12,
}


export default defensesReducer;
