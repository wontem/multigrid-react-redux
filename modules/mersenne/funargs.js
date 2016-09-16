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

function createFunarg(randomFunc) {
    return function funarg (seed) {
        let mtSeed = initMtSeed(seed);
        let result;

        return function random() {
            [mtSeed, result] = randomFunc(mtSeed);
            return result;
        };
    };
}

export const randInt32 = createFunarg(genrand_int32);
export const randInt31 = createFunarg(genrand_int31);
export const randReal1 = createFunarg(genrand_real1);
export const randReal2 = createFunarg(genrand_real2);
export const randReal3 = createFunarg(genrand_real3);
export const randRes53 = createFunarg(genrand_res53);
