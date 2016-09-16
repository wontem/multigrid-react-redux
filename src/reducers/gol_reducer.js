import Immutable from 'immutable';
import {createReducer} from 'redux_helpers';
import {ActionTypes} from 'constants/gol_constants';

export default createReducer(Immutable.Map({
    toBirth: Immutable.Set([3]),
    toSurvive: Immutable.Set([2, 3]),
    isNeumannOnly: false,
    population: [],
    randomSeed: 0,
    randomArea: 0.33,
}), type => {
    switch (type) {
        case ActionTypes.SET_BIRTH: return setBirth;
        case ActionTypes.SET_SURVIVE: return setSurvive;
        case ActionTypes.SET_NEIGHBOURHOOD: return setNeighbourhood;
        case ActionTypes.SET_CELLS: return setCells;
        case ActionTypes.SET_RANDOM_SEED: return setRandomSeed;
        case ActionTypes.SET_RANDOM_AREA: return setRandomArea;
        case ActionTypes.TOGGLE_CELL: return toggleCell;
    }
});

function setBirth(state, {toBirth}) {
    return state.set('toBirth', Immutable.Set(toBirth));
}

function setSurvive(state, {toSurvive}) {
    return state.set('toSurvive', Immutable.Set(toSurvive));
}

function setNeighbourhood(state, {isNeumannOnly}) {
    return state.set('isNeumannOnly', isNeumannOnly);
}

function setCells(state, {population}) {
    return state.set('population', population);
}

function setRandomSeed (state, {randomSeed}) {
    return state.set('randomSeed', randomSeed);
}

function setRandomArea (state, {randomArea}) {
    return state.set('randomArea', randomArea);
}

function toggleCell(state, {cellId}) {
    if (cellId == null) {
        return state;
    }

    const population = state.get('population');

    let newPopulation;
    if (population.includes(cellId)) {
        newPopulation = population.filter(id => id !== cellId);
    } else {
        newPopulation = population.concat(cellId);
    }

    return state.set('population', newPopulation);
}
