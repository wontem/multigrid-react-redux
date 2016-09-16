import React, {Component} from 'react';
import {Row, Label} from '../common';

export default class Display extends Component {
    render() {
        const {label, children} = this.props;

        return (
            <Row>
                <Label>{label}</Label>
                <div>{children}</div>
            </Row>
        );
    }
}
