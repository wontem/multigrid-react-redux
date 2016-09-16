import keyMirror from 'key_mirror';

export const ActionTypes = keyMirror([
    'SET_BIRTH',
    'SET_SURVIVE',
    'SET_NEIGHBOURHOOD',
    'SET_CELLS',
    'SET_RANDOM_SEED',
    'SET_RANDOM_AREA',
    'TOGGLE_CELL',
    'GENERATE',
], 'gol');
