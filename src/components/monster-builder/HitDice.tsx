import * as React from 'react';

import NumberInput from '../common/NumberInput';
import UpDownLinks from '../common/UpDownLinks';

interface Props {
    HitDieSize: number;
    HitDiceCount: number;
    ConMod: number;

    ModifyHitDieSize: (e: any) => void;
    ModifyHitDiceCount: (e: any) => void;
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
        const { ModifyHitDieSize, ModifyHitDiceCount } = this.props;

        return (
            <div className="hit-dice-box">
                <h4>Hit Dice <UpDownLinks onUpClicked={e => console.log("Up Clicked in HitDice")} onDownClicked={e => console.log("Down Clicked in HitDice")} /></h4>
                <div>
                    <NumberInput min={1} max={40} value={HitDiceCount} onBlur={ModifyHitDiceCount} />
                    &nbsp;d&nbsp;
                    <NumberInput min={4} max={12} value={HitDieSize} onBlur={ModifyHitDieSize} />
                </div>
                <div>
                    {this.HitDiceAverage()} ({HitDiceCount}d{HitDieSize} + {HitDiceCount * ConMod})
                </div>
            </div>
        );
    }
}

export default HitDice;
