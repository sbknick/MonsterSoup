import * as React from "react";
import { connect } from "react-redux";

import { getMonsterBuilderData, GlobalState } from "../../redux/reducers";
import { ArmorFormulaOption, State as DefensesState } from "../../redux/reducers/monsterBuilder/defenses.reducer";
import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
         NumberInput, SelectList, UpDownLinks } from "../common";


export const Armor: React.StatelessComponent<ArmorProps> = (props) =>
{
    // const { isMetal, isArmor, armorName, usesShield } = this.props;

    // const armorString = usesShield ? armorName + ", shield" : armorName;

    let ArmorSplat: any;

    switch (props.armorFormula)
    {
        case ArmorFormulaOption.StandardArmor:
            ArmorSplat = <StandardArmor {...props} />;
            break;

        case ArmorFormulaOption.NaturalArmor:
            ArmorSplat = <span>Natural Armor</span>;
            break;

        default:
            ArmorSplat = <div></div>;
    }

    const formulaOptions: any[] = [];
    for (const opt in ArmorFormulaOption) {
        if (parseInt(opt))
            continue;
        formulaOptions.push(<option key={opt}>{opt}</option>);
    }

    let idx = 0;

    return (
        <div className="armor-formula">
            <select onChange={() => { ; }}>
                {formulaOptions}
                {/*<option value={STANDARD_ARMOR}>Standard Armor</option>
                <option value={NATURAL_ARMOR}>Natural Armor</option>
                <option value={UNARMORED_DEFENSE}>Unarmored Defense</option>*/}
            </select>

        </div>
    );
};

export const StandardArmor: React.StatelessComponent<ArmorProps> = (props) =>
(
    <div>
        <input type="checkbox" /> Include a Shield
        <br />
        <label>Bonus</label>
        <NumberInput value={0} />
        {/*(this.state.defenses.ACFormulaType == UNARMORED_DEFENSE ?
            UNARMORED_DEFENSE
        : this.state.defenses.ACFormulaType == NATURAL_ARMOR ?
            NATURAL_ARMOR
        : STANDARD_ARMOR)*/}
        <div>
            <label>AC</label>
            <span>12</span>
        </div>
    </div>
);


interface ArmorProps
{
    armorFormula: ArmorFormulaOption;
    isMetal: boolean;
    isArmor: boolean;
    usesShield: boolean;
    armorName: string;
}

// interface ArmorOption
// {
//     name: string;
//     value: number;
//     dexCap?: number;
//     disadvantageOnStealth: boolean;
// }

// const ArmorOptions: ArmorOption[] = [
//     {
//         name: "Leather",
//         value: 1,
//         disadvantageOnStealth: false,
//     },
//     {
//         name: "StuddedLeather",
//         value: 2,
//         disadvantageOnStealth: false,
//     },
// ];

const STANDARD_ARMOR: "STANDARD_ARMOR" = "STANDARD_ARMOR";
const NATURAL_ARMOR: "NATURAL_ARMOR" = "NATURAL_ARMOR";
const UNARMORED_DEFENSE: "UNARMORED_DEFENSE" = "UNARMORED_DEFENSE";

const FormulaOptions = [STANDARD_ARMOR, NATURAL_ARMOR, UNARMORED_DEFENSE];

function mapStateToProps(state: GlobalState)
{
    const mb = getMonsterBuilderData(state);

    return {};
}

export default connect(mapStateToProps)(Armor);
