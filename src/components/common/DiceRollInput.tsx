import * as React from "react";

import { InputEvent } from ".";
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
    
    const handleEvent = (raiseEvent: (n: number) => void) => (e: InputEvent) =>
    {
        const n = parseInt(e.currentTarget.value);
        if (!Number.isNaN(n))
        {
            raiseEvent(n);
        }
    };

    return (
        <Container className={props.className} style={props.style}>
            <NumberInput
                min={props.minCount || 1}
                max={props.maxCount || 40}
                value={props.diceCount}
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
                        value={props.miscBonus || 0}
                        onChange={props.miscBonusChanged && handleEvent(props.miscBonusChanged)}
                        onBlur={props.miscBonusChanged && handleEvent(props.miscBonusChanged)}
                    />
                </span>
            )}
            {props.children}
        </Container>
    );
};

export default DiceRollInput;
