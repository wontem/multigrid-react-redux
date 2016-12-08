import Immutable from 'immutable';
import {createSelector} from 'reselect';
import {
    getNeighbourCells,
    getProjectionOfCell,
    getUnitVector,
    getLines,
    isOverflow,
    getTileColor,
    getNeighbours,
    getCellNeighbours,
} from 'helpers/grids_helpers';
import {
    getId,
    getEdgeId,
} from 'helpers/id_helpers';
import {
    eachPairOfArray,
    eachPairOfMaps,
} from 'helpers/collections_helpers';

import {NAMESPACE} from 'constants/grids_constants';

export const grids = state => state[NAMESPACE].get('gridParams');
export const shouldOverflow = state => state[NAMESPACE].get('shouldOverflow');

export const gridIds = createSelector([grids], grids => {
    return [...grids.keys()];
});

export const unitVectors = createSelector([grids], grids => grids.map(getUnitVector));

export const lines = createSelector(
    [grids],
    (grids) => {
        return grids.map(grid => getLines(grid));
    }
);


export const intersections = createSelector(
    [gridIds, unitVectors, lines, grids, shouldOverflow],
    (gridIds, unitVectors, lines, grids, shouldOverflow) => {
        console.time('intersections');
        const intersections = Immutable.Map().withMutations(intersections => {
            eachPairOfArray(gridIds, (gridId1, gridId2) => {
                const v1 = unitVectors.get(gridId1);
                const v2 = unitVectors.get(gridId2);
                const divider = v1.x * v2.y - v2.x * v1.y;

                eachPairOfMaps(
                    lines.get(gridId1), lines.get(gridId2),
                    (line1, line2, lineId1, lineId2) => {
                        const coord = [[gridId1, lineId1], [gridId2, lineId2]];
                        const point = {
                            x: (v2.y * line1.p - v1.y * line2.p) / divider,
                            y: (v1.x * line2.p - v2.x * line1.p) / divider,
                        };
                        const intersection = {
                            coord,
                            point,
                        };

                        if (shouldOverflow || !isOverflow(gridIds, grids, intersection)) {
                            intersections.set(getId(coord), intersection);
                        }
                    }
                );
            });
        });
        console.timeEnd('intersections');
        return intersections;
    }
);

export const intersectionCellCoords = createSelector(
    [grids, gridIds, intersections],
    (grids, gridIds, intersections) => {
        return intersections.map((intersection) => {
            return getNeighbourCells(grids, gridIds, intersection);
        });
    }
);

export const cellCoords = createSelector(
    [intersectionCellCoords],
    (intersectionCellCoords) => {
        return Immutable.Map().withMutations(cellCoords => {
            intersectionCellCoords.forEach(intersectionNeighbourCellCoords => {
                intersectionNeighbourCellCoords.forEach(cellCoord => {
                    const cellId = getId(cellCoord);

                    if (!cellCoords.has(cellId)) {
                        cellCoords.set(cellId, cellCoord);
                    }
                });
            });
        });
    }
);

export const graph = createSelector(
    [intersectionCellCoords],
    (intersectionCellCoords) => {
        console.time('graph');
        let graphIntersections;
        const cells = Immutable.Map().withMutations(cells => {
            graphIntersections = intersectionCellCoords.map((coords, intersectionId) => {
                return coords.map(cellCoord => {
                    const cellId = getId(cellCoord);

                    if (cells.has(cellId)) {
                        cells.get(cellId).push(intersectionId);
                    } else {
                        cells.set(cellId, [intersectionId]);
                    }

                    return cellId;
                });
            });
        });
        console.timeEnd('graph');
        console.log(cells.size);

        return {
            cells,
            intersections: graphIntersections,
        };
    }
);

export const neighbours = createSelector(
    [intersections, graph],
    (intersections, graph) => {
        return intersections.map((intersection, intersectionId) => {
            return getNeighbours(intersections, graph, intersectionId);
        });
    }
);

export const cellPoints = createSelector(
    [cellCoords, grids],
    (cellCoords, grids) => cellCoords.map(coord => getProjectionOfCell(grids, coord)));

// TODO: rename to tilePoints
// TODO: split on two selectors: tilePoints and colors
export const tiles = createSelector(
    [graph, cellPoints, grids, intersections],
    (graph, cellPoints, grids, intersections) => {
        return graph.intersections.map((cellIds, intersectionId) => {
            const points = cellIds.map(cellId => cellPoints.get(cellId));
            const color = getTileColor(grids, intersections.get(intersectionId));
            return {
                points,
                color,
            };
        });
    }
);

export const cellNeighbours = createSelector(
    [cellCoords, graph],
    (cellCoords, graph) => {
        return graph.cells.map((cell, cellId) => {
            return getCellNeighbours(graph, cellCoords, cellId);
        });
    }
);

export const cellEdges = createSelector(
    [cellNeighbours],
    (cellNeighbours) => {
        return Immutable.Map().withMutations(edges => {
            cellNeighbours.forEach(({bySide, byVertice}, cellId0) => {
                bySide.forEach(cellId1 => {
                    const edge = [cellId0, cellId1].sort();
                    const edgeId = getEdgeId(...edge);
                    if (!edges.has(edgeId)) {
                        edges.set(edgeId, edge);
                    }
                });
            });
        });
    }
);
