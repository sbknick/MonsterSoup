import * as Redux from "redux";
import * as Actions from "../../actions/monsterBuilder/defenses.actions";
import * as types from "../../types/monsterBuilder/defenses.types";

export const defensesReducer: Redux.Reducer<State> = (state = initialState, action: Actions.DefensesAction) =>
{
    const newState = Object.assign({}, state);

    let dieModAction: Actions.HitDiceModifyAction;

    switch (action.type)
    {
        case types.HIT_DICE_COUNT_SET:
            dieModAction = action as Actions.HitDiceModifyAction;
            newState.hitDice[dieModAction.idx].hitDiceCount = dieModAction.value;
            break;

        case types.HIT_DIE_SIZE_SET:
            dieModAction = action as Actions.HitDiceModifyAction;
            newState.hitDice[dieModAction.idx].hitDieSize = dieModAction.value;
            if (dieModAction.idx === 0)
            {
                newState.sizeOverridden = true;
            }
            break;

        case types.HIT_DIE_ADD_NEW:
            newState.hitDice.push({ hitDiceCount: 2, hitDieSize: sizeDieSize(newState.size)});
            break;

        case types.HIT_DIE_REMOVE:
            const idxact = action as Actions.HitDieRemoveAction;

            if (newState.hitDice.length === 1)
                throw new RangeError();

            newState.hitDice.splice(idxact.idx, 1);

            if (idxact.idx === 0 && !newState.sizeOverridden)
            {
                newState.hitDice[0].hitDieSize = sizeDieSize(newState.size);
            }
            break;

        case types.SIZE_SET:
            const sizeact = action as Actions.SizeSetAction;
            if (newState.size !== sizeact.size)
            {
                newState.size = sizeact.size;
                if (!newState.sizeOverridden)
                {
                    newState.hitDice[0].hitDieSize = sizeDieSize(sizeact.size);
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

        case types.ARMOR_FORMULA_SET:
            const aract = action as Actions.SetArmorFormulaAction;
            newState.armorFormula = aract.armorFormula;
            break;

        case types.TEMP_AC_SET:
            const valact = action as Actions.TempACSetAction;
            newState.tempAC = valact.value;
            break;

        default:
            return state;
    }

    return newState;
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
    Gargantuan,
}

export interface HitDice
{
    hitDiceCount: number;
    hitDieSize: number;
}

export enum ArmorFormulaOption
{
    StandardArmor = 1,
    NaturalArmor,
    UnarmoredDefense,
};

export interface State
{
    size: Size;
    sizeOverridden: boolean;
    hitDice: HitDice[];

    armorFormula: ArmorFormulaOption;
    tempAC: number;
}

const initialState: State = {
    size: Size.Medium,
    sizeOverridden: false,
    hitDice: [{
        hitDiceCount: 2,
        hitDieSize: 8,
    }],

    armorFormula: ArmorFormulaOption.StandardArmor,
    tempAC: 12,
};


export default defensesReducer;
