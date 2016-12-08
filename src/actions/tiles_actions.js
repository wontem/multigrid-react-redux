import {ActionTypes} from 'constants/grids_constants';
import {defineAction} from 'redux_helpers';

export const setCenterCell = defineAction(ActionTypes.SET_CENTER_CELL, (cellId, ribbonIds) => {
    return {ribbonIds};
});
