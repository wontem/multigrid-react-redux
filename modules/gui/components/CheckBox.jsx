import React, {PropTypes} from 'react';
import Variable from './_Variable';
import {Row, Label, CheckBox as _CheckBox} from '../common';

export default class CheckBox extends Variable {
    static propTypes = {
        value: PropTypes.bool.isRequired,
        label: PropTypes.string,
        withConfirm: PropTypes.bool,
        enabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        withConfirm: false,
        enabled: true,
    }

    constructor(props) {
        super(props);

        const {value} = props;

        this.state = {
            inputValue: value,
            currentValue: value,
            isValid: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.reject = this.reject.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    componentWillReceiveProps({value}) {
        this.setState({
            currentValue: value,
        });
    }

    handleChange(inputValue) {
        this.setState({
            inputValue,
        }, () => {
            if (this.props.withConfirm === false) {
                this.resolve();
            }
        });
    }

    resolve() {
        if (this.isChanged()) {
            this.props.onChange(this.state.inputValue);
        }
    }

    reject() {
        this.handleChange(this.state.currentValue);
    }

    isChanged() {
        const {inputValue, currentValue} = this.state;

        return currentValue !== inputValue;
    }

    render() {
        const {label} = this.props;
        const {inputValue} = this.state;

        return (
            <Row>
                <Label>{label}</Label>
                <_CheckBox
                    inputValue={inputValue}
                    onChange={this.handleChange}
                    onConfirm={this.resolve}
                />
                {this.getConfirmComponent()}
            </Row>
        );
    }
}
