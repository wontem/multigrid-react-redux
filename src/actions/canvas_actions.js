import {ActionTypes} from 'constants/canvas_constants';
import {defineAction} from 'redux_helpers';

export const translate = defineAction(ActionTypes.TRANSLATE, (x, y) => {
    return {x, y};
});

export const scaleLines = defineAction(ActionTypes.SCALE_LINES, (scale) => {
    return {scale};
});

export const scaleTiles = defineAction(ActionTypes.SCALE_TILES, (scale) => {
    return {scale};
});

export const resize = defineAction(ActionTypes.RESIZE, (width, height) => {
    return {width, height};
});

export const setCurrentLayer = defineAction(ActionTypes.SET_LAYER, (layer) => {
    return {layer};
});

export const setCurrentPoint = defineAction(ActionTypes.SET_POINT, (point) => {
    return {point};
});
