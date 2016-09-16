import React, {Component} from 'react';

export default class TrackBar extends Component {
    constructor(props) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    getValue({clientX}) {
        const {min, max} = this.props;
        const rect = this.refs.container.getBoundingClientRect();
        const perc = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        return perc * (max - min) + min;
    }

    handleMouseDown(e) {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        const value = this.getValue(e);
        this.props.onChange(value);
    }

    handleMouseUp() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseMove(e) {
        const value = this.getValue(e);
        this.props.onChange(value);
    }

    render() {
        const {min, max, value} = this.props;
        const percents = (value - min) / (max - min);
        return (
            <div className="trackbar">
                <div className="bar"
                    onMouseDown={this.handleMouseDown}
                    ref="container"
                >
                    <div className="progress" style={{width: `${percents * 100}%`}}></div>
                </div>
            </div>
        );
    }
}
