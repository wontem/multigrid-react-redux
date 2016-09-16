import keyMirror from 'key_mirror';

export const ActionTypes = keyMirror([
    'ADD_ANT',
    'KILL_ANT',
    'MOVE_ANTS',
    'CLEAR',
    'SET_TURNS',
], 'ant');

export const Directions = keyMirror([
    'UP',
    'RIGHT',
    'DOWN',
    'LEFT',
]);

export const DirectionOrder = [
    Directions.UP,
    Directions.RIGHT,
    Directions.DOWN,
    Directions.LEFT,
];

export const TurnDirections = {
    CW: 1,
    CCW: -1,
};
