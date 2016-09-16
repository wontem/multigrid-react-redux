import React, {PropTypes, Component} from 'react';
import {Row, Label, TrackBar, Input, Confirm} from '../common';

function numDecimals(value) {
    value = value.toString();

    if (value.indexOf('.') > -1) {
        return value.length - value.indexOf('.') - 1;
    }

    return 0;
}

function precise(value, precision) {
    const dec = Math.pow(10, precision);
    return Math.round(value * dec) / dec;
}

function validate(value) {
    if (typeof value !== 'number') {
        value = parseFloat(value);
    }

    if (isNaN(value)) {
        return false;
    }

    return true;
}

function clamp(min, max, value) {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

function quantize(step, value) {
    if (value % step != 0) {
        value = Math.round(value / step) * step;
    }

    return value;
}

function parse(min, max, step, precision, value) {
    value = parseFloat(value);
    value = clamp(min, max, value);
    value = quantize(step, value);

    return precise(value, precision);
}

function getStep(step, value) {
    if (step === undefined) {
        step = value === 0 ? 1 : Math.pow(10, Math.floor(Math.log(Math.abs(value))/Math.LN10) - 1);
    }

    return step;
}

export default class Number extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        step: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        label: PropTypes.string,
        withConfirm: PropTypes.bool,
        enabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        withConfirm: false,
        enabled: true,
        min: -Infinity,
        max: Infinity,
    }

    constructor(props) {
        super(props);

        const {value} = props;
        const step = getStep(this.props.step, value);

        this.state = {
            step,
            precision: numDecimals(step),
            inputValue: value,
            currentValue: value,
            lastValid: value,
            isValid: true,
        };

        this.handleTrackpadChange = this.handleTrackpadChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.reject = this.reject.bind(this);
        this.resolve = this.resolve.bind(this);
        this.setLastValid = this.setLastValid.bind(this);
    }

    componentWillReceiveProps({value}) {
        this.setState({
            currentValue: value,
        });

        if (!this.props.withConfirm) {
            this.setState({
                inputValue: value,
                lastValid: value,
                isValid: true,
            });
        }
    }

    handleTrackpadChange(value) {
        const {min, max} = this.props;
        const {step, precision} = this.state;

        value = parse(min, max, step, precision, value);

        this.handleChange(value);
    }

    handleChange(inputValue) {
        const isValid = validate(inputValue);

        const {min, max} = this.props;
        const {step, precision} = this.state;

        const lastValid = isValid ?
            parse(min, max, step, precision, inputValue) :
            this.state.lastValid;

        this.setState({
            inputValue,
            isValid,
            lastValid,
        }, () => {
            if (this.props.withConfirm === false) {
                this.resolve();
            }
        });

    }

    setLastValid() {
        this.setState({
            inputValue: this.state.lastValid,
        });
    }

    resolve() {
        if (this.state.isValid) {
            if (this.isChanged()) {
                this.props.onChange(this.state.lastValid);
            }
        }
    }

    reject() {
        this.handleChange(this.state.currentValue);
    }

    isChanged() {
        const {lastValid, currentValue} = this.state;
        return currentValue !== lastValid;
    }

    render() {
        const {min, max, label} = this.props;
        const {inputValue, lastValid, currentValue, isValid} = this.state;

        let trackBar;

        if (isFinite(min) && isFinite(max)) {
            trackBar = (
                <TrackBar
                    value={lastValid}
                    min={min}
                    max={max}
                    onChange={this.handleTrackpadChange}
                />
            );
        }

        return (
            <Row>
                <Label>{label}</Label>
                {trackBar}
                <Input
                    isValid={isValid}
                    inputValue={inputValue}
                    onChange={this.handleChange}
                    onConfirm={this.resolve}
                    onBlur={this.setLastValid}
                />
                <Confirm
                    isChanged={this.isChanged()}
                    onConfirm={this.resolve}
                    onDiscard={this.reject}
                >{`${currentValue}`}</Confirm>
            </Row>
        );
    }
}
