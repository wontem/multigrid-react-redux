import KeySet from 'key_set';
import DHeap from 'd_heap';
import {arrayIntersection} from 'helpers/collections_helpers';
import {getEdgeId} from 'helpers/id_helpers';

// TODO: do something with leafs
export function minimalSpanningTree(neighbours, scores, edgesMap) {
    let treeEdges = [];
    let leafs = [];

    if (neighbours.size == 0 || scores.size == 0) {
        return {
            edges: treeEdges,
            leafs,
        };
    }
    console.time('mst');

    const edges = new DHeap((edge1, edge2) => {
        return scores.get(edge1) < scores.get(edge2);
    }, Math.round(scores.size / neighbours.size));

    const rootNode = neighbours.keys().next().value;
    let usedNodes = new KeySet([rootNode]);

    /* eslint-disable no-constant-condition */
    while (true) {
        edges.clear();

        usedNodes.forEach(startNode => {
            const neighbourNodes = neighbours.get(startNode).bySide;
            neighbourNodes.forEach(endNode => {
                if (!usedNodes.has(endNode)) {
                    edges.push(getEdgeId(startNode, endNode));
                }
            });
        });

        if (edges.size !== 0) {
            const edgeId = edges.pop();
            const edge = edgesMap.get(edgeId);
            usedNodes.add(edge[1]);
            treeEdges.push(edge);
        } else {
            console.timeEnd('mst');
            return {
                edges: treeEdges,
                leafs,
            };
        }
    }
    /* eslint-enable no-constant-condition */
}

export function buildMaze(cellEdges, {intersections }, { edges}) {
    if (edges.length === 0) {
        return [];
    }
    console.time('buildMaze');

    let edgesToSkip = new KeySet();

    edges.forEach(([intersectionId0, intersectionId1]) => {
        const [edge0, edge1] = arrayIntersection(
            intersections.get(intersectionId0),
            intersections.get(intersectionId1)
        ).sort();

        edgesToSkip.add(getEdgeId(edge0, edge1));
    });

    const borders = [];

    cellEdges.forEach((edge, edgeId) => {
        if (!edgesToSkip.has(edgeId)) {
            borders.push(edge);
        }
    });

    console.timeEnd('buildMaze');

    return borders;
}
