import {ActionTypes} from 'constants/maze_constants';
import {defineAction} from 'redux_helpers';

// export const setRootNode = defineAction(ActionTypes.SET_ROOT_NODE, tile => {
//     return {tile};
// });

export const setMstType = defineAction(ActionTypes.SET_MST_TYPE, mstType => {
    return {mstType};
});
