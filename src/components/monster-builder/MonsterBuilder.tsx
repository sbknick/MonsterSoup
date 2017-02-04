import * as React from 'react';
// import { connect } from 'react-redux';

import NumberInput from '../common/NumberInput';
import UpDownLinks from '../common/UpDownLinks';
import Attributes from './Attributes';
import HitDice from './HitDice';

interface MonsterStatsProps
{
    monsterName: string,
}

interface Defenses
{
    HitDieSize: number;
    HitDiceCount: number;

    BaseAC: number;
}

interface MonsterStatsState
{
    Defenses: Defenses;
}

const DEFAULT_MONSTER_STATS_STATE: MonsterStatsState = {
    Defenses: {HitDieSize: 8, HitDiceCount: 2, BaseAC: 10}
};

class MonsterBuilder extends React.Component<MonsterStatsProps, MonsterStatsState>
{
    constructor(props: MonsterStatsProps)
    {
        super(props);
        this.state = DEFAULT_MONSTER_STATS_STATE;

        this.ModifyHitDiceCount = this.ModifyHitDiceCount.bind(this);
        this.ModifyHitDieSize = this.ModifyHitDieSize.bind(this);
    }

    Mod(value: number): number
    {
        var result = Math.floor((value / 2) - 5);
        return result;
    }

    // EffectiveAC(): number
    // {
    //     var ac = this.state.Defenses.BaseAC + this.Mod(this.state.Attributes.Dex);
    //     return ac;
    // }

    ModifyHitDiceCount(e: any)
    {
        const def = this.state.Defenses;
        def.HitDiceCount = e.target.value;
        this.setState({Defenses: def} as MonsterStatsState);
    }

    ModifyHitDieSize(e: any)
    {
        const def = this.state.Defenses;
        def.HitDieSize = e.target.value;
        this.setState({Defenses: def} as MonsterStatsState);
    }

    render()
    {
        const { monsterName } = this.props;
        const { HitDieSize, HitDiceCount } = this.state.Defenses;

        const ConMod = 1; // this.Mod(Con);

        return (
            <div className="monster-stats">
                <fieldset>
                    <legend>{monsterName} Stats</legend>
                    <Attributes />
                    <div className="defenses">
                        <h3>Defensive CR</h3>

                        <HitDice HitDiceCount={HitDiceCount} HitDieSize={HitDieSize} ConMod={ConMod}
                            ModifyHitDieSize={this.ModifyHitDieSize}
                            ModifyHitDiceCount={this.ModifyHitDiceCount}
                            />

                        <div className="effective-ac">

                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default MonsterBuilder;
