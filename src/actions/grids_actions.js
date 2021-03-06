import {ActionTypes} from 'constants/grids_constants';
import {defineAction} from 'redux_helpers';


export const addGrid = defineAction(ActionTypes.ADD_GRID);
export const createGrids = defineAction(ActionTypes.CREATE_GRIDS);

export const setShift = defineAction(ActionTypes.SET_SHIFT);
export const setInterval = defineAction(ActionTypes.SET_INTERVAL);
export const setAngle = defineAction(ActionTypes.SET_ANGLE);
export const setFirstLine = defineAction(ActionTypes.SET_FIRST_LINE);
export const setLastLine = defineAction(ActionTypes.SET_LAST_LINE);
export const setOverflow = defineAction(ActionTypes.SET_OVERFLOW, shouldOverflow => ({shouldOverflow}));
