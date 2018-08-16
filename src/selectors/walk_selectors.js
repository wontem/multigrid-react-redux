import Immutable from 'immutable';
import {createSelector} from 'reselect';
import {graph, cellNeighbours, cellPoints} from 'selectors/grids_selectors';
import {toPolar, diff} from 'helpers/math_helpers';
import { getNextCell } from 'helpers/walk_helpers';

export const walk = state => state.walk;
export const cellIds = state => walk(state).get('cells');
export const walkDirections = state => walk(state).get('walkDirections');

export const triangularTessellation = createSelector(
    [graph, cellNeighbours, cellPoints],
    (graph, cellNeighbours, cellPoints) => {
        return Immutable.Map().withMutations((triangularTessellation) => {
            cellNeighbours.forEach((cellNeighbourhood, cellId) => {
                triangularTessellation.set(
                    cellId,
                    [...cellNeighbourhood.bySide]
                );
            });

            graph.intersections.forEach((cellIds) => {
                const points = cellIds.map(cellId => cellPoints.get(cellId));

                const [dist0, dist1] = [
                    [points[0], points[2]],
                    [points[1], points[3]],
                ].map(([point0, point1]) => {
                    return toPolar(diff(point1, point0)).p;
                });

                if (dist0 < dist1) {
                    triangularTessellation.update(cellIds[0], (cellNeighbours) => {
                        return [...cellNeighbours, cellIds[2]];
                    });
                    triangularTessellation.update(cellIds[2], (cellNeighbours) => {
                        return [...cellNeighbours, cellIds[0]];
                    });
                } else {
                    triangularTessellation.update(cellIds[1], (cellNeighbours) => {
                        return [...cellNeighbours, cellIds[3]];
                    });
                    triangularTessellation.update(cellIds[3], (cellNeighbours) => {
                        return [...cellNeighbours, cellIds[1]];
                    });
                }
            });
        }).map((cellIds, cellId0) => {
            const point0 = cellPoints.get(cellId0);

            return cellIds
                .map((cellId1) => {
                    const point1 = cellPoints.get(cellId1);

                    return [cellId1, toPolar(diff(point1, point0)).phi];
                })
                .sort((a, b) => {
                    return a[1] - b[1];
                })
                .map(([cellId]) => cellId);
        });
    }
);

export const availableCells = createSelector(
    [cellIds, triangularTessellation],
    (cellIds, triangularTessellation) => {
        switch (cellIds.length) {
            case 1: return triangularTessellation.get(cellIds[0]);
            default: return [...triangularTessellation.keys()];
        }
    }
);

export const walkPathCellIds = createSelector(
    [cellIds, walkDirections, triangularTessellation],
    (cellIds, walkDirections, triangularTessellation) => {
        if (cellIds.length < 2) {
            return cellIds;
        }

        const walkPathCellIds = [...cellIds];
        let i = 0;
        let prevCellId = cellIds[0];
        let currentCellId = cellIds[1];
        while (true) {
            if (i > 100) {
                break;
            }

            if (i !== 0 && i % walkDirections.length === 0 && walkPathCellIds[0] === prevCellId) {
                break;
            }

            const direction = walkDirections[i % walkDirections.length];
            const nextCell = getNextCell(triangularTessellation, [currentCellId, prevCellId], direction);

            walkPathCellIds.push(nextCell);

            prevCellId = currentCellId;
            currentCellId = nextCell;


            i += 1;
        }

        return walkPathCellIds;
    }
);

export const points = createSelector(
    [walkPathCellIds, cellPoints],
    (walkPathCellIds, cellPoints) => {
        return walkPathCellIds.map(cellId => cellPoints.get(cellId));
    }
);
