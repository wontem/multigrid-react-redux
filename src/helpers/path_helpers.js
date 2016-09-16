import Immutable from 'immutable';
import {toPolar, diff} from 'helpers/math_helpers';

function distBetween(pointsMap, id0, id1) {
    const pos0 = pointsMap.get(id0);
    const pos1 = pointsMap.get(id1);
    return toPolar(diff(pos1, pos0)).p;
}

function heuristics(pointsMap, id0, id1) {
    const pos0 = pointsMap.get(id0);
    const pos1 = pointsMap.get(id1);

    const d1 = Math.abs(pos1.x - pos0.x);
    const d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
}

function reconstructPath(cameFrom, current) {
    const path = [current];

    while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        path.push(current);
    }

    return path;
}

function getScore(map, id) {
    return map.has(id) ? map.get(id) : Infinity;
}

export function aStar(graph, pointsMap, start = null, end = null) {
    if (start === null) {
        return [];
    } else if (end === null) {
        return [start];
    }

    let openSet = Immutable.Set([start]);
    let closedSet = Immutable.Set();
    let cameFrom = Immutable.Map();
    let gScore = Immutable.Map({
        [start]: 0,
    });
    let fScore = Immutable.Map({
        [start]: heuristics(pointsMap, start, end),
    });

    while (!openSet.isEmpty()) {
        const current = openSet.minBy(id => getScore(fScore, id));

        if (current === end) {
            return reconstructPath(cameFrom, current);
        }

        openSet = openSet.remove(current);
        closedSet = closedSet.add(current);

        const neighbours = graph.get(current).bySide;

        for (let neighbour of neighbours) {
            if (closedSet.has(neighbour)) {
                continue;
            }

            const tentativeGScore =
                getScore(gScore, current) + distBetween(pointsMap, current, neighbour);

            if (!openSet.has(neighbour)) {
                openSet = openSet.add(neighbour);
            } else if (tentativeGScore >= getScore(gScore, neighbour)) {
                continue;
            }

            cameFrom = cameFrom.set(neighbour, current);
            gScore = gScore.set(neighbour, tentativeGScore);
            fScore = fScore.set(neighbour, getScore(gScore, neighbour) + heuristics(pointsMap, neighbour, end));
        }
    }

    return [];
}
