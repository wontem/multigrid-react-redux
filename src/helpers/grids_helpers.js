import Immutable from 'immutable';
import {
    toPolar,
    toCartesian,
    sum,
    // summate,
    getMinAngleBetween,
} from 'helpers/math_helpers';
import {
    // eachPairOfArray,
    pairsComparator,
} from 'helpers/collections_helpers';
// import {getId} from 'helpers/id_helpers';

export function getUnitVector({phi}) {
    return toCartesian({
        p: 1,
        phi,
    });
}

export function getLine({p, phi, interval}, id) {
    return {
        p: p + (interval * id),
        phi,
    };
}

export function getLines(grid) {
    return Immutable.Map().withMutations(lines => {
        for (let id = grid.firstLineId; id <= grid.lastLineId; id++) {
            lines.set(id, getLine(grid, id));
        }
    });
}

export function getRealRibbonId({p, phi, interval}, point) {
    const polarPoint = toPolar(point);
    const deltaPhi = polarPoint.phi - phi;
    const projection = Math.cos(deltaPhi) * polarPoint.p;

    return (projection - p) / interval;
}

export function getRibbonId(grid, point) {
    return Math.floor(getRealRibbonId(grid, point));
}

export function getRealRibbonIds(grids, gridIds, point) {
    return gridIds.map(gridId => {
        const grid = grids.get(gridId);
        return [gridId, getRealRibbonId(grid, point)];
    });
}

export function getRibbonIds(grids, gridIds, point) {
    return gridIds.map(gridId => {
        const grid = grids.get(gridId);
        return [gridId, getRibbonId(grid, point)];
    });
}

export function getNeighbourCells(grids, gridIds, {coord, point}) {
    const [gridId1, lineId1] = coord[0];
    const [gridId2, lineId2] = coord[1];

    const commonGridIds = gridIds.filter(gridId => gridId !== gridId1 && gridId !== gridId2);
    const commonRibbonsInCell = getRibbonIds(grids, commonGridIds, point);

    return [
        [-1, -1],
        [ 0, -1],
        [ 0,  0],
        [-1,  0],
    ].reduce((cells, [deltaLineId1, deltaLineId2]) => {
        const ribbonId1 = lineId1 + deltaLineId1;
        const ribbonId2 = lineId2 + deltaLineId2;

        const cell = commonRibbonsInCell.concat([
            [gridId1, ribbonId1],
            [gridId2, ribbonId2],
        ]).sort(pairsComparator);

        return cells.concat([cell]);
    }, []);
}

export function getLineIdsByRibbonId(ribbonId) {
    return [ribbonId, ribbonId + 1];
}

// export function getVerticesOfCell(gridIds, intersections, cell) {
//     const lineIdsMap = Immutable.Map().withMutations(lineIdsMap => {
//         cell.forEach(([gridId, ribbonId]) => {
//             const lineIds = getLineIdsByRibbonId(ribbonId);
//             const lines = lineIdsMap.get(gridId) || [];
//
//             lineIdsMap.set(gridId, lines.concat(lineIds));
//         });
//     });
//
//     let vertices = [];
//
//     const intersectionsMap = Immutable.Map().withMutations(intersectionsMap => {
//         eachPairOfArray(gridIds, (gridId1, gridId2) => {
//             const lineIds1 = lineIdsMap.get(gridId1);
//             const lineIds2 = lineIdsMap.get(gridId2);
//
//             let lines1 = intersectionsMap.get(gridId1) || Immutable.Map();
//             let lines2 = intersectionsMap.get(gridId2) || Immutable.Map();
//
//             lineIds1.forEach(lineId1 => {
//                 const line1Intersections = lines1.get(lineId1) || [];
//
//                 lineIds2.forEach(lineId2 => {
//                     const line2Intersections = lines2.get(lineId2) || [];
//
//                     const intersectionCoord = [[gridId1, lineId1], [gridId2, lineId2]];
//                     const intersectionId = getId(intersectionCoord);
//
//                     vertices = vertices.concat(intersectionId);
//                     lines1 = lines1.set(lineId1, line1Intersections.concat(intersectionId));
//                     lines2 = lines2.set(lineId2, line2Intersections.concat(intersectionId));
//                 });
//             });
//
//             intersectionsMap
//                 .set(gridId1, lines1)
//                 .set(gridId2, lines2);
//         });
//     });
//
//     const numberOfVerticesToRemove = gridIds.length - 1;
//     const verticesToRemove = Immutable.Set().withMutations(verticesToRemove => {
//         gridIds.forEach(gridId => {
//             for (let intersectionsOnLine of intersectionsMap.get(gridId)) {
//                 const sortedIntersections = Array.from(intersectionsOnLine).sort((a, b) => {
//                     return toCartesian(intersections.get(a)).phi - toCartesian(intersections.get(b)).phi;
//                 });
//
//                 for (let i = 0; i < numberOfVerticesToRemove; i++) {
//                     verticesToRemove.add(sortedIntersections[i]);
//                     verticesToRemove.add(sortedIntersections[sortedIntersections.length - 1 - i]);
//                 }
//             }
//         });
//     });
//
//     return vertices.filter(vertice => !verticesToRemove.has(vertice));
// }

export function getProjectionOfCell(grids, ribbonIds) {
    return ribbonIds.reduce((point, [gridId, ribbonId]) => {
        const vector = toCartesian({
            phi: grids.get(gridId).phi,
            p: ribbonId,
        });

        return sum(point, vector);
    }, {
        x: 0,
        y: 0,
    });
}

export function isOverflow(gridIds, grids, {coord, point}) {
    return !gridIds.filter(gridId => {
        return gridId !== coord[0][0] && gridId !== coord[1][0];
    }).every(gridId => {
        const grid = grids.get(gridId);
        const ribbonId = getRibbonId(grid, point);
        const [minLine, maxLine] = getLineIdsByRibbonId(ribbonId);
        return grid.firstLineId <= minLine && maxLine <= grid.lastLineId;
    });
}

// export function calculateNumberOfIntersections(gridIds, ranges) {
//     const numbersOfLines = ranges.map(({firstLineId, lastLineId}) => lastLineId - firstLineId + 1);
//     const numberOfAllLines = summate(gridIds, gridId => numbersOfLines.get(gridId));
//
//     return summate(gridIds, gridId => {
//         const numberOfLines = numbersOfLines.get(gridId);
//         return (numberOfAllLines - numberOfLines) * numberOfLines;
//     }) / 2;
// }

export function getTileColor(grids, {coord}) {
    const gridId1 = coord[0][0];
    const gridId2 = coord[1][0];
    const angle1 = grids.get(gridId1).phi;
    const angle2 = grids.get(gridId2).phi;
    const angle = getMinAngleBetween(angle1, angle2);

    return `hsl(${angle / Math.PI * 720}, 55%, 55%)`;
}

export function getGridColor({phi}, opacity = 1) {
    return `hsla(${phi * 180 / Math.PI}, 60%, 60%, ${opacity})`;
}

export function getNeighbours(intersections, graph, intersectionId) {
    if (!intersections.has(intersectionId)) {
        return;
    }

    const intersectionCoord = intersections.get(intersectionId).coord;
    const neighbourCells = graph.intersections.get(intersectionId);
    const neighbours = {
        bySide: new Set(),
        byVertice: new Set(),
    };

    neighbourCells.forEach(cellId => {
        graph.cells.get(cellId).forEach(verticeId => {
            if (
                verticeId === intersectionId ||
                neighbours.bySide.has(verticeId) ||
                neighbours.byVertice.has(verticeId)
            ) {
                return;
            }

            const verticeCoord = intersections.get(verticeId).coord;

            if (intersectionCoord.some(([gridId1, lineId1]) => {
                return verticeCoord.some(([gridId2, lineId2]) => {
                    return gridId1 === gridId2 && lineId1 === lineId2;
                });
            })) {
                neighbours.bySide.add(verticeId);
            } else {
                neighbours.byVertice.add(verticeId);
            }
        });
    });

    return neighbours;
}

export function getCellNeighbours({intersections, cells}, cellCoords, cellId) {
    if (!cells.has(cellId)) {
        return;
    }

    const cellVertices = cells.get(cellId);
    const cellCoord = cellCoords.get(cellId);
    const neighbours = {
        bySide: new Set(),
        byVertice: new Set(),
    };

    cellVertices.forEach(intersectionId => {
        intersections.get(intersectionId).forEach(currentCellId => {
            if (
                currentCellId === cellId ||
                neighbours.bySide.has(currentCellId) ||
                neighbours.byVertice.has(currentCellId)
            ) {
                return;
            }

            const currentCellCoord = cellCoords.get(currentCellId);

            const changesInRibbons = cellCoord.reduce((
                changesInRibbons,
                pair1,
                id
            ) => {
                const pair2 = currentCellCoord[id];

                return pair1[1] !== pair2[1] ? changesInRibbons + 1 : changesInRibbons;
            }, 0);

            if (changesInRibbons === 1) {
                neighbours.bySide.add(currentCellId);
            } else {
                neighbours.byVertice.add(currentCellId);
            }
        });
    });

    return neighbours;
}

export function getEdgeIntersections(neighbours) {
    const edgeIntersections = [];

    neighbours.forEach(({bySide}, intersectionId) => {
        if (bySide.length !== 4) {
            edgeIntersections.push(intersectionId);
        }
    });

    return edgeIntersections;
}

export function getCenterRibbon(firstLineId, lastLineId) {
    return Math.floor((lastLineId - firstLineId) / 2) + firstLineId;
}
