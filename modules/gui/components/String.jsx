import React, {PropTypes, Component} from 'react';
import {Row, Label, Input, Confirm} from '../common';

//TODO: add prop for custorm validation
export default class String extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
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
        const {inputValue, currentValue} = this.state;

        return (
            <Row>
                <Label>{label}</Label>
                <Input
                    inputValue={inputValue}
                    onChange={this.handleChange}
                    onConfirm={this.resolve}
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
