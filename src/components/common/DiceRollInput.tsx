import * as React from "react";

import NumberInput from "./NumberInput";

interface Props
{
    diceCount: number;
    dieSize: number;

    diceCountChanged: (n: number) => void;
    dieSizeChanged: (n: number) => void;

    className?: any;
    style?: any;
}

export const DiceRollInput: React.StatelessComponent<Props> = (props) =>
{
    return (
        <div className={props.className} style={props.style}>
            <NumberInput
                min={1}
                max={40}
                value={props.diceCount}
                // onChange={(e: any) => props.diceCountChanged(parseInt(e.target.value))}
                onChange={handleEvent(props.diceCountChanged)}
                onBlur={handleEvent(props.diceCountChanged)}
            />
            d
            <NumberInput
                min={4}
                max={20}
                value={props.dieSize}
                onChange={handleEvent(props.dieSizeChanged)}
                onBlur={handleEvent(props.dieSizeChanged)}
            />
            {props.children}
        </div>
    );
};

function handleEvent(raiseEvent: (n: number) => void): (e: any) => void
{
    return (e: any) =>
    {
        const n = parseInt(e.target.value);
        if (n)
        {
            raiseEvent(n);
        }
    };
}

export default DiceRollInput;
