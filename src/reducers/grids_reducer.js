import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes, AngleStep} from 'constants/grids_constants';

const initialState = Immutable.Map({
    grids: Immutable.Map(),
    ranges: Immutable.Map(),
});

export default createReducer(initialState, {
    [ActionTypes.CREATE_GRIDS]: createGrids,
    [ActionTypes.ADD_GRID]: addGrid,
    [ActionTypes.SET_SHIFT]: setShift,
    [ActionTypes.SET_INTERVAL]: setInterval,
    [ActionTypes.SET_ANGLE]: setAngle,
});

// TODO: use Immutable
function setAngle(state, {id, angle}) {
    return state.updateIn(['grids', id], gridParams => {
        return {
            ...gridParams,
            phi: angle,
        };
    });
}

function setShift(state, {id, shift}) {
    return state.updateIn(['grids', id], gridParams => {
        return {
            ...gridParams,
            p: shift,
        };
    });
}

function setInterval(state, {id, interval}) {
    return state.updateIn(['grids', id], gridParams => {
        return {
            ...gridParams,
            interval: interval,
        };
    });
}

function addGrid(state, {angle, step, shift, start, end}) {
    let grids = state.get('grids');
    let ranges = state.get('ranges');
    const id = grids.size;

    grids = grids.set(id, {
        phi: angle,
        p: shift,
        interval: step,
    });

    ranges = ranges.set(id, {
        firstLineId: start,
        lastLineId: end,
    });

    return state
        .set('grids', grids)
        .set('ranges', ranges);
}

function getAngle(angleStep, n, i) {
    switch (angleStep) {
        case AngleStep.AUTO: return (1 + n % 2) * Math.PI * i / n;
        case AngleStep.RANDOM: return Math.PI * 2 * Math.random();
        default: return angleStep * i;
    }
}

function createGrids(currentState, {grids, shift, angle, lines = 10}) {
    let state = initialState;
    const start = -Math.floor(lines / 2);
    const end = start + lines - 1;
    for (let i = 0; i < grids; i++) {
        state = addGrid(state, {
            angle: getAngle(angle, grids, i),
            step: 1,
            start,
            end,
            shift,
        });
    }
    return state;
}
