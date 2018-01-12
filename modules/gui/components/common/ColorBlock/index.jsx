import React, {Component} from 'react';

export default class ColorBlock extends Component {
    render() {
        return (
            <div
                className="color"
                style={{
                    backgroundColor: this.props.color,
                }}
            ></div>
        );
    }
}
