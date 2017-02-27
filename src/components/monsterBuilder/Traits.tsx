import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState, getAllTraits, getAppliedTraitIds } from '../../redux/reducers';
import { MonsterBuilderState, getTraitArgs } from '../../redux/reducers/monsterBuilder';
import { Trait } from '../../redux/reducers/traits.reducer';
import * as Actions from '../../redux/actions/monsterBuilder/traits.actions';

import TraitSplat from './TraitSplat';


class Traits extends React.Component<Props, {selectedTraitId: number}>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {selectedTraitId: 0};

        this.setSelectedTraitId = this.setSelectedTraitId.bind(this);
        this.handleAddTrait = this.handleAddTrait.bind(this);
    }

    render()
    {
        var traitSplats = this.props.appliedTraits.map(t =>
            <TraitSplat key={t.id}
                        monster={this.props.monster}
                        trait={t}
                        traitArgs={getTraitArgs(this.props.monster, t)}
                        onRemoveClicked={this.props.removeTrait} />
        );

        var traitOptions = this.props.availableTraits.map(t => <option key={t.id} value={t.id} title={t.desc}>{t.name}</option>);

        return (
            <div>
                {traitSplats}
                <div>
                    <select value={this.state.selectedTraitId} onChange={(e: any) => this.setSelectedTraitId(Number(e.target.value))}>
                        <option disabled value={0}> -- select an option -- </option>
                        {traitOptions}
                    </select>
                    <button onClick={this.handleAddTrait}
                        disabled={this.state.selectedTraitId == 0}
                        >Add Trait</button>
                </div>
            </div>
        );
    }

    private setSelectedTraitId(id: number)
    {
        this.setState({selectedTraitId: id});
    }

    private handleAddTrait(e: any)
    {
        this.props.applyTrait(this.state.selectedTraitId)
        this.setSelectedTraitId(0);
    }
}

interface Props
{
    allTraits: Trait[];
    availableTraits: Trait[];
    appliedTraits: Trait[];
    monster: MonsterBuilderState;

    applyTrait?: (id: number) => void;
    removeTrait: (t: Trait) => void;
}

function mapStateToProps(state: GlobalState) : Props
{
    var props: Props = {
        allTraits: [],
        availableTraits: [],
        appliedTraits: []
    } as Props;

    props.monster = state.entities.monsterBuilder;

    var allTraits = getAllTraits(state);
    var myTraitIds = getAppliedTraitIds(state);

    allTraits.reduce((acc, tr) =>
    {
        if (myTraitIds.indexOf(tr.id) != -1)
            acc.appliedTraits.push(tr);
        else
            acc.availableTraits.push(tr);

        acc.allTraits.push(tr);

        return acc;
    }, props);

    return props;
}

function mapDispatchToProps(dispatch: any) : Props
{
    return {
        applyTrait: (id: number) => dispatch(Actions.applyTrait(id)),
        removeTrait: (t: Trait) => dispatch(Actions.removeTrait(t.id))
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Traits);