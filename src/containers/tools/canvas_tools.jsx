import React, {Component} from 'react';
import {Group, Select, Number} from 'gui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';

import {Layers} from 'constants/canvas_constants';
import {currentLayer, linesScale, tilesScale} from 'selectors/canvas_selectors';
import {setCurrentLayer, scaleLines, scaleTiles} from 'actions/canvas_actions';

@connect(createSelector(
    [currentLayer, linesScale, tilesScale],
    (currentLayer, linesScale, tilesScale) => ({
        currentLayer,
        linesScale,
        tilesScale,
    })
))
export default class CanvasTools extends Component {
    render() {
        const {
            currentLayer,
            linesScale,
            tilesScale,
        } = this.props;
        const actions = bindActionCreators({
            setCurrentLayer,
            scaleLines,
            scaleTiles,
        }, this.props.dispatch);

        return (
            <Group
                label="Canvas"
                expanded
            >
                <Select
                    label="Current layer"
                    values={{
                        [Layers.TILES]: 'Tiles',
                        [Layers.GOL]: 'Game of life',
                        [Layers.PATH]: 'Path',
                        [Layers.MAZE]: 'Maze',
                        [Layers.ANT]: 'Turmites',
                    }}
                    selected={currentLayer}
                    onChange={actions.setCurrentLayer}
                />
                <Number
                    label="Lines scale"
                    value={linesScale}
                    min={10}
                    max={100}
                    step={5}
                    onChange={actions.scaleLines}
                />
                <Number
                    label="Tiles scale"
                    value={tilesScale}
                    min={10}
                    max={100}
                    step={5}
                    onChange={actions.scaleTiles}
                />
            </Group>
        );
    }
}
