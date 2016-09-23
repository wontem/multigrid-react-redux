import keyMirror from 'key_mirror';

export const NAMESPACE = 'grids';
export const ActionTypes = keyMirror([
    'CREATE_GRIDS',
    'ADD_GRID',
    'SET_SHIFT',
    'SET_INTERVAL',
    'SET_ANGLE',
    'SET_FIRST_LINE',
    'SET_LAST_LINE',
], NAMESPACE);

export const Groups = keyMirror([
    'TILES',
    'LINES',
]);

export const AngleStep = keyMirror([
    'RANDOM',
    'AUTO',
]);
