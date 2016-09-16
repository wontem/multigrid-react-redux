export default function trampoline(recur, args) {
    while (true) {
        const state = recur(...args);

        if (typeof state === undefined) {
            return;
        }

        if (state.done) {
            return state.value;
        }

        args = state.args;
    }
}

// function factorial(n) {
//     function recur(acc, n) {
//         if (n < 0) {
//             return {
//                 done: true,
//                 value: NaN,
//             };
//         }
//
//         if (n === 1 || n === 0) {
//             return {
//                 done: true,
//                 value: acc,
//             };
//         }
//
//         return {
//             done: false,
//             args: [acc * n, n - 1],
//         };
//     }
//
//     return trampoline(recur, [1, n]);
// }
