import './ant_tools.sass';

import React, {Component} from 'react';
import {Group, Button, Display, KeyHandler} from 'gui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';

import Player from 'components/tools/player';

import {updateAnts, clear, setTurns} from 'actions/ant_actions';

import {intersections, neighbours, grids} from 'selectors/grids_selectors';
import {colors, field, turmites, turnColors} from 'selectors/ant_selectors';

import {TurnDirections} from 'constants/ant_constants';

const TurnDirectionLabels = {
    [TurnDirections.CW]: 'right',
    [TurnDirections.CCW]: 'left',
};

const KeyMap = {
    37: TurnDirections.CCW,
    39: TurnDirections.CW,
};

@connect(createSelector(
    [intersections, neighbours, grids, colors, field, turmites, turnColors],
    (intersections, neighbours, grids, colors, field, turmites, turnColors) => ({
        intersections,
        neighbours,
        grids,
        colors,
        turnColors,
        field,
        turmites,
    })
))
export default class AntTools extends Component {
    render() {
        const actions = bindActionCreators({
            updateAnts: () => {
                const {intersections, neighbours, grids, colors, field, turmites} = this.props;
                return updateAnts(intersections, neighbours, grids, colors, field, turmites);
            },
            clear: () => {
                return clear();
            },
            setTurns,
        }, this.props.dispatch);

        //TODO: think about layout
        const {turnColors, colors} = this.props;
        const colorItems = colors.reduce((colorItems, turnDirection, id) => {
            return colorItems.concat(
                <div
                    className="turn-tag"
                    key={id}
                    style={{
                        backgroundColor: turnColors.get(id),
                    }}
                >
                    {TurnDirectionLabels[turnDirection]}
                </div>
            );
        }, []);

        return (
            <Group
                label="Turmites"
            >
                <Group
                    label="Colors"
                    expanded
                >
                    <Display
                        label="Current"
                    >
                        {colorItems}
                    </Display>
                    <KeyHandler
                        label="Change"
                        handler={keyCodes => {
                            actions.setTurns(keyCodes.map(keyCode => KeyMap[keyCode]));
                        }}
                    />
                </Group>
                <Player
                    onIteration={actions.updateAnts}
                    minDelay={0}
                    expanded
                />
                <Button
                    label="Move ants"
                    onClick={actions.updateAnts}
                />
                <Button
                    label="Clear"
                    onClick={actions.clear}
                />
            </Group>
        );
    }
}
