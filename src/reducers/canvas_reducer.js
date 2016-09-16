import {createReducer} from 'redux_helpers';
import Immutable from 'immutable';
import {Groups} from 'constants/grids_constants';
import {Layers, ActionTypes} from 'constants/canvas_constants';
import {sum} from 'helpers/math_helpers';

export default createReducer(Immutable.Map({
    size: {
        width: 1280,
        height: 720,
    },
    tilesScale: 15,
    linesScale: 20,
    linesTranslate: {x: 0, y: 0},
    currentGroup: Groups.LINES,
    currentLayer: Layers.GOL,
    currentPoint: {x: 0, y: 0},
}), type => {
    switch (type) {
        case ActionTypes.RESIZE: return resize;
        case ActionTypes.SET_LAYER: return setCurrentLayer;
        case ActionTypes.SET_POINT: return setCurrentPoint;
        case ActionTypes.TRANSLATE: return translate;
        case ActionTypes.SCALE_LINES: return scaleLines;
        case ActionTypes.SCALE_TILES: return scaleTiles;
    }
});

function resize(state, {width, height}) {
    return state.set('size', {width, height});
}

function scaleLines(state, {scale}) {
    return state.set('linesScale', scale);
}

function scaleTiles(state, {scale}) {
    return state.set('tilesScale', scale);
}

function translate(state, {x, y}) {
    const currentTranslate = state.get('linesTranslate');
    return state.set('linesTranslate', sum(currentTranslate, {x, y}));
}

function setCurrentLayer(state, {layer}) {
    return state.set('currentLayer', layer);
}

function setCurrentPoint(state, {point}) {
    return state.set('currentPoint', point);
}
