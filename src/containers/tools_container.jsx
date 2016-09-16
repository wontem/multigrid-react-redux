import React from 'react';
import PureComponent from 'shared/components/pure_component';

import GolTools from 'containers/tools/gol_tools';
import CanvasTools from 'containers/tools/canvas_tools';
import GridsTools from 'containers/tools/grids_tools';
import AntTools from 'containers/tools/ant_tools';

export default class Tools extends PureComponent {
    render() {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 400,
            }}>
                <CanvasTools />
                <GridsTools />
                <GolTools />
                <AntTools />
            </div>
        );
    }
}
