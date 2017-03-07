import * as React from 'react';
import { connect } from 'react-redux';

import * as CRUtil from '../../util/CRUtil';
import { mod, modBonus } from '../../util/Mod';

import { GlobalState, getMonsterBuilderData } from '../../redux/reducers';
import { State as DefensesState, HitDice, Size } from '../../redux/reducers/monsterBuilder/defenses.reducer';
// import { }

import { Fieldset, HighlightBonusOnChange, HighlightOnChange, LabelledItem, NumberInput, SelectList, UpDownLinks } from '../common';
import Armor from './Armor';

const Defenses: React.StatelessComponent<Props> = (props: Props) =>
{
    var sizeOptions: any[] = [];
    for (var size in Size)
    {
        if (parseInt(size))
            continue;
        sizeOptions.push(<option key={size}>{size}</option>);
    }

    var hitDiceSplats = props.defenses.hitDice.map(hd =>
        <div key={hd.toString()} className="hit-dice-box">
            <NumberInput min={1} max={40} value={hd.hitDiceCount} onBlur={() => {}} />
            d
            <NumberInput min={4} max={20} value={hd.hitDieSize} onBlur={() => {}} />
        </div>
    );

    var averageHp = hitDiceAverage(props);

    return (
        <div className="container">
            <div className="defensive-cr-details">
                <LabelledItem label="Hit Dice" labelType="h4">
                    <label title="The monster's Size will determine the default size of the hit die">Size</label>
                    <select defaultValue="Medium" onChange={() => {}}>
                        {sizeOptions}
                    </select>
                    <div className="inline-children">
                        {hitDiceSplats}
                    </div>
                </LabelledItem>
                <LabelledItem label="Armor Class" labelType="h4">
                    <Armor />
                    <div>
                        <label>AC</label>
                        <span>12</span>
                    </div>
                </LabelledItem>
            </div>
            <div className="defensive-cr-calculations">
                <div>
                    <h4>HP Average</h4>
                    <div>
                        <div>{averageHp} ({0}d{0} + {0 * 0})</div>
                        <LabelledItem label="CR for Average HP">
                            {CRUtil.getCRForHP(averageHp)}
                        </LabelledItem>
                        <LabelledItem label="Expected AC for Average HP">
                            {CRUtil.getExpectedACForCR(CRUtil.getCRForHP(averageHp))}
                        </LabelledItem>
                    </div>
                </div>
                <div>
                    <h4>Effective AC</h4>
                    <NumberInput value={props.defenses.tempAC} onChange={() => {}} />
                    <LabelledItem label="CR Range for Effective AC">
                        {JSON.stringify(CRUtil.getCRRangeForAC(props.defenses.tempAC))}
                    </LabelledItem>
                </div>
            </div>
            <div className="defensive-cr-outcome">
                <LabelledItem label="Defensive CR Rating" labelType="h4">
                    {CRUtil.getDefensiveCR(averageHp, props.defenses.tempAC)}
                </LabelledItem>
                <div>
                    <h4>AutoScale!</h4>
                    <UpDownLinks size={2} onUpClicked={e => console.log('up clicked')} onDownClicked={e => console.log('down clicked')} />
                </div>
            </div>
        </div>
    )
};

interface Props
{
    defenses: DefensesState;
    conMod: number;
}

function hitDiceAverage(props: Props) : number
{
    var total = props.defenses.hitDice
                .map(hd => singleHitDiceAverage(hd, props.conMod))
                .reduce((a, b) => a + b);

    return total;
}

function singleHitDiceAverage(hitDice: HitDice, conMod: number) : number
{
    let averageRoll = Math.floor(hitDice.hitDieSize / 2);

    var sum = (averageRoll + conMod) * hitDice.hitDiceCount;
    return sum;
}

function mapStateToProps(state: GlobalState) : Props
{
    var mb = getMonsterBuilderData(state);

    return {
        defenses: mb.defenses,
        conMod: mod(mb.attributes.Con)
    } as Props;
}

function mapDispatchToProps(dispatch: any) : Props
{
    return {

    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Defenses);
