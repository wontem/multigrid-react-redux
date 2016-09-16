export default class DHeap {
    constructor(predicateFn, d = 2) {
        this._data = [];
        this._d = d;

        if (predicateFn) {
            this._predicateFn = predicateFn;
        }
    }

    get size() {
        return this._data.length;
    }

    _predicateFn(a, b) {
        return a > b;
    }

    _swap(a, b) {
        [this._data[a], this._data[b]] = [this._data[b], this._data[a]];
    }

    _emerge(id) {
        const parentId = Math.floor((id - 1) / this._d);

        if (this._predicateFn(this._data[id], this._data[parentId])) {
            this._swap(id, parentId);

            if (parentId > 0) {
                // TODO: use loop instead of recursion
                this._emerge(parentId);
            }
        }
    }

    _immerse(id) {
        const fromId = id * this._d + 1;
        const toId = Math.min(fromId + this._d, this.size);

        let newId = id;

        for (let childId = fromId; childId < toId; childId++) {
            if (this._predicateFn(this._data[childId], this._data[newId])) {
                newId = childId;
            }
        }

        if (newId != id) {
            this._swap(newId, id);
            // TODO: use loop instead of recursion
            this._immerse(newId);
        }
    }

    push(value) {
        this._data.push(value);
        this._emerge(this.size - 1);
    }

    pop() {
        if (this.size > 1) {
            this._swap(0, this.size - 1);
        }

        const value = this._data.pop();

        if (this.size > 0) {
            this._immerse(0);
        }

        return value;
    }

    clear() {
        this._data = [];
    }
}
