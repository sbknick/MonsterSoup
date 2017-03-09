import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "../../redux/actions/monsterBuilder/defenses.actions";
import { getMonsterBuilderData, GlobalState } from "../../redux/reducers";
import { State as AttributesState } from "../../redux/reducers/monsterBuilder/attributes.reducer";
import { ArmorFormulaOption, State as DefensesState } from "../../redux/reducers/monsterBuilder/defenses.reducer";
import { titleize } from "../../util/String";
import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
         NumberInput, SelectList, UpDownLinks } from "../common";

import { ArmorData, armors, ArmorType } from "../../data/armor";
import { attributes } from "../../data/attributes";
import { mod } from "../../util/Mod";

export const Armor: React.StatelessComponent<ArmorProps> = (props) =>
{
    // const { isMetal, isArmor, armorName, usesShield } = this.props;

    // const armorString = usesShield ? armorName + ", shield" : armorName;

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

const StandardArmor: React.StatelessComponent<ArmorProps> = (props) =>
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

function calcACForStandardArmor(props: ArmorProps): string
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

const NaturalArmor: React.StatelessComponent<ArmorProps> = (props) =>
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

function calcACForNaturalArmor(props: ArmorProps): string
{
    let ac = 10 + props.miscACBonus + props.dexMod;
    ac += props.useShield ? 2 : 0;

    return `${ac} (natural armor${(props.useShield ? ", shield" : "")})`;
}

const UnarmoredDefense: React.StatelessComponent<ArmorProps> = (props) =>
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

function calcACForUnarmoredDefense(props: ArmorProps): string
{
    let ac = 10 + props.miscACBonus + props.dexMod;
    ac += props.useShield ? 2 : 0;

    if (props.unarmoredACAttribute)
    {
        ac += mod(props.attributes[props.unarmoredACAttribute]);
    }

    return `${ac}${(props.useShield ? " (shield)" : "")}`;
}

interface ArmorProps
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

function mapStateToProps(state: GlobalState): ArmorProps
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
    } as ArmorProps;
}

function mapDispatchToProps(dispatch: any): ArmorProps
{
    return {
        setArmorFormula: (af) => dispatch(Actions.setArmorFormula(af)),
        setArmor: (a) => dispatch(Actions.setArmor(a)),
        setUnarmoredACAttribute: (attr) => dispatch(Actions.setUnarmoredACAttribute(attr)),
        toggleUseShield: () => dispatch(Actions.toggleUseShield()),
        setMiscACBonus: (value) => dispatch(Actions.setMiscACBonus(value)),
    } as ArmorProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(Armor);
