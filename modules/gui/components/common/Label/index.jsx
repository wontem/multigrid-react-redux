import React, {Component} from 'react';

export default class Label extends Component {
    render() {
        return (
            <div className="label">
                {this.props.children}
            </div>
        );
    }
}
