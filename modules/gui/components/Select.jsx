import React, {PropTypes} from 'react';
import Variable from './_Variable';
import {Row, Label, Select as _Select} from '../common';

export default class Select extends Variable {
    static propTypes = {
        values: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]).isRequired,
        selected: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number,
        ]),
        label: PropTypes.string,
        withConfirm: PropTypes.bool,
        enabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        multiple: PropTypes.bool,
    }

    static defaultProps = {
        withConfirm: false,
        enabled: true,
        multiple: false,
    }

    isChanged() {
        const {inputValue, currentValue} = this.state;
        return !(inputValue.size === currentValue.length && currentValue.every(v => inputValue.has(v)));
    }

    resolve() {
        if (this.isChanged()) {
            const values = [...this.state.inputValue];
            if (this.props.multiple) {
                this.props.onChange(values);
            } else {
                this.props.onChange(values[0]);
            }
        }
    }

    reject() {
        this.handleChange(this.state.currentValue);
    }

    constructor(props) {
        super(props);

        const {selected, multiple} = this.props;

        const currentValue = multiple ? selected : [selected];

        this.state = {
            expanded: false,
            inputValue: new Set(currentValue),
            currentValue,
        };

        this.toggleItem = this.toggleItem.bind(this);
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        this.shrink = this.shrink.bind(this);
        this.expand = this.expand.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    expand() {
        this.setState({
            expanded: true,
        });
    }

    shrink() {
        this.setState({
            expanded: false,
        });
    }

    toggle() {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    handleChange(inputValue) {
        this.setState({
            inputValue: new Set(inputValue),
        }, () => {
            if (this.props.withConfirm === false) {
                this.resolve();
            }
        });
    }

    toggleItem(item) {
        let {inputValue} = this.state;

        if (this.props.multiple) {
            inputValue = new Set(inputValue);

            if (inputValue.has(item)) {
                inputValue.delete(item);
            } else {
                inputValue.add(item);
            }
        } else {
            inputValue = new Set([item]);
            this.shrink();
        }

        this.handleChange(inputValue);
    }

    componentWillReceiveProps({selected, multiple}) {
        const currentValue = multiple ? selected : [selected];
        this.setState({
            inputValue: new Set(currentValue),
            currentValue,
        });
    }

    stringifyCurrentValue() {
        return this.state.currentValue.map(value => this.props.values[value]).join(', ');
    }

    render() {
        const {label, values} = this.props;
        const {inputValue, expanded} = this.state;

        return (
            <Row>
                <Label>{label}</Label>
                <_Select
                    onBlur={this.shrink}
                    onHeadClick={this.toggle}
                    onChange={this.toggleItem}
                    expanded={expanded}
                    values={values}
                    selected={inputValue}
                />
                {this.getConfirmComponent()}
            </Row>
        );
    }
}
