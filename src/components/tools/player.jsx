import React, {Component, PropTypes} from 'react';
import {Group, CheckBox, Number} from 'gui';

export default class Player extends Component {
    static propTypes = {
        onIteration: PropTypes.func.isRequired,
        label: PropTypes.string,
        expanded: PropTypes.bool,
        minDelay: PropTypes.number,
        maxDelay: PropTypes.number,
        stepDelay: PropTypes.number,
        delay: PropTypes.number,
    }

    static defaultProps = {
        label: 'Player',
        minDelay: 100,
        maxDelay: 1000,
        stepDelay: 50,
        delay: 100,
    }

    constructor(props) {
        super(props);

        this.state = {
            intervalId: null,
            delay: this.props.delay,
        };

        this.toggle = this.toggle.bind(this);
        this.setInterval = this.setInterval.bind(this);
        this.onIteration = this.onIteration.bind(this);
    }

    isPlaying() {
        return this.state.intervalId !== null;
    }

    play() {
        const intervalId = setInterval(this.onIteration, this.state.delay);
        this.setState({
            intervalId,
        });
    }

    stop() {
        this._clearInterval();
        this.setState({
            intervalId: null,
        });
    }

    toggle(willPlay) {
        if (willPlay) {
            this.play();
        } else {
            this.stop();
        }
    }

    _clearInterval() {
        clearInterval(this.state.intervalId);
    }

    setInterval(delay) {
        const isPlaying = this.isPlaying();

        if (isPlaying) {
            this._clearInterval();
        }

        this.setState({
            delay,
        }, () => {
            if (isPlaying) {
                this.play();
            }
        });
    }

    onIteration() {
        this.props.onIteration();
    }

    componentWillUnmount() {
        if (this.isPlaying()) {
            this._clearInterval();
        }
    }

    render() {
        const {minDelay, maxDelay, stepDelay, label, expanded} = this.props;
        const isPlaying = this.isPlaying();

        return (
            <Group
                label={label}
                expanded={expanded}
            >
                <Number
                    label="Delay"
                    min={minDelay}
                    max={maxDelay}
                    step={stepDelay}
                    value={this.state.delay}
                    onChange={this.setInterval}
                />
                <CheckBox
                    label={isPlaying ? 'Playing' : 'Paused'}
                    value={isPlaying}
                    onChange={this.toggle}
                />
            </Group>
        );
    }
}
