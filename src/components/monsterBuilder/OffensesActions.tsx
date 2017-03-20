import * as React from "react";
import { connect } from "react-redux";

import { attributes } from "data";
import * as Actions from "monsterBuilder/actions/offenses.actions";
import { Action, ActionType, Attack, isAttack, MonsterAction, MonsterActionType } from "monsterBuilder/types";
import { getMonsterBuilderData, GlobalState } from "redux/reducers";

import { Fieldset, Modal } from "common";
import * as fromModal from "common/Modal";

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
        return (
            <Fieldset legend="Actions">
                <ActionSplats {...this.props} />

                <div>
                    <button onClick={this.toggleModal}>
                        Add Action
                    </button>
                </div>

                <Modal show={this.state.showModal}
                       position={this.state.clickPosition}
                       onClose={() => this.toggleModal(null)}>
                       <p>Hi, I'm a modal!</p>
                       <button onClick={this.toggleModal}>
                            New Custom Action
                       </button>
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

const ActionSplats: React.StatelessComponent<Props> = (props) =>
{
    const actions: ReadonlyArray<MonsterAction> = [
        {
            type: MonsterActionType.None,
            name: "Bloom",
            description: "This unit can open up and squirt pollen at things.",
            actionType: ActionType.Action,
        },
        {
            type: MonsterActionType.None,
            name: "Action Name",
            description: "Action Description",
            actionType: ActionType.Action,
        },
        {
            type: MonsterActionType.Attack,
            name: "Attack Name",
            description: "Attack Description",
            actionType: ActionType.Action,

            damageDiceCount: 2,
            damageDieSize: 8,
        },
    ];

    const splats = actions.map(a => {
        let Component = null;

        if (isAttack(a))
        {
            Component = AttackSplat;
        }
        else
        {
            Component = ActionSplat;
        }

        return <Component {...a} />;
    });

    return (
        <div className="container">
            {splats}
        </div>
    );
};

const AttackSplat: React.StatelessComponent<Attack> = (attack) =>
(
    <ActionSplat {...attack}>
        <p>{attack.damageDiceCount}d{attack.damageDieSize}</p>
        {isAttack(attack) ? "Attack" : "Action"}
    </ActionSplat>
);

const ActionSplat: React.StatelessComponent<Action> = (action) =>
(
    <div>
        <h5>{action.name}.</h5>
        <p>{action.description}</p>
        {isAttack(action) ? "Attack" : "Action"}
        {action.children}
    </div>
);

// function isAttack(action: Action): boolean
// {
//     return (action as Attack).damageDieSize !== undefined;
// }

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
    return {

    } as Props;
}

export default connect(mapStateToProps)(OffensesActions);
