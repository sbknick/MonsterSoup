import * as React from 'react';

import { Trait } from '../../redux/reducers/traits.reducer';
import { TraitArgs } from '../../redux/reducers/monsterBuilder/traits.reducer'
import { MonsterBuilderState } from '../../redux/reducers/monsterBuilder';

import * as Util from '../../util/MonsterTraitUtil';

const TraitSplat = (props: Props) =>
(
    <div>
        <h5>
            {Util.DisplayTraitName(props.trait, props.monster, props.traitArgs)}
            <button style={{float: "right"}} onClick={() => props.onRemoveClicked(props.trait)} value="Remove">Remove</button>
        </h5>
        <p>
            {Util.DisplayTraitDesc(props.trait, props.monster, props.traitArgs)}
        </p>
        {props.trait.EffectiveACModifier != null &&
            (<span>
                {props.trait.EffectiveACModifier > 0 ? "Increase " : "Decrease "}
                the monster's effective AC by {props.trait.EffectiveACModifier}
            </span>)
        }
    </div>
);

export default TraitSplat;

interface Props
{
    trait: Trait
    monster: MonsterBuilderState,
    traitArgs?: TraitArgs,
    onRemoveClicked: (t: Trait) => void
}
