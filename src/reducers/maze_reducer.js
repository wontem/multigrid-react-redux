import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes, MstTypes} from 'constants/maze_constants';

export default createReducer(Immutable.Map({
    mstType: MstTypes.RANDOM,
}), {
    [ActionTypes.SET_MST_TYPE]: setMstType,
});

function setMstType(state, {mstType}) {
    return state.setIn(['mstType'], mstType);
}
