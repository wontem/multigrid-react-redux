import Immutable from 'immutable';
import {createSelector} from 'reselect';
import {intersections, neighbours, cellEdges, graph, cellPoints, tiles} from 'selectors/grids_selectors';
import {randomSeed} from 'selectors/enviroment_selectors';
import {filterMap} from 'helpers/collections_helpers';
import {diff, toPolar} from 'helpers/math_helpers';
import {minimalSpanningTree, buildMaze} from 'helpers/maze_helpers';
import {getEdgeId} from 'helpers/id_helpers';
import {MstTypes} from 'constants/maze_constants';
import {funargs as randomCreators} from 'mersenne';

export const maze = state => state.maze;

export const mstType = createSelector(
    [maze],
    (maze) => maze.get('mstType')
);

export const edgesMap = createSelector(
    [neighbours],
    (neighbours) => {
        return Immutable.Map().withMutations(edgesMap => {
            neighbours.forEach((neighbourIntersections, node0) => {
                neighbourIntersections.bySide.forEach(node1 => {
                    const edgeId = getEdgeId(node0, node1);
                    if (!edgesMap.has(edgeId)) {
                        const reverseEdgeId = getEdgeId(node1, node0);

                        edgesMap
                            .set(edgeId, [node0, node1])
                            .set(reverseEdgeId, [node1, node0]);
                    }
                });
            });
        });
    }
);

export const scores = createSelector(
    [intersections, edgesMap, mstType, randomSeed],
    (intersections, edgesMap, mstType, randomSeed) => {
        let scoreFunction;

        if (mstType === MstTypes.RANDOM) {
            scoreFunction = randomCreators.randReal2(randomSeed);
        }

        if (mstType === MstTypes.BY_DISTANCE) {
            scoreFunction = (node0, node1) => {
                const point0 = intersections.get(node0).point;
                const point1 = intersections.get(node1).point;
                return toPolar(diff(point0, point1)).p;
            };
        }

        return Immutable.Map().withMutations(scores => {
            edgesMap.forEach(([node0, node1], edgeId) => {
                if (!scores.has(edgeId)) {
                    const reverseEdgeId = getEdgeId(node1, node0);
                    const score = scoreFunction(node0, node1);
                    scores
                        .set(edgeId, score)
                        .set(reverseEdgeId, score);
                }
            });
        });
    }
);

export const spanningTree = createSelector(
    [neighbours, scores, edgesMap],
    minimalSpanningTree
);

export const borders = createSelector(
    [cellEdges, graph, spanningTree],
    buildMaze
);

export const borderPoints = createSelector(
    [cellPoints, borders],
    (cellPoints, borders) => borders.map(border => border.map(cellId => cellPoints.get(cellId)))
);

export const leafs = createSelector(
    [tiles, spanningTree],
    (tiles, {leafs}) => filterMap(tiles, leafs)
);
