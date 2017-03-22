
import { getActionArgs, MonsterBuilderState } from "monsterBuilder/reducers";
import { ActionArgs } from "monsterBuilder/types";
import { ActionTemplate, AttackTemplate } from "types";

const displayAttackText = (attack: AttackTemplate, monster: MonsterBuilderState, actionArgs?: ActionArgs) =>
{
    return "<span class=\"action-name\"></span>";
};
