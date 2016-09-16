import Immutable from 'immutable';
import {funargs as randomCreators} from 'mersenne';

export function getRandomPopulation(intersections, randomSeed, chance) {
    const random = randomCreators.randReal2(randomSeed);
    const population = [];

    for (let intersectionId of intersections.keys()) {
        if (random() < chance) {
            population.push(intersectionId);
        }
    }

    return population;
}

export function getNextPopulation({isNeumannOnly, toSurvive, toBirth}, population, neighbours) {
    const cellWeights = Immutable.Map().withMutations(cellWeights => {
        function updateWeights(intersectionId) {
            if (cellWeights.has(intersectionId)) {
                cellWeights.update(intersectionId, weight => weight + 1);
            } else {
                cellWeights.set(intersectionId, 1);
            }
        }

        population.forEach(intersectionId => {
            const {bySide, byVertice} = neighbours.get(intersectionId);

            bySide.forEach(updateWeights);

            if (!isNeumannOnly) {
                byVertice.forEach(updateWeights);
            }
        });
    });

    return cellWeights.reduce((nextPopulation, weight, intersectionId) => {
        const isAlive = population.includes(intersectionId);

        if (
            isAlive && toSurvive.has(weight) ||
            !isAlive && toBirth.has(weight)
        ) {
            return nextPopulation.concat(intersectionId);
        }

        return nextPopulation;
    }, []);
}
