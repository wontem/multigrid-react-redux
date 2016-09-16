import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes, TurnDirections} from 'constants/ant_constants';

export default createReducer(Immutable.Map({
    lastId: -1,
    turmites: Immutable.Map(),
    colors: Immutable.List([TurnDirections.CCW, TurnDirections.CW, TurnDirections.CW, TurnDirections.CCW]),
    field: Immutable.Map(),
}), type => {
    switch (type) {
        case ActionTypes.ADD_ANT: return addAnt;
        case ActionTypes.KILL_ANT: return killAnt;
        case ActionTypes.MOVE_ANTS: return moveAnts;
        case ActionTypes.CLEAR: return clear;
        case ActionTypes.SET_TURNS: return setTurns;
    }
});

function clear(state) {
    return state.merge({
        lastId: -1,
        turmites: Immutable.Map(),
        field: Immutable.Map(),
    });
}

function addAnt(state, {cellId, direction}) {
    if (cellId == null) {
        return state;
    }

    return state.withMutations(state => {
        const index = state.get('lastId') + 1;
        state.setIn(['turmites', index], {cellId, direction});
        state.set('lastId', index);
    });
}

function killAnt(state, {id}) {
    return state.removeIn(['turmites', id]);
}

function moveAnts(state, {turmites}) {
    const field = state.get('field').withMutations(field => {
        state.get('turmites').forEach(({cellId}) => {
            if (field.has(cellId)) {
                const colorsSize = state.get('colors').size;
                const nextColor = (field.get(cellId) + 1) % colorsSize;

                if (nextColor === 0) {
                    field.remove(cellId);
                } else {
                    field.set(cellId, nextColor);
                }
            } else {
                field.set(cellId, 1);
            }
        });
    });

    return state.merge({
        field,
        turmites,
    });
}

function setTurns(state, {turns}) {
    return state.set('colors', Immutable.List(turns));
}
