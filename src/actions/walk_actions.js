import {ActionTypes} from 'constants/walk_constants';
import {defineAction} from 'redux_helpers';

export const addCell = defineAction(ActionTypes.ADD_CELL, (intersectionId, ribbonIds, cellId) => {
    return {cellId};
});

export const resetWalk = defineAction(ActionTypes.RESET_CELLS);
