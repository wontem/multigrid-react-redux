import keyMirror from 'key_mirror';

export const ActionTypes = keyMirror([
    'CREATE_GRIDS',
    'ADD_GRID',
    'SET_SHIFT',
    'SET_INTERVAL',
    'SET_ANGLE',
], 'grids');

export const Groups = keyMirror([
    'TILES',
    'LINES',
]);

export const AngleStep = keyMirror([
    'RANDOM',
    'AUTO',
]);
