import React, {Component} from 'react';
import {Confirm} from '../common';

export default class Variable extends Component {
    stringifyCurrentValue() {
        return `${this.state.currentValue}`;
    }

    getConfirmComponent() {
        if (this.props.withConfirm) {
            return (
                <Confirm
                    isChanged={this.isChanged()}
                    onConfirm={this.resolve}
                    onDiscard={this.reject}
                >{this.stringifyCurrentValue()}</Confirm>
            );
        } else {
            return null;
        }
    }
}
