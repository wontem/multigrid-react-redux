export function* matches(regExp, str) {
    /* eslint-disable no-constant-condition, no-unused-vars */
    while (true) {
        let result = regExp.exec(str);
        if (result === null) {
            break;
        } else {
            let [match, ...groups] = result;
            yield groups;
        }
    }
    /* eslint-enable no-constant-condition, no-unused-vars */
}
