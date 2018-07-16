import * as React from "react";
import { Route } from "react-router-dom";

import LoadMonsterSRD from "src/components/loadMonster/LoadMonsterSRD";
import MonsterStats from "src/components/monsterStats/MonsterStats";
import Nav from "./Nav";


export const MonsterBuilder: React.StatelessComponent<{}> = () =>
(
    <div>
        <Nav />
        {/* <Route path="" component={} /> */}
        <Route path="/edit" component={MonsterStats} />
        <Route path="/load/srd" component={LoadMonsterSRD} />
    </div>
);

export default MonsterBuilder;
