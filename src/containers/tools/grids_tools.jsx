import React, {Component} from 'react';
import {Group, Number} from 'gui';
import GridsGenTool from 'containers/tools/grids_gen_tool';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';

import {grids, gridIds} from 'selectors/grids_selectors';
import {getGridColor} from 'helpers/grids_helpers';
import {
    setShift,
    setInterval,
    setAngle,
    createGrids,
} from 'actions/grids_actions';

import {AngleStep} from 'constants/grids_constants';

@connect(createSelector(
    [grids, gridIds],
    (grids, gridIds) => ({
        grids,
        gridIds,
    })
))
export default class GridsTools extends Component {
    render() {
        const {
            grids,
            gridIds,
        } = this.props;
        const actions = bindActionCreators({
            setShift,
            setInterval,
            setAngle,
            createGrids,
        }, this.props.dispatch);

        const gridGroups = gridIds.map(id => {
            const grid = grids.get(id);
            const {p, phi, interval} = grid;

            return (
                <Group
                    label={`${Math.floor(phi / Math.PI * 180)}`}
                    color={getGridColor(grid)}
                    key={id}
                >
                    <Number
                        label="Angle"
                        value={phi}
                        min={0}
                        max={2 * Math.PI}
                        step={0.01}
                        onChange={angle => actions.setAngle({id, angle})}

                    />
                    <Number
                        label="Interval"
                        value={interval}
                        min={0.1}
                        max={10}
                        step={0.01}
                        onChange={interval => actions.setInterval({id, interval})}

                    />
                    <Number
                        label="Shift"
                        value={p}
                        min={0}
                        max={1}
                        onChange={shift => actions.setShift({id, shift})}

                    />
                </Group>
            );
        });

        return (
            <Group
                label="Grids"
            >
                <GridsGenTool
                    onClick={actions.createGrids}
                    angle={AngleStep.AUTO}
                    shift={0.2}
                    grids={5}
                    lines={10}
                />
                <Group
                    label="Edit"
                >
                    {gridGroups}
                </Group>
            </Group>
        );
    }
}
