import React from 'react';
import PureComponent from 'shared/components/pure_component';

import LayersContainer from 'containers/layers_container';
import ToolsContainer from 'containers/tools_container';

import './app.sass';

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <LayersContainer />
                <ToolsContainer />
            </div>
        );
    }
}
