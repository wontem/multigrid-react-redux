import {
    init_genrand,
    init_by_array,
} from './initializers';

import {
    N,
    UPPER_MASK,
} from './constants';

export function initMtSeed(seed) {
    if (typeof seed === 'number') {
        return init_genrand(seed);
    }

    if (Array.isArray(seed)) {
        return init_by_array(seed);
    }

    throw new TypeError('Seed must be a number or an array of numbers');
}

export function createClearState() {
    return {
        mt: new Array(N), /* the array for the state vector  */
        mti: N + 1, /* mti==N+1 means mt[N] is not initialized */
    };
}

// returns a 32-bits unsiged integer from an operand to which applied a bit operator.
export function unsigned32(n1) {
    return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
}

// emulates lowerflow of a c 32-bits unsiged integer variable, instead of the operator -. these both arguments must be non-negative integers expressible using unsigned 32 bits.
export function subtraction32(n1, n2) {
    return n1 < n2 ? unsigned32((0x100000000 - (n2 - n1)) & 0xffffffff) : n1 - n2;
}

// emulates overflow of a c 32-bits unsiged integer variable, instead of the operator +. these both arguments must be non-negative integers expressible using unsigned 32 bits.
export function addition32(n1, n2) {
    return unsigned32((n1 + n2) & 0xffffffff);
}

// emulates overflow of a c 32-bits unsiged integer variable, instead of the operator *. these both arguments must be non-negative integers expressible using unsigned 32 bits.
export function multiplication32(n1, n2) {
    let sum = 0;

    for (let i = 0; i < 32; ++i){
        if ((n1 >>> i) & 0x1) {
            sum = addition32(sum, unsigned32(n2 << i));
        }
    }

    return sum;
}
