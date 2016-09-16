import React, {PropTypes, Component} from 'react';
import {Row, Label, KeyHandler as _KeyHandler} from '../common';

export default class KeyHandler extends Component {
    static propTypes = {
        label: PropTypes.string,
        handler: PropTypes.func.isRequired,
        filter: PropTypes.func,
    }

    render() {
        const {label, handler, filter} = this.props;

        return (
            <Row>
                <Label>{label}</Label>
                <_KeyHandler
                    handler={handler}
                    filter={filter}
                />
            </Row>
        );
    }
}
