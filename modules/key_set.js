export default class KeySet {
    constructor(keys) {
        this._storage = {};

        if (keys) {
            for (let key of keys) {
                this.add(key);
            }
        }
    }

    get size() {
        return this.toArray().length;
    }

    add(key) {
        this._storage[key] = true;
        return this;
    }

    remove(key) {
        delete this._storage[key];
        return this;
    }

    has(key) {
        return this._storage.hasOwnProperty(key);
    }

    forEach(handler) {
        for (let key of this) {
            handler(key, key, this);
        }
    }

    toArray() {
        return Object.keys(this._storage);
    }

    isEmpty() {
        return this.size === 0;
    }

    *[Symbol.iterator]() {
        for (let key of this.toArray()) {
            yield key;
        }
    }
}
