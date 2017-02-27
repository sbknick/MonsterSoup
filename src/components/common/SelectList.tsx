import * as React from 'react';

export class SelectList extends React.Component<Props, {}>
{
    render()
    {
        let options = this.props.options.map(o => (
            <option key={o} value={o}>{o}</option>
        ));

        return (
            <select defaultValue={this.props.defaultValue} value={this.props.value} onChange={this.props.onChange}>
                {options}
            </select>
        );
    }
}

export default SelectList;

interface Props
{
    value?: any;
    defaultValue?: any;
    onChange?: (e: any) => void;

    options: string[];
}
