import * as React from "react";
import MonsterStats from "src/components/monsterStats/MonsterStats";
import Nav from "./Nav";


export const MonsterBuilder: React.StatelessComponent<{}> = () =>
(
    <div>
        <Nav />
        <MonsterStats />
    </div>
);

export default MonsterBuilder;