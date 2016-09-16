import React, {PropTypes, Component} from 'react';
import {Row, Button as _Button} from '../common';

export default class Button extends Component {
    static propTypes = {
        label: PropTypes.string,
        enabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        style: PropTypes.object,
    }

    static defaultProps = {
        enabled: true,
        style: {},
    }

    render() {
        const {label, onClick, style} = this.props;

        return (
            <Row>
                <_Button
                    label={label}
                    onClick={onClick}
                    style={style}
                />
            </Row>
        );
    }
}
