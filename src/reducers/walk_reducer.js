import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes, TurnDirections} from 'constants/walk_constants';

export default createReducer(Immutable.Map({
    cells: [],
    walkDirections: [TurnDirections.CW, TurnDirections.CCW],
}), type => {
    switch (type) {
        case ActionTypes.ADD_CELL: return addCell;
        case ActionTypes.RESET_CELLS: return resetCells;
    }
});

function resetCells(state) {
    return state.set('cells', []);
}

function addCell(state, {cellId}) {
    if (!cellId) {
        return state.set('cells', []);
    }

    const currentCells = state.get('cells');

    switch (currentCells.length) {
        case 0:
        case 2: return state.set('cells', [cellId]);
        case 1: return state.set('cells', [currentCells[0], cellId]);
        default: return state;
    }
}
