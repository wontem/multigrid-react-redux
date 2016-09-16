import {ActionTypes} from 'constants/path_constants';
import {defineAction} from 'redux_helpers';

export const addTile = defineAction(ActionTypes.ADD_TILE, tile => {
    return {tile};
});
