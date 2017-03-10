import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "monsterBuilder/actions/defenses.actions";
import { ArmorData, ArmorFormulaOption, ArmorType, AttributesState, DefensesState } from "monsterBuilder/types";
import { getMonsterBuilderData, GlobalState } from "redux/reducers";

import { armors, attributes } from "data";
import { mod } from "util/Mod";
import { titleize } from "util/String";

import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
         NumberInput, SelectList, UpDownLinks } from "common";

export const Armor: React.StatelessComponent<Props> = (props) =>
{
    let armorSplat: any;

    switch (props.armorFormula)
    {
        case ArmorFormulaOption.StandardArmor:
            armorSplat = <StandardArmor {...props} />;
            break;

        case ArmorFormulaOption.NaturalArmor:
            armorSplat = <NaturalArmor {...props} />;
            break;

        default:
            armorSplat = <UnarmoredDefense {...props} />;
            break;
    }

    const formulaOptions: any[] = [];
    for (const opt in ArmorFormulaOption) {
        if (!parseInt(opt))
            continue;
        formulaOptions.push(<option key={opt} value={opt}>{titleize(ArmorFormulaOption[opt])}</option>);
    }

    // let idx = 0;

    return (
        <div className="armor-formula">
            <select value={props.armorFormula}
                    onChange={e => props.setArmorFormula(parseInt(e.target.value) as ArmorFormulaOption)}>
                {formulaOptions}
            </select>
            {armorSplat}
        </div>
    );
};

let armorOptions: JSX.Element[] = [];

function compileArmorOptions(): void
{
    if (armorOptions.length !== armors.length + 3)
    {
        const map = (aa: ArmorData[]) => aa.map(a => <option key={a.name}>{a.name}</option>);

        armorOptions.push(<option key={"light"} disabled>- Light Armor -</option>);
        armorOptions = armorOptions.concat(map(armors.filter(a => a.type === ArmorType.Light)));

        armorOptions.push(<option key={"medium"} disabled>- Medium Armor -</option>);
        armorOptions = armorOptions.concat(map(armors.filter(a => a.type === ArmorType.Medium)));

        armorOptions.push(<option key={"heavy"} disabled>- Heavy Armor -</option>);
        armorOptions = armorOptions.concat(map(armors.filter(a => a.type === ArmorType.Heavy)));
    }
}

const StandardArmor: React.StatelessComponent<Props> = (props) =>
{
    compileArmorOptions();

    return (
        <div>
            <p>
                <select value={props.armor.name} onChange={e => props.setArmor(e.target.value)}>
                    {armorOptions}
                </select>
                <button title="Add custom armor type"> + </button>
            </p>
            <p>
                <input type="checkbox" checked={props.useShield} onChange={props.toggleUseShield} /> Include a Shield
            </p>
            <label>Bonus</label>
            <NumberInput value={props.miscACBonus} onChange={e => props.setMiscACBonus(parseInt(e.target.value))} />
            <p>
                <label>AC</label>
                <br />
                {calcACForStandardArmor(props)}
            </p>
        </div>
    );
};

function calcACForStandardArmor(props: Props): string
{
    let ac = props.armor.value + props.miscACBonus;
    ac += props.useShield ? 2 : 0;

    switch (props.armor.type)
    {
        case ArmorType.Light:
            ac += props.dexMod;
            break;

        case ArmorType.Medium:
            ac += Math.min(2, props.dexMod);
            break;

        case ArmorType.Heavy:
            break;

        default:
            throw new RangeError("Unexpected armor type");
    }

    return `${ac} (${props.armor.name.toLowerCase()}${(props.useShield ? ", shield" : "")})`;
}

const NaturalArmor: React.StatelessComponent<Props> = (props) =>
(
    <div>
        <p>
            <input type="checkbox" checked={props.useShield} onChange={props.toggleUseShield} /> Include a Shield
        </p>
        <label>Bonus</label>
        <NumberInput value={props.miscACBonus} onChange={e => props.setMiscACBonus(parseInt(e.target.value))} />
        <p>
            <label>AC</label>
            <br />
            {calcACForNaturalArmor(props)}
        </p>
    </div>
);

function calcACForNaturalArmor(props: Props): string
{
    let ac = 10 + props.miscACBonus + props.dexMod;
    ac += props.useShield ? 2 : 0;

    return `${ac} (natural armor${(props.useShield ? ", shield" : "")})`;
}

const UnarmoredDefense: React.StatelessComponent<Props> = (props) =>
(
    <div>
        <p>
            <label>AC from Attribute</label>
            <select value={props.unarmoredACAttribute} onChange={e => props.setUnarmoredACAttribute(e.target.value)}>
                <option>N/A</option>
                {attributes.map(a => <option key={a}>{a}</option>)}
            </select>
        </p>
        <p>
            <input type="checkbox" checked={props.useShield} onChange={props.toggleUseShield} /> Include a Shield
        </p>
        <label>Bonus</label>
        <NumberInput value={props.miscACBonus} onChange={e => props.setMiscACBonus(parseInt(e.target.value))} />
        <p>
            <label>AC</label>
            <br />
            {calcACForUnarmoredDefense(props)}
        </p>
    </div>
);

function calcACForUnarmoredDefense(props: Props): string
{
    let ac = 10 + props.miscACBonus + props.dexMod;
    ac += props.useShield ? 2 : 0;

    if (props.unarmoredACAttribute)
    {
        ac += mod((props.attributes as any)[props.unarmoredACAttribute]);
    }

    return `${ac}${(props.useShield ? " (shield)" : "")}`;
}

interface Props
{
    dexMod: number;
    attributes: AttributesState;

    armorFormula: ArmorFormulaOption;

    // Standard Armor
    armor?: ArmorData;

    // Unarmored Defense
    unarmoredACAttribute?: string;

    useShield?: boolean;
    miscACBonus: number;

    setArmorFormula: (af: ArmorFormulaOption) => void;
    setArmor: (a: string) => void;
    setUnarmoredACAttribute: (attr: string) => void;
    toggleUseShield: () => void;
    setMiscACBonus: (value: number) => void;
}

function mapStateToProps(state: GlobalState): Props
{
    const mb = getMonsterBuilderData(state);

    return {
        dexMod: mod(mb.attributes.Dex),
        attributes: mb.attributes,
        armorFormula: mb.defenses.armorFormula,
        armor: mb.defenses.armor,
        unarmoredACAttribute: mb.defenses.unarmoredACAttribute,
        useShield: mb.defenses.useShield,
        miscACBonus: mb.defenses.miscACBonus,
    } as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    return {
        setArmorFormula: (af) => dispatch(Actions.setArmorFormula(af)),
        setArmor: (a) => dispatch(Actions.setArmor(a)),
        setUnarmoredACAttribute: (attr) => dispatch(Actions.setUnarmoredACAttribute(attr)),
        toggleUseShield: () => dispatch(Actions.toggleUseShield()),
        setMiscACBonus: (value) => dispatch(Actions.setMiscACBonus(value)),
    } as Props;
};

export default connect(mapStateToProps, mapDispatchToProps)(Armor);
