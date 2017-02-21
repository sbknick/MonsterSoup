import * as React from 'react';

import { Trait } from '../../redux/reducers/traits.reducer';


const TraitSplat = (props: {trait: Trait}) =>
(
    <div>
        <h5>{props.trait.Name}</h5>
        <p>{props.trait.Desc}</p>
        {props.trait.EffectiveACModifier != null &&
            (<span>
                {props.trait.EffectiveACModifier > 0 ? "Increase " : "Decrease "}
                the monster's effective AC by {props.trait.EffectiveACModifier}
            </span>)
        }
    </div>
);

export default TraitSplat;
