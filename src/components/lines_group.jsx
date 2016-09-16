import React from 'react';
import PureComponent from 'shared/components/pure_component';

import LinesLayer from 'containers/layers/lines_layer';
import InteractiveLinesLayer from 'containers/layers/interactive_lines_layer';

export default class LinesGroup extends PureComponent {
    render() {
        return (
            <div>
                <LinesLayer />
                <InteractiveLinesLayer />
            </div>
        );
    }
}
