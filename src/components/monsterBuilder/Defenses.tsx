import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "monsterBuilder/actions/defenses.actions";
import { DefensesState, HitDice, Size } from "monsterBuilder/types";
import { getMonsterBuilderData, GlobalState } from "redux/reducers";

import * as CRUtil from "util/CRUtil";
import { asBonus, mod, modBonus } from "util/Mod";

import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem,
    NumberInput, SelectList, UpDownLinks } from "common";
import Armor from "./Armor";

/* tslint:disable:no-console */

interface Props
{
    defenses: DefensesState;
    conMod: number;

    setHitDiceCount: (idx: number, n: number) => void;
    setHitDieSize: (idx: number, n: number) => void;
    addNewHitDie: () => void;
    removeHitDie: (idx: number) => void;
    setSize: (size: Size) => void;
    toggleSizeOverride: () => void;
    setTempAC: (ac: number) => void;
}

const HitDiceSplats: React.StatelessComponent<Props> = (props) =>
{
    let idx = 0;
    const hitDiceSplats = props.defenses.hitDice.map(hd =>
    {
        const key = idx++;
        return  (
            <div key={key} className="hit-dice-box">
                {key > 0 &&
                    <button onClick={e => props.removeHitDie(key)}> - </button>
                }
                <NumberInput min={1} max={40} value={hd.hitDiceCount}
                             onBlur={e => props.setHitDiceCount(key, parseInt(e.target.value))} />
                d
                <NumberInput min={4} max={20} value={hd.hitDieSize}
                             onBlur={e => props.setHitDieSize(key, parseInt(e.target.value))} />
               {asBonus(props.conMod)}
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

    return (
        <select defaultValue="Medium"
                onChange={(e: any) => props.setSize((Size as any)[e.target.value])}>
            {sizeOptions}
        </select>
    );
};

const Defenses: React.StatelessComponent<Props> = (props) =>
{
    const averageHp = hitDiceAverage(props);

    return (
        <div className="container">
            <div className="defensive-cr-details">
                <LabelledItem label="Hit Dice" labelType="h4">
                    <label title="The monster's Size will determine the default size of the hit die">Size</label>
                    <SizeSelect {...props} />
                    { // hitDiceSplats//
                    }
                    <HitDiceSplats {...props} />
                    <button onClick={props.addNewHitDie}> + </button>
                </LabelledItem>
                <LabelledItem label="Armor Class" labelType="h4">
                    <Armor />
                </LabelledItem>
            </div>

            <div className="defensive-cr-calculations">
                <LabelledItem label="HP Average" labelType="h4">
                    <p>{averageHp} ({
                        props.defenses.hitDice.map(hd =>
                        `${hd.hitDiceCount}d${hd.hitDieSize}${props.conMod !== 0
                                ? asBonus(props.conMod * hd.hitDiceCount) : ""}`)
                        .join(" + ")
                    })</p>
                    <LabelledItem label="CR for Average HP">
                        {CRUtil.getCRForHP(averageHp)}
                    </LabelledItem>
                    <LabelledItem label="Expected AC for Average HP">
                        {CRUtil.getExpectedACForCR(CRUtil.getCRForHP(averageHp))}
                    </LabelledItem>
                </LabelledItem>
                <LabelledItem label="Effective AC" labelType="h4">
                    <NumberInput value={props.defenses.tempAC}
                                 onChange={e => props.setTempAC(parseInt(e.target.value))} />
                    <LabelledItem label="CR Range for Effective AC">
                        {JSON.stringify(CRUtil.getCRRangeForAC(props.defenses.tempAC))}
                    </LabelledItem>
                </LabelledItem>
            </div>

            <div className="defensive-cr-outcome">
                <LabelledItem label="Defensive CR Rating" labelType="h4">
                    {CRUtil.getDefensiveCR(averageHp, props.defenses.tempAC)}
                </LabelledItem>
                <div>
                    <h4>AutoScale!</h4>
                    <UpDownLinks size={2} onUpClicked={e => console.log("'up clicked'")}
                                          onDownClicked={e => console.log("'down clicked'")} />
                </div>
            </div>
        </div>
    );
};

function hitDiceAverage(props: Props): number
{
    const total = props.defenses.hitDice
                .map(hd => singleHitDiceAverage(hd, props.conMod))
                .reduce((a, b) => a + b);

    return total;
}

function singleHitDiceAverage(hitDice: HitDice, conMod: number): number
{
    const averageRoll = Math.floor(hitDice.hitDieSize / 2);

    const sum = (averageRoll + conMod) * hitDice.hitDiceCount;
    return sum;
}

function mapStateToProps(state: GlobalState): Props
{
    const mb = getMonsterBuilderData(state);

    return {
        conMod: mod(mb.attributes.Con),
        defenses: mb.defenses,
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
