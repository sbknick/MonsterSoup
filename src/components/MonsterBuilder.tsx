import * as React from "react";
import { Route } from "react-router-dom";

import LoadMonster from "src/components/loadMonster/LoadMonster";
import MonsterStats from "src/components/monsterStats/MonsterStats";
import Nav from "./Nav";


export const MonsterBuilder: React.StatelessComponent<{}> = () =>
(
    <div>
        <Nav />
        {/* <Route path="" component={} /> */}
        <Route path="/edit" component={MonsterStats} />
        <Route path="/load/:sourceType" component={LoadMonster} />
    </div>
);

export default MonsterBuilder;
