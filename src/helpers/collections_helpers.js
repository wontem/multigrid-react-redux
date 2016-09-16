import Immutable from 'immutable';
import {lerp} from 'helpers/math_helpers';

export function eachPairOfArray(array, handler) {
    const length = array.length;
    for (let i = 0; i < length - 1; i++) {
        let value1 = array[i];
        for (let j = i + 1; j < length; j++) {
            let value2 = array[j];
            handler(value1, value2, i, j, array);
        }
    }
}

export function eachPairOfMaps(map1, map2, handler) {
    for (let [key1, value1] of map1) {
        for (let [key2, value2] of map2) {
            handler(value1, value2, key1, key2, map1, map2);
        }
    }
}

export function filterMap(map, keysArray) {
    return Immutable.Map().withMutations(newMap => {
        keysArray.forEach(key => {
            newMap.set(key, map.get(key));
        });
    });
}

export function cloneAndSortPairs(pairs) {
    return pairs
        .map(([key, value], id) => ([id, key]))
        .sort((a, b) => a[1] - b[1])
        .map(([id]) => pairs[id]);
}

export function pairsComparator([a], [b]) {
    return a - b;
}

export function take(iterable, n) {
    const result = [];

    for (let value of iterable) {
        if (n === 0) break;
        result.push(value);
        n -= 1;
    }

    return result;
}

export function getRandomValue(array, randomPercent) {
    return array[Math.floor(lerp(randomPercent, array.length))];
}

export function getRandomKey(collection, randomPercent) {
    const keys = [...collection.keys()];
    const index = Math.floor(lerp(randomPercent, keys.length));
    return keys[index];
}

export function getRandomEntry(collection, randomPercent) {
    const entries = [...collection.entries()];
    const index = Math.floor(lerp(randomPercent, entries.length));
    return entries[index];
}

export function arrayIntersection(arr1, arr2) {
    const intersection = [];

    arr1.forEach(value => {
        if (arr2.includes(value)) {
            intersection.push(value);
        }
    });

    return intersection;
}
