import * as React from "react";

import { MonsterBuilderState } from "monsterBuilder/reducers";
import { TraitArgs } from "monsterBuilder/types";
import { TraitTemplate } from "types";

import * as Util from "util/MonsterTraitUtil";

interface Props
{
    trait: TraitTemplate;
    monster: MonsterBuilderState;
    traitArgs?: TraitArgs;
    onRemoveClicked: (t: TraitTemplate) => void;
}

const TraitSplat: React.StatelessComponent<Props> = (props) =>
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
