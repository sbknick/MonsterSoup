import * as React from "react";

interface LoadMonsterProps
{
    match: { params: { sourceType: string } };
}

class LoadMonster extends React.Component<LoadMonsterProps, {}>
{
    private monsterType = (() =>
    {
        switch (this.props.match.params.sourceType.toLowerCase())
        {
            case "srd":  return "SRD";
            case "mine": return "My";
            default: return "";
        }
    })();

    public render()
    {
        return (
            <div>
                <h1>Load {this.monsterType} Monster</h1>

                <select>
                    <option key={"Camel"}>Camel</option>
                </select>

                <button>Load</button>
            </div>
        );
    }
}

export default LoadMonster;
