import * as React from "react";

import { MonsterBuilderState } from "src/rdx/reducers/monsterBuilder";
import { TraitTemplate } from "src/types";
import { TraitArgs } from "src/types/monsterBuilder";

import * as Util from "src/util/MonsterTraitUtil";

interface Props
{
    trait: TraitTemplate;
    monster: MonsterBuilderState;
    traitArgs?: TraitArgs;
    onRemoveClicked: (t: TraitTemplate) => void;
}

const TraitSplat: React.StatelessComponent<Props> = (props) =>
{
    const handleRemoveClicked = () => props.onRemoveClicked(props.trait);

    return (
        <div>
            <h5>
                {Util.displayTraitName(props.trait, props.monster, props.traitArgs)}
                <button style={{float: "right"}} value="Remove"
                        onClick={handleRemoveClicked}>
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
};

export default TraitSplat;
