import React, {Component} from 'react';
import {Group, Number, Select, Button} from 'gui';

import {AngleStep} from 'constants/grids_constants';

export default class GridsGenTool extends Component {
    static defaultProps = {
        onClick: Function.prototype,
    }

    constructor(props) {
        super(props);

        const {
            grids,
            lines,
            shift,
            angle,
        } = this.props;

        this.state = {
            grids,
            lines,
            shift,
            angle,
        };

        this.changeGrids = this.changeGrids.bind(this);
        this.changeShift = this.changeShift.bind(this);
        this.changeLines = this.changeLines.bind(this);
        this.changeAngle = this.changeAngle.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    changeGrids(grids) {
        this.setState({grids});
    }

    changeShift(shift) {
        this.setState({shift});
    }

    changeLines(lines) {
        this.setState({lines});
    }

    changeAngle(angle) {
        this.setState({angle});
    }

    onClick() {
        this.props.onClick(this.state);
    }

    render() {
        return (
            <Group
                label="Generate"
            >
                <Number
                    label="Grids"
                    min={2}
                    step={1}
                    max={10}
                    value={this.state.grids}
                    onChange={this.changeGrids}
                />
                <Number
                    label="Lines"
                    min={1}
                    step={1}
                    max={20}
                    value={this.state.lines}
                    onChange={this.changeLines}
                />
                <Number
                    label="Shift"
                    min={0}
                    max={1}
                    step={0.01}
                    value={this.state.shift}
                    onChange={this.changeShift}
                />
                <Select
                    label="Angle"
                    values={{
                        [AngleStep.RANDOM]: 'Random',
                        [AngleStep.AUTO]: 'Auto',
                    }}
                    selected={this.state.angle}
                    onChange={this.changeAngle}
                />
                <Button
                    label="Generate multigrid"
                    onClick={this.onClick}
                />
            </Group>
        );
    }
}
