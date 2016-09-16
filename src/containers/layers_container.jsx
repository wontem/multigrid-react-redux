import React from 'react';
import PureComponent from 'shared/components/pure_component';
import {Container} from 'shared/components/canvas';

import LinesGroup from 'components/lines_group';
import TilesGroup from 'components/tiles_group';

import MouseHandler from 'mouse_handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';

import {currentLayer} from 'selectors/canvas_selectors';
import {actions} from 'selectors/canvas_actions_selectors';

// TODO: maybe create MouseHandler child class instead
@connect(createSelector(
    [actions, currentLayer],
    (actions, currentLayer) => {
        return {
            actions,
            currentLayer,
        };
    }
))
export default class Layers extends PureComponent {
    render() {
        const {resize, ...actions} = bindActionCreators(this.props.actions, this.props.dispatch);
        const onWindowResize = () => resize(window.innerWidth, window.innerHeight);

        return (
            <MouseHandler {...actions}>
                <Container onWindowResize={onWindowResize}>
                    <LinesGroup />
                    <TilesGroup currentLayer={this.props.currentLayer} />
                </Container>
            </MouseHandler>
        );
    }
}
