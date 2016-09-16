import {
    N,
} from './constants';

import {
    createClearState,

    addition32,
    multiplication32,
    unsigned32,
    subtraction32,
} from './helpers';


/* initializes mt[N] with a seed */
export function init_genrand(s) {
    let {mt, mti} = createClearState();

    mt[0] = s & 0xffffffff;

    for (mti = 1; mti < N; mti++) {
        mt[mti] = addition32(multiplication32(1812433253, unsigned32(mt[mti - 1] ^ (mt[mti - 1] >>> 30))), mti);
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
        mt[mti] = unsigned32(mt[mti] & 0xffffffff);
        /* for >32 bit machines */
    }

    return [mt, mti];
}

export function init_by_array(init_key, key_length = init_key.length) {
    let [mt, mti] = init_genrand(19650218);

    let i = 1;
    let j = 0;

    for (let k = N > key_length ? N : key_length; k !== 0; k--) {
        mt[i] = addition32(addition32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i - 1] ^ (mt[i - 1] >>> 30)), 1664525)), init_key[j]), j); /* non linear */
        mt[i] = unsigned32(mt[i] & 0xffffffff); /* for WORDSIZE > 32 machines */
        i += 1;
        j += 1;
        if (i >= N) {
            mt[0] = mt[N - 1];
            i = 1;
        }
        if (j >= key_length) {
            j = 0;
        }
    }

    for (let k = N - 1; k !== 0; k--) {
        mt[i] = subtraction32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i - 1] ^ (mt[i - 1] >>> 30)), 1566083941)), i); /* non linear */
        mt[i] = unsigned32(mt[i] & 0xffffffff); /* for WORDSIZE > 32 machines */
        i += 1;
        if (i>=N) {
            mt[0] = mt[N - 1];
            i = 1;
        }
    }

    mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */

    return [mt, mti];
}
