import * as React from "react";

import NumberInput from "./NumberInput";

interface Props
{
    diceCount: number;
    dieSize: number;

    useMiscBonus?: boolean;
    miscBonus?: number;

    diceCountChanged: (n: number) => void;
    dieSizeChanged: (n: number) => void;
    miscBonusChanged?: (n: number) => void;


    maxBonus?: number;
    minBonus?: number;
    maxCount?: number;
    minCount?: number;
    minSize?: number;
    maxSize?: number;

    containerType?: string;
    className?: any;
    style?: any;
}

export const DiceRollInput: React.StatelessComponent<Props> = (props) =>
{
    const Container = props.containerType || "div";
    return (
        <Container className={props.className} style={props.style}>
            <NumberInput
                min={props.minCount || 1}
                max={props.maxCount || 40}
                value={props.diceCount}
                // onChange={(e: any) => props.diceCountChanged(parseInt(e.target.value))}
                onChange={handleEvent(props.diceCountChanged)}
                onBlur={handleEvent(props.diceCountChanged)}
            />
            d
            <NumberInput
                min={props.minSize || 4}
                max={props.maxSize || 20}
                value={props.dieSize}
                onChange={handleEvent(props.dieSizeChanged)}
                onBlur={handleEvent(props.dieSizeChanged)}
            />
            {props.useMiscBonus && (
                <span>+
                    <NumberInput
                        min={props.minBonus || -20}
                        max={props.maxBonus || 20}
                        value={props.miscBonus}
                        onChange={handleEvent(props.miscBonusChanged)}
                        onBlur={handleEvent(props.miscBonusChanged)}
                    />
                </span>
            )}
            {props.children}
        </Container>
    );
};

function handleEvent(raiseEvent: (n: number) => void): (e: any) => void
{
    return (e: any) =>
    {
        const n = parseInt(e.target.value);
        if (!Number.isNaN(n))
        {
            raiseEvent(n);
        }
    };
}

export default DiceRollInput;
