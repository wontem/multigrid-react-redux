import React from 'react';
import PureComponent from 'shared/components/pure_component';

import GolTools from 'containers/tools/gol_tools';
import CanvasTools from 'containers/tools/canvas_tools';
import GridsTools from 'containers/tools/grids_tools';
import AntTools from 'containers/tools/ant_tools';
import MazeTools from 'containers/tools/maze_tools';
import InteractiveTools from 'containers/tools/interactive_tools';

import './tools_container.sass';

export default class Tools extends PureComponent {
    render() {
        return (
            <div className="tools-container">
                <InteractiveTools />
                <CanvasTools />
                <GridsTools />
                <GolTools />
                <MazeTools />
                <AntTools />
            </div>
        );
    }
}
