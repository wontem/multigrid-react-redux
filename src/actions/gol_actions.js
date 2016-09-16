import {ActionTypes} from 'constants/gol_constants';
import {defineAction} from 'redux_helpers';

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
