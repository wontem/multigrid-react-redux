import keyMirror from 'key_mirror';

export const ActionTypes = keyMirror([
    'SET_MST_TYPE',
], 'maze');

export const MstTypes = keyMirror([
    'RANDOM',
    'BY_DISTANCE',
]);
