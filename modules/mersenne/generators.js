import {
    genrand_int32,
    genrand_int31,
    genrand_real1,
    genrand_real2,
    genrand_real3,
    genrand_res53,
} from './randomizers';

import {
    initMtSeed,
} from './helpers';

function createGenerator(randomFunc) {
    return function* generator (seed) {
        let mtSeed = initMtSeed(seed);
        let result;

        /* eslint-disable no-constant-condition */
        while (true) {
            [mtSeed, result] = randomFunc(mtSeed);
            yield result;
        }
        /* eslint-enable no-constant-condition */
    };
}

export const randInt32 = createGenerator(genrand_int32);
export const randInt31 = createGenerator(genrand_int31);
export const randReal1 = createGenerator(genrand_real1);
export const randReal2 = createGenerator(genrand_real2);
export const randReal3 = createGenerator(genrand_real3);
export const randRes53 = createGenerator(genrand_res53);
