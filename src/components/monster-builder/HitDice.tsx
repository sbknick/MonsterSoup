import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState } from '../../reducers';
import * as Actions from '../../actions/MonsterBuilder.HitDiceActions';
import NumberInput from '../common/NumberInput';
import UpDownLinks from '../common/UpDownLinks';

interface Props {
    HitDieSize: number;
    HitDiceCount: number;
    ConMod: number;

    SetHitDieSize: (e: any) => void;
    SetHitDiceCount: (e: any) => void;
}

function GetMod(value: number) : number
{
    var result = Math.floor((value / 2) - 5);
    return result;
}

function mapStateToProps(state: GlobalState): Props
{
    var defenses = state.monsterBuilder.defenses;

    return {
        HitDieSize: defenses.HitDice[0].HitDieSize,
        HitDiceCount: defenses.HitDice[0].HitDiceCount,
        ConMod: GetMod(state.monsterBuilder.attributes.Con),
    } as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    return {
        SetHitDieSize: e => dispatch(Actions.SetHitDieSize(0, e.target.value)),
        SetHitDiceCount: e => dispatch(Actions.SetHitDiceCount(0, e.target.value))
    } as Props;
}

class HitDice extends React.Component<Props, void>
{
    HitDiceAverage(): number
    {
        const { HitDieSize, HitDiceCount, ConMod } = this.props;

        let averageRoll = Math.floor(HitDieSize / 2);

        var sum = (averageRoll + ConMod) * HitDiceCount;
        return sum;
    }

    render()
    {
        const { HitDiceCount, HitDieSize, ConMod } = this.props;
        const { SetHitDieSize, SetHitDiceCount } = this.props;

        return (
            <div className="hit-dice-box">
                <h4>Hit Dice</h4>
                <div>
                    <NumberInput min={1} max={40} value={HitDiceCount} onBlur={SetHitDiceCount} />
                    &nbsp;d&nbsp;
                    <NumberInput min={4} max={12} value={HitDieSize} onBlur={SetHitDieSize} />
                </div>
                <div>
                    {this.HitDiceAverage()} ({HitDiceCount}d{HitDieSize} + {HitDiceCount * ConMod})
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HitDice);
