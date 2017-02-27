import * as React from 'react';

import { Trait } from '../../redux/reducers/traits.reducer';
import { TraitArgs } from '../../redux/reducers/monsterBuilder/traits.reducer'
import { MonsterBuilderState } from '../../redux/reducers/monsterBuilder';

import * as Util from '../../util/MonsterTraitUtil';

const TraitSplat: React.StatelessComponent<Props> = (props: Props) =>
(
    <div>
        <h5>
            {Util.displayTraitName(props.trait, props.monster, props.traitArgs)}
            <button style={{float: "right"}} value="Remove"
                    onClick={() => props.onRemoveClicked(props.trait)}>
                Remove
            </button>
        </h5>
        <p>
            {Util.displayTraitDesc(props.trait, props.monster, props.traitArgs)}
        </p>

        {props.trait.effectiveACModifier != null &&
            (<p style={{fontSize: ".8em", fontStyle: "italic"}}>
                {props.trait.effectiveACModifier > 0 ? "Increase " : "Decrease "}
                the monster's effective AC by {props.trait.effectiveACModifier}
            </p>)
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