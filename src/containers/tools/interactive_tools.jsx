import React, {Component} from 'react';
import {Group, Display} from 'gui';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {currentRibbonIds} from 'selectors/canvas_selectors';
import {gridIds, grids} from 'selectors/grids_selectors';
import {getGridColor} from 'helpers/grids_helpers';

import './interactive_tools.sass';

@connect(createStructuredSelector({
    currentRibbonIds,
    gridIds,
    grids,
}))
export default class InteractiveTools extends Component {
    render() {
        const {
            currentRibbonIds,
            gridIds,
            grids,
        } = this.props;

        const ribbonsMap = new Map(currentRibbonIds);

        const ribbons = gridIds.map(id => {
            const grid = grids.get(id);
            const ribbonId = ribbonsMap.get(id);

            return (
                <div
                    className="interactive-position"
                    style={{
                        borderColor: getGridColor(grid),
                        backgroundColor: getGridColor(grid, 0.3),
                    }}
                    key={id}
                >
                    {ribbonId}
                </div>
            );
        });

        return (
            <Group
                label="Interactive"
            >
                <Display
                    label="Ribbon"
                >
                    <div className="interactive-position-container">
                        {ribbons}
                    </div>
                </Display>
            </Group>
        );
    }
}
