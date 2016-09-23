function performTransform(index, value, transform) {
    if (typeof transform === 'string') {
        return transform + '@' + value;
    }

    if (typeof transform === 'function') {
        return transform(index, value);
    }

    return value;
}

export default function keyMirror(keys, transform) {
    const mirror = {};

    switch (keys.constructor) {
        case Array:
            keys.forEach((key, i) => {
                mirror[key] = performTransform(i, key, transform);
            });
            break;
        case Object:
            keys.forEach((key, i) => {
                mirror[key] = performTransform(i, keys[key] || key, transform);
            });
            break;
    }

    return mirror;
}

export function checkNamespace(key, namespace) {
    const regExp = new RegExp(`.*@${namespace}$`);
    return regExp.test(key);
}
