import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "rdx/actions/monsterBuilder/defenses.actions";
import { getMonsterBuilderData, GlobalState } from "rdx/reducers";
import { ArmorData, ArmorFormulaOption, ArmorType, AttributesState, DefensesState } from "types/monsterBuilder";

import { armors, attributes } from "data";
import * as Calc from "util/Calc";
import * as Enum from "util/Enum";
// import { mod } from "util/Mod";
import { titleize } from "util/String";

import { // Fieldset, HighlightBonusOnChange, HighlightOnChange,
    LabelledItem, NumberInput,
    // SelectList, UpDownLinks
} from "components/common";

export const Armor: React.StatelessComponent<Props> = (props) =>
{
    const armorSplat = getArmorSplat(props);

    const formulaOptions = Enum.map(ArmorFormulaOption, opt =>
        <option key={opt} value={opt}>
            {titleize((ArmorFormulaOption as any)[opt])}
        </option>);

    return (
        <LabelledItem label="Armor Class" labelType="h4" className="armor-formula">
            <select value={props.defenses.armorFormula} // tslint:disable-next-line
                    onChange={(e: any) => props.setArmorFormula(parseInt(e.target.value) as ArmorFormulaOption)}>
                {formulaOptions}
            </select>
            {armorSplat}
        </LabelledItem>
    );
};

function getArmorSplat(props: Props): JSX.Element
{
    switch (props.defenses.armorFormula)
    {
        case ArmorFormulaOption.StandardArmor:
            return <StandardArmor {...props} />;

        case ArmorFormulaOption.NaturalArmor:
            return <NaturalArmor {...props} />;

        case ArmorFormulaOption.UnarmoredDefense:
            return <UnarmoredDefense {...props} />;

        default:
            throw new Error();
    }
}

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
                <select value={props.defenses.armor && props.defenses.armor.name}
                        onChange={(e: any) => props.setArmor(e.target.value)}>
                    {armorOptions}
                </select>
                <button title="Add custom armor type"> + </button>
            </p>
            <p>
                <input type="checkbox" checked={props.defenses.useShield}
                       onChange={props.toggleUseShield} /> Include a Shield
            </p>
            <label>Bonus</label>
            <NumberInput value={props.defenses.miscACBonus}
                         onChange={e => props.setMiscACBonus(parseInt(e.target.value))} />
            <p>
                <label>AC</label>
                <br />
                {Calc.getACOutputForStandardArmor(props.defenses, props.attributes)}
            </p>
        </div>
    );
};

const NaturalArmor: React.StatelessComponent<Props> = (props) =>
(
    <div>
        <p>
            <input type="checkbox" checked={props.defenses.useShield}
                   onChange={props.toggleUseShield} /> Include a Shield
        </p>
        <label>Bonus</label>
        <NumberInput value={props.defenses.miscACBonus}
                     onChange={e => props.setMiscACBonus(parseInt(e.target.value))} />
        <p>
            <label>AC</label>
            <br />
            {Calc.getACOutputForNaturalArmor(props.defenses, props.attributes)}
        </p>
    </div>
);

const UnarmoredDefense: React.StatelessComponent<Props> = (props) =>
(
    <div>
        <p>
            <label>AC from Attribute</label>
            <select value={props.defenses.unarmoredACAttribute}
                    onChange={(e: any) => props.setUnarmoredACAttribute(e.target.value)}>
                <option>N/A</option>
                {attributes.map(a => <option key={a}>{a}</option>)}
            </select>
        </p>
        <p>
            <input type="checkbox" checked={props.defenses.useShield}
                   onChange={props.toggleUseShield} /> Include a Shield
        </p>
        <label>Bonus</label>
        <NumberInput value={props.defenses.miscACBonus}
                     onChange={e => props.setMiscACBonus(parseInt(e.target.value))} />
        <p>
            <label>AC</label>
            <br />
            {Calc.getACOutputForUnarmoredDefense(props.defenses, props.attributes)}
        </p>
    </div>
);

interface Props
{
    attributes: AttributesState;
    defenses: DefensesState;

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
        attributes: mb.attributes,
        defenses: mb.defenses,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Armor);
