import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes} from 'constants/walk_constants';

export default createReducer(Immutable.Map({
    cells: [],
}), type => {
    switch (type) {
        case ActionTypes.ADD_CELL: return addCell;
    }
});

function addCell(state, {cellId}) {
    if (!cellId) {
        return state.set('cells', []);
    }

    const currentCells = state.get('cells');

    if (currentCells.length === 3) {
        return state.set('cells', [cellId]);
    }

    if (currentCells.length < 3) {
        return state.set('cells', [...currentCells, cellId]);
    }
}
