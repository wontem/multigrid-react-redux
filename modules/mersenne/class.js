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


class MersenneTwister {
    constructor(seed = Date.now()) {
        this.setSeed(seed);
    }

    setSeed(seed) {
        this.seed = seed;
        this.mtSeed = initMtSeed(seed);
    }
}

function assignObject(mutable, obj, handler) {
    return Object.keys(obj).forEach(key => {
        mutable[key] = handler(obj[key], key, obj);
    });
}

assignObject(MersenneTwister.prototype, {
    randInt32: genrand_int32,
    randInt31: genrand_int31,
    randReal1: genrand_real1,
    randReal2: genrand_real2,
    randReal3: genrand_real3,
    randRes53: genrand_res53,
}, randomFunc => {
    return function next() {
        const [nextMtSeed, result] = randomFunc(this.mtSeed);
        this.mtSeed = nextMtSeed;
        return result;
    };
});

export default MersenneTwister;
