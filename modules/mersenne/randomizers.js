import {
    N,
    M,
    MATRIX_A,
    UPPER_MASK,
    LOWER_MASK,
} from './constants';

import {
    init_genrand,
} from './initializers';

import {
    unsigned32,
} from './helpers';

function calcY(mt, i, j) {
    return unsigned32((mt[i] & UPPER_MASK) | (mt[j] & LOWER_MASK));
}

function calcMtVal(mtVal, y) {
    const mag01 = [0x0, MATRIX_A];
    return unsigned32(mtVal ^ (y >>> 1) ^ mag01[y & 0x1]);
}

/* generates a random number on [0,0xffffffff]-interval */
export function genrand_int32([mt, mti]) {
    let y;
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (mti >= N) { /* generate N words at one time */
        let kk;

        if (mti === N + 1) {   /* if init_genrand() has not been called, */
            [mt, mti] = init_genrand(5489); /* a default initial seed is used */
        }

        for (kk = 0; kk < N - M; kk++) {
            y = calcY(mt, kk, kk + 1);
            mt[kk] = calcMtVal(mt[kk + M], y);
        }

        for (; kk < N - 1; kk++) {
            y = calcY(mt, kk, kk + 1);
            mt[kk] = calcMtVal(mt[kk + M - N], y);
        }

        y = calcY(mt, N - 1, 0);
        mt[N - 1] = calcMtVal(mt[M - 1], y);

        mti = 0;
    }

    y = mt[mti];
    mti += 1;

    /* Tempering */
    y = unsigned32(y ^ (y >>> 11));
    y = unsigned32(y ^ ((y << 7) & 0x9d2c5680));
    y = unsigned32(y ^ ((y << 15) & 0xefc60000));
    y = unsigned32(y ^ (y >>> 18));

    return [[mt, mti], y];
}

/* generates a random number on [0,0x7fffffff]-interval */
export function genrand_int31(mtSeed) {
    const [nextMtSeed, result] = genrand_int32(mtSeed);
    return [nextMtSeed, result >>> 1];
}

/* generates a random number on [0,1]-real-interval */
export function genrand_real1(mtSeed) {
    const [nextMtSeed, result] = genrand_int32(mtSeed);
    return [nextMtSeed, result * (1.0 / 4294967295.0)];
    /* divided by 2^32-1 */
}

/* generates a random number on [0,1)-real-interval */
export function genrand_real2(mtSeed) {
    const [nextMtSeed, result] = genrand_int32(mtSeed);
    return [nextMtSeed, result * (1.0 / 4294967296.0)];
    /* divided by 2^32 */
}

/* generates a random number on (0,1)-real-interval */
export function genrand_real3(mtSeed) {
    const [nextMtSeed, result] = genrand_int32(mtSeed);
    return [nextMtSeed, (result + 0.5) * (1.0 / 4294967296.0)];
    /* divided by 2^32 */
}

/* generates a random number on [0,1) with 53-bit resolution*/
export function genrand_res53(mtSeed) {
    let nextMtSeed;
    let a;
    let b;

    [nextMtSeed, a] = genrand_int32(mtSeed) >>> 5;
    [nextMtSeed, b] = genrand_int32(nextMtSeed) >>> 6;

    const result = (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
    return [nextMtSeed, result];
}
/* These real versions are due to Isaku Wada, 2002/01/09 added */
