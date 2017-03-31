import * as React from "react";
import { connect } from "react-redux";

import { attributes } from "data";
import * as Actions from "monsterBuilder/actions/actions.actions";
import * as UIActions from "redux/actions/ui.actions";

import { ActionArgType, MonsterAction } from "monsterBuilder/types";
import { getActionArgs, getActionsForMonster, getAllActions, getMonsterBuilderData, GlobalState } from "redux/reducers";
import { ActionTemplate, ActionType, AttackTemplate, isAttack, MonsterActionTemplate,
         MonsterActionType } from "types";
import * as String from "util/String";

import { Action, Fieldset, LabelledItem, Modal } from "common";
import * as fromModal from "common/Modal";

import { defaultActions } from "data/actions";

class OffensesActions extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { showModal: false, clickPosition: undefined };
    }

    public render()
    {
        const actions = this.props.monsterActions.map(a =>
            <Action
                key={a.template.id}
                action={a}
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
        let position: fromModal.Position;
        if (e && e.clientX)
        {
            position = { x: e.clientX, y: e.clientY };
        }
        this.setState({
            showModal: !this.state.showModal,
            clickPosition: position,
        } as State);
    }
};

type AddActionsProps = Props & {toggleModal: (e: any) => void};

// tslint:disable-next-line
class AddActions extends React.Component<AddActionsProps, {templateId: number}>
{
    constructor(props: AddActionsProps)
    {
        super(props);
        this.state = { templateId: undefined };
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
        this.setState({ templateId: parseInt(e.target.value) });

    private handleAddAction = (e: any) =>
    {
        if (this.state.templateId)
        {
            this.props.applyAction(this.state.templateId);
            this.props.toggleModal(e);
        }
    }
};

interface Props
{
    monsterActions: MonsterAction[];
    availableActions: ActionTemplate[];
    fieldsetDecollapsed: {[key: string]: boolean};

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

    return {
        monsterActions,
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
