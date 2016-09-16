import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {MstTypes} from 'constants/maze_constants';

export default createReducer(Immutable.Map({
    mstType: MstTypes.RANDOM,
}));
