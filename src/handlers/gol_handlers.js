import {setPopulation} from 'actions/gol_actions';
import {getRandomPopulation, getNextPopulation} from 'helpers/gol_helpers';

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
