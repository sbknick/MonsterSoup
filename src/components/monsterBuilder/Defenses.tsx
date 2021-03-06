import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "src/rdx/actions/monsterBuilder/defenses.actions";
import { getMonsterBuilderData, getTraitArgs, getTraitsForMonster, GlobalState } from "src/rdx/reducers";
import { AttributesState, DefensesState, HitDice, MonsterTrait, Size,
    // TraitArgs, TraitsState
} from "src/types/monsterBuilder";

import * as Calc from "src/util/Calc";
import * as CRUtil from "src/util/CRUtil";
import { asBonus, mod/*, modBonus*/ } from "src/util/Mod";

import { DiceRollInput,
    // Fieldset, HighlightBonusOnChange, HighlightOnChange,
    LabelledItem,
    // NumberInput, SelectList,
    UpDownLinks,
} from "src/components/common";
import Armor from "./Armor";

/* tslint:disable:no-console */

interface Props
{
    attributes: AttributesState;
    defenses: DefensesState;
    traits: MonsterTrait[];
    conMod: number;
    ac: number;
    effectiveAC: number;

    setHitDiceCount: (idx: number, n: number) => void;
    setHitDieSize: (idx: number, n: number) => void;
    addNewHitDie: () => void;
    removeHitDie: (idx: number) => void;
    setSize: (size: Size) => void;
    toggleSizeOverride: () => void;
    setTempAC: (ac: number) => void;
}

interface PropsWithAverageHp extends Props
{
    averageHp: number;
}

const Defenses: React.StatelessComponent<Props> = (props) =>
{
    const averageHp = Calc.averageHitDice(props.defenses.hitDice, props.conMod);

    const handleAutoScaleUp = () => console.log("'auto-scale up clicked'");
    const handleAutoScaleDOwn = () => console.log("'auto-scale down clicked'");

    return (
        <div className="container">
            <div className="defensive-cr-details">
                <SizeAndHitDice {...props} averageHp={averageHp} />
                <Armor />
            </div>

            <div className="defensive-cr-calculations">
                <DefensiveCRDetails averageHp={averageHp} {...props} />
                <DefensiveCRCalcs averageHp={averageHp} {...props} />
            </div>

            <div className="defensive-cr-outcome">
                <LabelledItem label="Defensive CR Rating" labelType="h4">
                    {CRUtil.getDefensiveCR(averageHp, props.defenses.tempAC)}
                </LabelledItem>
                <LabelledItem label="AutoScale!" labelType="h4">
                    <UpDownLinks size={2} onUpClicked={handleAutoScaleUp}
                                          onDownClicked={handleAutoScaleDOwn} />
                </LabelledItem>
            </div>
        </div>
    );
};

const SizeAndHitDice: React.StatelessComponent<PropsWithAverageHp> = (props) =>
(
    <LabelledItem label="Hit Dice" labelType="h4">
        <label title="The monster's Size will determine the default size of the hit die">Size</label>
        <SizeSelect {...props} />
        <HitDiceSplats {...props} />
        <button onClick={props.addNewHitDie}> + </button>
        <br /><br />
        <LabelledItem label="Average HP">
            <AverageHPSplat averageHp={props.averageHp} hitDice={props.defenses.hitDice} conMod={props.conMod} />
        </LabelledItem>
    </LabelledItem>
);

const AverageHPSplat: React.StatelessComponent<{averageHp: number, hitDice: HitDice[], conMod: number}> =
({averageHp, hitDice, conMod}) =>
{
    const sum = 0;
    return (<p>{averageHp} ({
        hitDice.map(hd => `${hd.hitDiceCount}d${hd.hitDieSize}`).join(" + ")
        + " + " +
        hitDice.reduce((acc, hd) => acc + (hd.hitDiceCount * conMod), sum)
    })</p>);
};

const HitDiceSplats: React.StatelessComponent<Props> = (props) =>
{
    let idx = 0;

    const handleRemoveHitDie = (key: number) => () => props.removeHitDie(key);
    const handleHitDiceCountChanged = (key: number) => (value: number) => props.setHitDiceCount(key, value);
    const handleHitDieSizeChanged = (key: number) => (value: number) => props.setHitDieSize(key, value);

    const hitDiceSplats = props.defenses.hitDice.map(hd =>
    {
        const key = idx++;
        return  (
            <div key={key} className="hit-dice-box">
                {key > 0 &&
                    <button onClick={handleRemoveHitDie(key)}> - </button>
                }
                <DiceRollInput
                    diceCount={hd.hitDiceCount} dieSize={hd.hitDieSize}
                    diceCountChanged={handleHitDiceCountChanged(key)}
                    dieSizeChanged={handleHitDieSizeChanged(key)}>
                    {/*<NumberInput min={1} max={40} value={hd.hitDiceCount}
                                 onBlur={e => props.setHitDiceCount(key, parseInt(e.target.value))} />
                    d
                    <NumberInput min={4} max={20} value={hd.hitDieSize}
                                 onBlur={e => props.setHitDieSize(key, parseInt(e.target.value))} />*/}
                   {asBonus(props.conMod)}
               </DiceRollInput>
            </div>
        );
    });

    return <div>{hitDiceSplats}</div>;
};

const SizeSelect: React.StatelessComponent<Props> = (props) =>
{
    const sizeOptions: any[] = [];
    for (const size in Size) {
        if (parseInt(size))
            continue;
        sizeOptions.push(<option key={size}>{size}</option>);
    }

    const handleSizeChanged = (e: any) => props.setSize((Size as any)[e.target.value]);

    return (
        <select defaultValue="Medium"
                onChange={handleSizeChanged}>
            {sizeOptions}
        </select>
    );
};

const EffectiveAC: React.StatelessComponent<Props> = (props) =>
{
    const range = CRUtil.getCRRangeForAC(props.effectiveAC);

    return (
        <LabelledItem label="Effective AC">
            {Calc.getEffectiveACOutput(props.defenses, props.attributes, props.traits)}
            <LabelledItem label="Expected CR Range for Effective AC">
                {(range.Low === "0" && range.High === "0") ? "0" : `${range.Low}-${range.High}`}
            </LabelledItem>
        </LabelledItem>
    );
};

const DefensiveCRDetails: React.StatelessComponent<PropsWithAverageHp> = (props) =>
(
    <LabelledItem label="Defensive CR Details" labelType="h4">
        <LabelledItem label="Expected CR for Average HP">
            {CRUtil.getCRForHP(props.averageHp)}
        </LabelledItem>

        <LabelledItem label="Expected AC for Average HP">
            {CRUtil.getExpectedACForCR(CRUtil.getCRForHP(props.averageHp))}
        </LabelledItem>

        <EffectiveAC {...props} />
    </LabelledItem>
);

const DefensiveCRCalcs: React.StatelessComponent<PropsWithAverageHp> = (props) =>
{
    // const diff = props.effectiveAC - props.ac;

    return (
        <LabelledItem label="Defensive CR Calculations" labelType="h4" style={{marginTop: "20px"}}>
            <LabelledItem label="CR from Average HP" value={CRUtil.getCRForHP(props.averageHp)} />
            <LabelledItem label="Adjustment from eAC"
            value={CRUtil.getCRAdjustmentForAC(props.averageHp, props.effectiveAC)} />
            <LabelledItem label="Total" value={CRUtil.getDefensiveCR(props.averageHp, props.effectiveAC)} />

        </LabelledItem>
    );
};

function mapStateToProps(state: GlobalState): Props
{
    const mb = getMonsterBuilderData(state);
    const traits = getTraitsForMonster(state);

    const monsterTraits: MonsterTrait[] = traits.map(t => ({ trait: t, traitArgs: getTraitArgs(state, t)}));

    return {
        conMod: mod(mb.attributes.Con),
        attributes: mb.attributes,
        defenses: mb.defenses,
        traits: monsterTraits,
        ac: Calc.calcAC(mb.defenses, mb.attributes),
        effectiveAC: Calc.calcEffectiveAC(mb.defenses, mb.attributes, monsterTraits),
    } as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    return {
        addNewHitDie: () => dispatch(Actions.addNewHitDie()),
        removeHitDie: (idx: number) => dispatch(Actions.removeHitDie(idx)),
        setHitDiceCount: (idx: number, n: number) => dispatch(Actions.setHitDiceCount(idx, n)),
        setHitDieSize: (idx: number, n: number) => dispatch(Actions.setHitDieSize(idx, n)),
        setSize: (size: Size) => dispatch(Actions.setSize(size)),
        setTempAC: (ac: number) => dispatch(Actions.setTempAC(ac)),
        toggleSizeOverride: () => dispatch(Actions.toggleSizeOverride()),
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Defenses);
