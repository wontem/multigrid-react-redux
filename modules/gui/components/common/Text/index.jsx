import React, {Component} from 'react';

export default class Text extends Component {
    render() {
        return (
            <div className="text">
                {this.props.children}
            </div>
        );
    }
}
