import {createCombinedReducer} from 'redux_helpers';

import enviroment from 'reducers/enviroment_reducer';
import grids from 'reducers/grids_reducer';
import canvas from 'reducers/canvas_reducer';
import ant from 'reducers/ant_reducer';
import gol from 'reducers/gol_reducer';
import path from 'reducers/path_reducer';
import maze from 'reducers/maze_reducer';

import {NAMESPACE as gridsNS} from 'constants/grids_constants';

export default createCombinedReducer({
    [gridsNS]: grids,
    enviroment,
    canvas,
    gol,
    ant,
    path,
    maze,
});
