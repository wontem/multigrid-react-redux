import keyMirror from 'key_mirror';

import GolLayer from 'containers/layers/gol_layer';
import PathLayer from 'containers/layers/path_layer';
import MazeLayer from 'containers/layers/maze_layer';
import AntLayer from 'containers/layers/ant_layer';
import WalkLayer from 'containers/layers/walk_layer';

export const ActionTypes = keyMirror([
    'RESIZE',
    'TRANSLATE',
    'SCALE_TILES',
    'SCALE_LINES',
    'SET_LAYER',
    'SET_POINT',
], 'canvas');

export const Layers = keyMirror([
    'TILES',
    'GOL',
    'PATH',
    'MAZE',
    'ANT',
    'WALK',
]);

export const LayerComponents = {
    [Layers.GOL]: GolLayer,
    [Layers.PATH]: PathLayer,
    [Layers.MAZE]: MazeLayer,
    [Layers.ANT]: AntLayer,
    [Layers.WALK]: WalkLayer,
};
