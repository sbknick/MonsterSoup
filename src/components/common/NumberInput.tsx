import * as React from 'react';

const DEFAULT_NUMBER_FORMAT = '0,0[.][00]';

interface NumberInputProps
{
  value: number;
  format?: string;
  min?: number;
  max?: number;

  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onChange?: (e: any) => void;
}

const DEFAULT_PROPS: NumberInputProps = {
  value: null,
  format: DEFAULT_NUMBER_FORMAT,

  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {}
};

interface NumberInputState
{
  focused: boolean;
  value: number;
}

class NumberInput extends React.Component<NumberInputProps, NumberInputState>
{
  constructor(props: NumberInputProps)
  {
    super(props);
    const value = this.parseNumber(this.props.value);

		// focused: keep track of the input's focus state
		// numeral: keep track of the input's current value (numeral object)
		this.state = {
			focused: false,
			value: value
		}

		this.onChange = this.onChange.bind(this)
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
  }

	componentWillReceiveProps(props: NumberInputProps)
  {
		// Prevent changing the value via external entry when editing.
		if (!this.state.focused && 'value' in props) {
			// const value = parseNumber(props.value)
			// this.setState({ value: isNumber(value) ? value : '' })
      this.setState({ value: props.value } as NumberInputState);
		}
	}

	// componentDidMount() {
	// 	// focused: check if component is focused after mounting and set state
	// 	this.setState({
	// 		focused: global.document.activeElement === this.refs.input
	// 	} as NumberInputState);
	// }

  onChange(e: any)// React.FormEvent<HTMLInputElement>)
  {
    e.persist();
    this.setState(
      {
        value: e.target.value
      } as NumberInputState,
      () => this.props.onChange(e));
  }

  onBlur(e: any)
  {
    e.persist();
		let n = e.target.value as number;

		// If given value is lower than minimum, set the value to minimum
		if (n && 'min' in this.props && n < this.props.min)
    {
			n = this.props.min;
		}

		// If given value is greater than maximum, set the value to maximum
		if (n && 'max' in this.props && n > this.props.max)
    {
			n = this.props.max;
		}

		// Set the event target value to corrected value
		e.target.value = n;

		this.setState(
			{
				focused: false,
				value: n ? (n as any).format(this.props.format) : ''
			} as NumberInputState,
			() => this.props.onBlur(event)
		)
  }

  onFocus(e: any)
  {
    e.persist();
    const n = e.target.value as number;
    this.setState({
        focused: true,
        value: n
      } as NumberInputState,
    () => this.props.onFocus(e));
  }

  parseNumber(value: number): number
  {
    return 0;
  }

  valueAsFormatted(): any
  {}

  render() {
    const value = this.state.focused ? this.state.value : this.valueAsFormatted();

    return React.createElement(
      'input',
      Object.assign({}, this.props, {
        ref: 'input',
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        value: value
      })
    );
  }
}

export default NumberInput;
