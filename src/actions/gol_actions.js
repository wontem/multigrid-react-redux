import {ActionTypes} from 'constants/gol_constants';
import {defineAction} from 'redux_helpers';
import {getRandomPopulation, getNextPopulation} from 'helpers/gol_helpers';

export const setPopulation = defineAction(ActionTypes.SET_CELLS, population => {
    return {population};
});

export const setBirth = defineAction(ActionTypes.SET_BIRTH, toBirth => {
    return {toBirth};
});

export const setSurvive = defineAction(ActionTypes.SET_SURVIVE, toSurvive => {
    return {toSurvive};
});

export const setNeighbourhood = defineAction(ActionTypes.SET_NEIGHBOURHOOD, isNeumannOnly => {
    return {isNeumannOnly};
});

export const toggleCell = defineAction(ActionTypes.TOGGLE_CELL, cellId => {
    return {cellId};
});

export const setRandomSeed = defineAction(ActionTypes.SET_RANDOM_SEED, randomSeed => {
    return {randomSeed};
});

export const setRandomArea = defineAction(ActionTypes.SET_RANDOM_AREA, randomArea => {
    return {randomArea};
});

export function setRandomPopulation(intersections, {seed, area}) {
    const population = getRandomPopulation(intersections, seed, area);
    return setPopulation(population);
}

export function setNextPopulation(rules, population, graph, neighbours) {
    const nextPopulation = getNextPopulation(rules, population, graph, neighbours);
    return setPopulation(nextPopulation);
}

export function clearPopulation() {
    return setPopulation([]);
}
