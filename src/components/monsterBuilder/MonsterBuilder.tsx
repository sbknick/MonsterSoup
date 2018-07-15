import * as React from "react";
import MonsterStats from "src/components/monsterBuilder/MonsterStats";
import Nav from "src/components/Nav";


export const MonsterBuilder: React.StatelessComponent<{}> = () =>
(
    <div>
        <Nav />
        <MonsterStats />
    </div>
);

export default MonsterBuilder;