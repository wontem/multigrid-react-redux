import {ActionTypes, Directions} from 'constants/ant_constants';
import {defineAction} from 'redux_helpers';
import {turn, moveForward} from 'helpers/ant_helpers';

export const moveAnts = defineAction(ActionTypes.MOVE_ANTS, turmites => {
    return {turmites};
});

export function updateAnts(intersections, neighbours, grids, colors, field, turmites) {
    const newTurmites = turmites.map(({cellId, direction}) => {
        const colorId = field.has(cellId) ? field.get(cellId) : 0;
        const newDirection = turn(direction, colors.get(colorId));
        return moveForward(intersections, neighbours, grids, cellId, newDirection);
    });

    return moveAnts(newTurmites);
}

export const addAnt = defineAction(ActionTypes.ADD_ANT, intersectionId => {
    return {
        cellId: intersectionId,
        direction: Directions.UP,
    };
});

export const clear = defineAction(ActionTypes.CLEAR);

export const setTurns = defineAction(ActionTypes.SET_TURNS, turns => {
    return {turns};
});
