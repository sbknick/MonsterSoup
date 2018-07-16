import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "src/rdx/actions/monsterStats/traits.actions";
import { getAllTraits, getAppliedTraitIds, GlobalState } from "src/rdx/reducers";
import { getTraitArgs, MonsterBuilderState } from "src/rdx/reducers/monsterStats";
import { TraitTemplate } from "src/types";

import { OptionEvent } from "src/components/common";
import TraitSplat from "./TraitSplat";


class Traits extends React.Component<Props, {selectedTraitId: number}>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {selectedTraitId: 0};

        this.setSelectedTraitId = this.setSelectedTraitId.bind(this);
        this.handleAddTrait = this.handleAddTrait.bind(this);
    }

    public render()
    {
        const traitSplats = this.props.appliedTraits.map(t =>
            <TraitSplat key={t.id}
                        monster={this.props.monster}
                        trait={t}
                        traitArgs={getTraitArgs(this.props.monster, t)}
                        onRemoveClicked={this.props.removeTrait} />,
        );

        const traitOptions = this.props.availableTraits.map(t => (
            <option key={t.id} value={t.id} title={t.desc}>{t.name}</option>
        ));

        const handleTraitChanged = (e: OptionEvent) => this.setSelectedTraitId(Number(e.currentTarget.value));

        return (
            <div>
                {traitSplats}
                <div>
                    <select value={this.state.selectedTraitId}
                            onChange={handleTraitChanged}>
                        <option disabled={true} value={0}> -- select an option -- </option>
                        {traitOptions}
                    </select>
                    <button onClick={this.handleAddTrait}
                        disabled={this.state.selectedTraitId === 0}
                        >Add Trait</button>
                </div>
            </div>
        );
    }

    private setSelectedTraitId(id: number)
    {
        this.setState({selectedTraitId: id});
    }

    private handleAddTrait()
    {
        if (this.props.applyTrait === undefined) return;

        this.props.applyTrait(this.state.selectedTraitId);
        this.setSelectedTraitId(0);
    }
}

interface Props
{
    allTraits: TraitTemplate[];
    availableTraits: TraitTemplate[];
    appliedTraits: TraitTemplate[];
    monster: MonsterBuilderState;

    applyTrait?: (id: number) => void;
    removeTrait: (t: TraitTemplate) => void;
}

function mapStateToProps(state: GlobalState): Props
{
    const props: any = {
        allTraits: [],
        availableTraits: [],
        appliedTraits: [],
    };

    props.monster = state.entities.monsterBuilder;

    const allTraits = getAllTraits(state);
    const myTraitIds = getAppliedTraitIds(state);

    allTraits.reduce((acc, tr) =>
    {
        if (myTraitIds.indexOf(tr.id) !== -1)
            acc.appliedTraits.push(tr);
        else
            acc.availableTraits.push(tr);

        acc.allTraits.push(tr);

        return acc;
    }, props);

    return props as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
        applyTrait: (id: number) => dispatch(Actions.applyTrait(id)),
        removeTrait: (t: TraitTemplate) => dispatch(Actions.removeTrait(t.id)),
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Traits);
