import * as Redux from "redux";

import * as Actions from "rdx/actions/monsterBuilder/defenses.actions";
import * as types from "rdx/types/monsterBuilder/defenses.types";

import { armors } from "data/armor";
import { ArmorFormulaOption, DefensesState, Size } from "types/monsterBuilder";
// import * as Types from "types/monsterBuilder";

export const defensesReducer: Redux.Reducer<DefensesState> = (state = initialState, action: Actions.DefensesAction) =>
{
    const newState = {...state};

    switch (action.type)
    {
        case types.HIT_DICE_COUNT_SET:
            {
                const { idx, value } = action as Actions.HitDiceModifyAction;
                newState.hitDice[idx].hitDiceCount = value;
            }
            break;

        case types.HIT_DIE_SIZE_SET:
            {
                const { idx, value } = action as Actions.HitDiceModifyAction;
                newState.hitDice[idx].hitDieSize = value;

                if (idx === 0)
                    newState.sizeOverridden = true;
            }
            break;

        case types.HIT_DIE_ADD_NEW:
            newState.hitDice.push({ hitDiceCount: 2, hitDieSize: sizeDieSize(newState.size)});
            break;

        case types.HIT_DIE_REMOVE:
            {
                const { idx } = action as Actions.HitDieRemoveAction;

                if (newState.hitDice.length === 1)
                    throw new RangeError();

                newState.hitDice.splice(idx, 1);

                if (idx === 0 && !newState.sizeOverridden)
                    newState.hitDice[0].hitDieSize = sizeDieSize(newState.size);
            }
            break;

        case types.SIZE_SET:
            {
                const { size } = action as Actions.SizeSetAction;
                if (newState.size !== size)
                {
                    newState.size = size;
                    if (!newState.sizeOverridden)
                    {
                        newState.hitDice[0].hitDieSize = sizeDieSize(size);
                    }
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
            {
                const { armorFormula } = action as Actions.SetArmorFormulaAction;
                newState.armorFormula = armorFormula;
            }
            break;

        case types.ARMOR_SET:
            {
                const { armor } = action as {armor: string};
                const armorObject = armors.find(a => a.name === armor);
                newState.armor = armorObject;
            }
            break;

        case types.UNARMORED_AC_ATTRIBUTE_SET:
            {
                const { attr } = action as {attr: string};
                newState.unarmoredACAttribute = attr;
            }
            break;

        case types.USE_SHIELD_TOGGLE:
            newState.useShield = !newState.useShield;
            break;

        case types.MISC_AC_BONUS_SET:
            {
                const { value } = action as {value: number};
                newState.miscACBonus = value;
            }
            break;

        case types.TEMP_AC_SET:
            {
                const { value } = action as Actions.TempACSetAction;
                newState.tempAC = value;
            }
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

const initialState: DefensesState = {
    size: Size.Medium,
    sizeOverridden: false,
    hitDice: [{
        hitDiceCount: 2,
        hitDieSize: 8,
    }],

    armorFormula: ArmorFormulaOption.StandardArmor,
    armor: armors[1],
    useShield: false,
    miscACBonus: 0,

    tempAC: 12,
};

export default defensesReducer;
