import React from 'react';
import PureComponent from 'shared/components/pure_component';

import TilesLayer from 'containers/layers/tiles_layer';
import InteractiveTilesLayer from 'containers/layers/interactive_tiles_layer';

import {LayerComponents} from 'constants/canvas_constants';

export default class TilesGroup extends PureComponent {
    render() {
        const CurrentLayer = LayerComponents[this.props.currentLayer];
        const currentLayer = CurrentLayer ? (
            <CurrentLayer />
        ) : null;

        return (
            <div>
                <TilesLayer />
                {currentLayer}
                <InteractiveTilesLayer />
            </div>
        );
    }
}
