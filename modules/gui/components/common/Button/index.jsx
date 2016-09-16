import React, {Component} from 'react';

export default class Button extends Component {
    render() {
        const {
            label,
            onClick,
            style,
        } = this.props;

        return (
            <div
                className="button"
                onClick={onClick}
                style={style}
            >
                {label}
            </div>
        );
    }
}
