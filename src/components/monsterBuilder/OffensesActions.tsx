import * as React from "react";
import { connect } from "react-redux";

import { attributes } from "data";
import * as Actions from "monsterBuilder/actions/offenses.actions";
import { MonsterAction } from "monsterBuilder/types";
import { getActionArgs, getActionsForMonster, getMonsterBuilderData, GlobalState } from "redux/reducers";
import { ActionTemplate, ActionType, AttackTemplate, isAttack, MonsterActionTemplate,
         MonsterActionType } from "types";

import { Action, Fieldset, LabelledItem, Modal } from "common";
import * as fromModal from "common/Modal";

import { defaultActions } from "data/actions";

class OffensesActions extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = { showModal: false, clickPosition: undefined };

        this.toggleModal = this.toggleModal.bind(this);
    }

    public render()
    {
        const action: MonsterAction = {
            template: defaultActions[1],
            args: {shortName: "naaame", damage: "lots", attackBonus: "+4"},
        };

        const actions = this.props.monsterActions.map(a =>
            <Action key={a.template.id} action={a} />);

        return (
            <Fieldset legend="Actions">
                <Action action={action} />
                {actions}
                {/*<ActionSplats {...this.props} />*/}

                <div>
                    <button onClick={this.toggleModal}>
                        Add Action
                    </button>
                </div>

                <Modal show={this.state.showModal}
                       position={this.state.clickPosition}
                       onClose={() => this.toggleModal(null)}>
                    <LabelledItem label="Add Action">
                        <select>
                        </select>
                    </LabelledItem>
                    <button>Add</button>
                    <p></p>
                    <button onClick={this.toggleModal}>
                        New Custom Action
                    </button>
                    <p></p>
                </Modal>
            </Fieldset>
        );
    }

    private toggleModal(e: any): void
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

// const ActionSplats: React.StatelessComponent<Props> = (props) =>
// {
//     // const actions: ReadonlyArray<MonsterActionTemplate> = [
//     //     {
//     //         id: 1,
//     //         type: MonsterActionType.None,
//     //         name: "Bloom",
//     //         description: "This unit can open up and squirt pollen at things.",
//     //         actionType: ActionType.Action,
//     //     },
//     //     {
//     //         id: 2,
//     //         type: MonsterActionType.None,
//     //         name: "Action Name",
//     //         description: "Action Description",
//     //         actionType: ActionType.Action,
//     //     },
//     //     {
//     //         id: 3,
//     //         type: MonsterActionType.Attack,
//     //         name: "Attack Name",
//     //         description: "Attack Description",
//     //         actionType: ActionType.Action,
//     //
//     //         damageDiceCount: 2,
//     //         damageDieSize: 8,
//     //     },
//     // ];
//
//     const splats = props.monsterActions.map(a => {
//         let Component = null;
//
//         if (isAttack(a.template))
//         {
//             Component = AttackSplat;
//         }
//         else
//         {
//             Component = ActionSplat;
//         }
//
//         return <Component {...a} />;
//     });
//
//     return (
//         <div className="container">
//             {splats}
//         </div>
//     );
// };
//
// const AttackSplat: React.StatelessComponent<AttackTemplate> = (attack) =>
// (
//     <ActionSplat {...attack}>
//         <p>{attack.damageDiceCount}d{attack.damageDieSize}</p>
//         {isAttack(attack) ? "Attack" : "Action"}
//     </ActionSplat>
// );
//
// const ActionSplat: React.StatelessComponent<ActionTemplate> = (action) =>
// (
//     <div>
//         <h5>{action.name}.</h5>
//         <p>{action.description}</p>
//         {isAttack(action) ? "Attack" : "Action"}
//         {action.children}
//     </div>
// );

interface Props
{
    monsterActions: MonsterAction[];
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

    return {
        monsterActions,
    } as Props;
}

export default connect(mapStateToProps)(OffensesActions);
