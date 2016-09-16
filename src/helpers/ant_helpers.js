import {
    DirectionOrder,
    Directions,
} from 'constants/ant_constants';

import {getInRange, lerp} from 'helpers/math_helpers';
import {getRibbonId} from 'helpers/grids_helpers';

export function getAxises(grids, [gridId1, gridId2]) {
    const [x, y] = [gridId1, gridId2].sort((i, j) => {
        return grids.get(i).phi - grids.get(j).phi;
    });

    return {x, y};
}

export function turn(direction, turnDirection, turns = 1) {
    const dirIndex = DirectionOrder.indexOf(direction);
    const newDirIndex = getInRange(dirIndex + turnDirection * turns, DirectionOrder.length);
    return DirectionOrder[newDirIndex];
}

export function getExpectedAxisCoord(axises, direction) {
    switch (direction) {
        case Directions.UP:
        case Directions.DOWN:
            return {
                constantAxis: axises.x,
                variableAxis: axises.y,
            };
        case Directions.RIGHT:
        case Directions.LEFT:
            return {
                constantAxis: axises.y,
                variableAxis: axises.x,
            };
    }
}

export function getTurnColor(colors, colorId) {
    if (colorId === 0) {
        return 'transparent';
    }

    return `hsl(${lerp((colorId - 1) / (colors.size - 1), 360)}, 55%, 55%)`;
}

export function moveForward(intersections, neighbours, grids, cellId, direction) {
    const intersectionNeighbours = [...neighbours.get(cellId).bySide];
    const coordMap = new Map(intersections.get(cellId).coord);
    const axises = getAxises(grids, [...coordMap.keys()]);

    const {constantAxis, variableAxis} = getExpectedAxisCoord(axises, direction);

    const newCellId = intersectionNeighbours.find(cellId => {
        const {point, coord} = intersections.get(cellId);
        const newCoordMap = new Map(coord);

        if (newCoordMap.has(constantAxis) && newCoordMap.get(constantAxis) === coordMap.get(constantAxis)) {
            const grid = grids.get(variableAxis);
            const ribbonId = getRibbonId(grid, point);

            if (direction === Directions.UP || direction === Directions.RIGHT) {
                return ribbonId >= coordMap.get(variableAxis);
            }

            if (direction === Directions.DOWN || direction === Directions.LEFT) {
                return ribbonId < coordMap.get(variableAxis);
            }
        }

        return false;
    });

    if (newCellId === undefined) {
        return {cellId, direction};
    }

    const newCoordMap = new Map(intersections.get(newCellId).coord);
    const newAxises = getAxises(grids, [...newCoordMap.keys()]);

    const newDirection = (
        axises.x === newAxises.y ||
        axises.y === newAxises.x
    ) ? {
        [Directions.RIGHT]: Directions.UP,
        [Directions.LEFT]: Directions.DOWN,
        [Directions.UP]: Directions.RIGHT,
        [Directions.DOWN]: Directions.LEFT,
    }[direction] : direction;

    return {
        cellId: newCellId,
        direction: newDirection,
    };
}
