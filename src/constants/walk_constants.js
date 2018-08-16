import keyMirror from 'key_mirror';

export const ActionTypes = keyMirror([
    'ADD_CELL',
    'RESET_CELLS',
], 'walk');

export const TurnDirections = {
    CW: 1,
    CCW: -1,
};
