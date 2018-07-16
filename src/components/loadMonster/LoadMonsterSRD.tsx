import * as React from "react";

class LoadMonsterSRD extends React.Component<{}, {}>
{
    public render()
    {
        return (
            <div>
                <h1>Load SRD Monster</h1>

                <select>
                    <option key={"Camel"}>Camel</option>
                </select>

                <button>Load</button>
            </div>
        );
    }
}

export default LoadMonsterSRD;
