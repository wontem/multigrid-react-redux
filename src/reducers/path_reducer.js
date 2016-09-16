import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes} from 'constants/path_constants';
import {Groups} from 'constants/grids_constants';

export default createReducer(Immutable.Map({
    tiles: [],
    distanceGroup: Groups.LINES,
}), type => {
    switch (type) {
        case ActionTypes.ADD_TILE: return addTile;
    }
});

function addTile(state, {tile}) {
    if (!tile) {
        return state.set('tiles', []);
    }

    const currentTiles = state.get('tiles');

    switch (currentTiles.length) {
        case 0:
        case 2: return state.set('tiles', [tile]);
        case 1: return state.set('tiles', [currentTiles[0], tile]);
        default: return state;
    }
}
