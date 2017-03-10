import * as React from "react";

interface Props
{
    value?: any;
    defaultValue?: any;
    onChange?: (e: any) => void;

    options: string[];
}

export const SelectList: React.StatelessComponent<Props> = (props) =>
{
    const options = props.options.map(o => (
        <option key={o} value={o}>{o}</option>
    ));

    return (
        <select defaultValue={props.defaultValue} value={props.value} onChange={props.onChange}>
            {options}
        </select>
    );
};

export default SelectList;
