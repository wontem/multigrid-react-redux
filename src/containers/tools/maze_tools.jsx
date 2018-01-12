import React, {Component} from 'react';
import {Group, Select} from 'gui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';

import {MstTypes} from 'constants/maze_constants';
import {mstType} from 'selectors/maze_selectors';
import {setMstType} from 'actions/maze_actions';

@connect(createStructuredSelector({
    mstType,
}))
export default class MazeTools extends Component {
    render() {
        const {
            mstType,
        } = this.props;
        const actions = bindActionCreators({
            setMstType,
        }, this.props.dispatch);

        return (
            <Group
                label="Maze"
            >
                <Select
                    label="Score function"
                    values={{
                        [MstTypes.RANDOM]: 'Random',
                        [MstTypes.BY_DISTANCE]: 'By distance',
                    }}
                    selected={mstType}
                    onChange={actions.setMstType}
                />
            </Group>
        );
    }
}
