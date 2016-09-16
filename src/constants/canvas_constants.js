import keyMirror from 'key_mirror';

import GolLayer from 'containers/layers/gol_layer';
import PathLayer from 'containers/layers/path_layer';
import MazeLayer from 'containers/layers/maze_layer';
import AntLayer from 'containers/layers/ant_layer';

export const ActionTypes = keyMirror([
    'RESIZE',
    'TRANSLATE',
    'SCALE_TILES',
    'SCALE_LINES',
    'SET_LAYER',
    'SET_POINT',
], 'canvas');

export const Layers = keyMirror([
    'GOL',
    'PATH',
    'MAZE',
    'ANT',
]);

export const LayerComponents = {
    [Layers.GOL]: GolLayer,
    [Layers.PATH]: PathLayer,
    [Layers.MAZE]: MazeLayer,
    [Layers.ANT]: AntLayer,
};
