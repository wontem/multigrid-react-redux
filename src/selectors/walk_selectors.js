// import Immutable from 'immutable';
import {createSelector} from 'reselect';
import {graph} from 'selectors/grids_selectors';

export const walk = state => state.walk;

export const cellIds = createSelector(
    [walk],
    (walk) => walk.get('cells')
);

export const availableCells = createSelector(
    [cellIds, graph],
    (cellIds, graph) => {
        switch (cellIds.length) {
            case 0: return [...graph.cells.keys()];
            case 1:
            case 2:
            case 3:
        }
    }
);
