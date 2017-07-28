import * as React from "react";
import { connect } from "react-redux";

import * as Actions from "rdx/actions/monsterBuilder/actions.actions";
import * as UIActions from "rdx/actions/ui.actions";

import { getActionArgs, getActionsForMonster, getAllActions, getMonsterBuilderData, GlobalState } from "rdx/reducers";
import { ActionTemplate, /* ActionType, AttackTemplate, isAttack, MonsterActionTemplate, */
         /* MonsterActionType */ } from "types";
import { ActionArgType, MonsterAction } from "types/monsterBuilder";
import * as Mod from "util/Mod";
import * as String from "util/String";

import { Fieldset, LabelledItem, Modal } from "components/common";
import * as fromModal from "components/common/Modal";
import { Action } from "./Action";

// import { defaultActions } from "data/actions";

class OffensesActions extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { showModal: false, clickPosition: { x: 0, y: 0 } };
    }

    public render()
    {
        const actions = this.props.monsterActions.map(a =>
            <Action
                key={a.template.id}
                action={a}
                statMod={this.props.attackStatMod}
                setActionArgType={this.props.setActionArgType(a.template.id)}
                setActionArg={this.props.setActionArg(a.template.id)}
            />);

        const actionsLegend = "Actions";
        const actionsCollapsed = !this.props.fieldsetDecollapsed[actionsLegend];
        const toggleActionsCollapse = () => this.props.toggleFieldsetCollapse(actionsLegend);

        return (
            <Fieldset
                config={{
                    legend: actionsLegend,
                    isCollapsed: actionsCollapsed,
                    toggleCollapse: toggleActionsCollapse,
                }}
            >
                {actions}

                <button onClick={this.toggleModal}>
                    Add Action
                </button>

                <Modal
                    show={this.state.showModal}
                    position={this.state.clickPosition}
                    onClose={this.toggleModal}
                >
                    <AddActions {...this.props} toggleModal={this.toggleModal} />
                </Modal>
            </Fieldset>
        );
    }

    private toggleModal = (e: any) =>
    {
        const position = e && e.clientX
                    ? { x: e.clientX, y: e.clientY }
                    : { x: 0, y: 0 };

        this.setState({
            showModal: !this.state.showModal,
            clickPosition: position,
        } as State);
    }
}

type AddActionsProps = Props & {toggleModal: (e: any) => void};

// tslint:disable-next-line
class AddActions extends React.Component<AddActionsProps, {templateId: number}>
{
    constructor(props: AddActionsProps)
    {
        super(props);
        this.state = { templateId: 0 };
    }

    public render()
    {
        const availableActions = this.props.availableActions.map(a =>
            <option key={a.id} value={a.id}>{String.titleize(a.name)}</option>);

        return (
            <div>
                <LabelledItem label="Add Action">
                    <select defaultValue="" onChange={this.handleChangeSelectedAction}>
                        <option disabled value="">Select...</option>
                        {availableActions}
                    </select>
                </LabelledItem>
                <button onClick={this.handleAddAction}>Add</button>
                <p></p>
                <button>New Custom Action</button>
                <p></p>
            </div>
        );
    }

    private handleChangeSelectedAction = (e: any) =>
        this.setState({ templateId: parseInt(e.target.value) })

    private handleAddAction = (e: any) =>
    {
        if (this.state.templateId)
        {
            this.props.applyAction(this.state.templateId);
            this.props.toggleModal(e);
        }
    }
}

interface Props
{
    monsterActions: MonsterAction[];
    availableActions: ActionTemplate[];
    fieldsetDecollapsed: {[key: string]: boolean};
    attackStatMod: number;

    applyAction: (actionTemplateId: number) => void;
    toggleFieldsetCollapse: (key: string) => void;
    setActionArgType: (actionTemplateId: number) => (arg: string, argType: ActionArgType) => void;
    setActionArg: (actionTemplateId: number) => (arg: string, argType: ActionArgType, value: string) => void;
}

interface State
{
    showModal: boolean;
    clickPosition: fromModal.Position;
}

function mapStateToProps(state: GlobalState): Props
{
    const actions = getActionsForMonster(state);
    const monsterActions: MonsterAction[] = actions.map(a => ({template: a, args: getActionArgs(state, a)}));
    const appliedActionTemplateIds = monsterActions.map(a => a.template.id);

    const mb = getMonsterBuilderData(state);
    const attackStatMod = Mod.mod((mb.attributes as any)[mb.offenses.primaryAttackStat]);

    return {
        monsterActions,
        attackStatMod,
        availableActions: getAllActions(state).filter(a => appliedActionTemplateIds.indexOf(a.id) === -1),
        fieldsetDecollapsed: state.ui.fieldset.decollapsed,
    } as Props;
}

function mapDispatchToProps(dispatch: any): Props
{
    return {
        applyAction: (actionTemplateId) => dispatch(Actions.applyAction(actionTemplateId)),
        toggleFieldsetCollapse: (key: string) => dispatch(UIActions.toggleFieldsetCollapse(key)),
        setActionArgType: (actionTemplateId) =>
                          (arg, argType) => dispatch(Actions.setActionArgType(actionTemplateId, arg, argType)),
        setActionArg: (actionTemplateId) =>
                      (arg, argType, value) => dispatch(Actions.setActionArg(actionTemplateId, arg, argType, value)),
    } as Props;
}

export default connect(mapStateToProps, mapDispatchToProps)(OffensesActions);
